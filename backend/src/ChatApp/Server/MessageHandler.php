<?php

namespace ChatApp\Server;

use ChatApp\Server\Message\DeniedMessage;
use ChatApp\Server\Message\InfoMessage;
use ChatApp\Server\Message\Message;
use ChatApp\Server\Message\MessageInterface;
use ChatApp\Server\Message\RegisterMessage;
use ChatApp\Server\Message\StartTypingMessage;
use ChatApp\Server\Message\StopTypingMessage;
use ChatApp\Server\Message\UserConnectedMessage;
use ChatApp\Server\Message\UserDisconnectedMessage;
use ChatApp\Server\Message\UsersListMessage;
use Ratchet\ConnectionInterface;
use Ratchet\MessageComponentInterface;

class MessageHandler implements MessageComponentInterface
{
    /**
     * @var ClientService
     */
    protected $clientService;

    /**
     * @var \SplObjectStorage|ConnectionInterface[]
     */
    protected $clients;

    public function __construct(ClientService $clientService)
    {
        $this->clientService = $clientService;
        $this->clients = new \SplObjectStorage();
    }

    /**
     * @inheritdoc
     */
    function onOpen(ConnectionInterface $conn)
    {
        $this->clients->attach($conn);
        $conn->send(json_encode(new RegisterMessage($this->clientService->generateClientId($conn->resourceId))));
    }

    /**
     * @inheritdoc
     */
    function onClose(ConnectionInterface $conn)
    {
        $username = isset($this->clients[$conn]['name']) ? $this->clients[$conn]['name'] : null;
        $id = isset($this->clients[$conn]['id']) ? $this->clients[$conn]['id'] : null;
        $this->clients->detach($conn);
        if ($username && !is_null($id)) {
            $this->broadcastDisconnectedInfo($username, $id);
        }
    }

    /**
     * @inheritdoc
     */
    function onError(ConnectionInterface $conn, \Exception $e)
    {
        $conn->close();
    }

    /**
     * @inheritdoc
     */
    function onMessage(ConnectionInterface $from, $msg)
    {
        $msg = json_decode($msg, true, 5);
        if (null === $msg) {
            $from->send(json_encode(new DeniedMessage('Unable to parse your message')));

            return;
        }

        $msg = array_merge([
            'from' => null,
            'type' => null,
        ], $msg);

        if (!$this->clientService->verifyClientId($msg['from'], $from->resourceId)) {
            $from->send(json_encode(new DeniedMessage('Invalid identifier')));

            return;
        }

        switch ($msg['type']) {
            case MessageInterface::TYPE_REGISTER:
                $name = isset($msg['name']) ? $this->clientService->filterName($msg['name']) : null;
                if ($name) {
                    $this->clients->offsetSet($from, [
                        'name' => $name,
                        'id'   => uniqid(),
                    ]);
                    $this->broadcastConnectedInfo($from);
                    $this->sendConnectedUserList($from);
                } else {
                    $from->close();
                }
                break;
            case MessageInterface::TYPE_MESSAGE:
                $text = isset($msg['text']) ? $this->clientService->filterMessage($msg['text']) : null;
                if ($text) {
                    $this->broadCastMessage($from, $msg['text']);
                }
                break;
            case MessageInterface::TYPE_START_TYPING:
                $this->broadcastStartTyping($from);
                break;
            case MessageInterface::TYPE_STOP_TYPING:
                $this->broadcastStopTyping($from);
                break;
            default:
                break;
        }
    }

    /**
     * @param ConnectionInterface $from
     * @param string              $text
     *
     * @return void
     */
    protected function broadCastMessage(ConnectionInterface $from, $text)
    {
        $message = new Message($this->clients[$from]['name'], $this->clients[$from]['id'], $text);
        foreach ($this->clients as $client) {
            $message->setIsOwn($client === $from);
            $client->send(json_encode($message));
        }
    }

    /**
     * @param string              $text
     * @param ConnectionInterface $from
     * @param bool                $excludeSelf
     *
     * @return void
     */
    protected function broadCastInfo($text, ConnectionInterface $from = null, $excludeSelf = false)
    {
        $message = new InfoMessage($text);
        foreach ($this->clients as $client) {
            if ($excludeSelf && $client === $from) {
                continue;
            }
            $client->send(json_encode($message));
        }
    }

    /**
     * @param ConnectionInterface $from
     *
     * @return void
     */
    protected function broadcastConnectedInfo(ConnectionInterface $from)
    {
        $message = new UserConnectedMessage($this->clients[$from]['name'], $this->clients[$from]['id']);
        foreach ($this->clients as $client) {
            $message->setIsOwn($client === $from);
            $client->send(json_encode($message));
        }
    }

    /**
     * @param string     $username
     * @param string|int $id
     *
     * @return void
     */
    protected function broadcastDisconnectedInfo($username, $id)
    {
        $message = new UserDisconnectedMessage($username, $id);
        foreach ($this->clients as $client) {
            $client->send(json_encode($message));
        }
    }

    /**
     * @param ConnectionInterface $from
     *
     * @return void
     */
    protected function broadcastStartTyping(ConnectionInterface $from)
    {
        $message = new StartTypingMessage($this->clients[$from]['name'], $this->clients[$from]['id']);
        foreach ($this->clients as $client) {
            if ($client === $from) {
                continue;
            }
            $client->send(json_encode($message));
        }
    }

    /**
     * @param ConnectionInterface $from
     *
     * @return void
     */
    protected function broadcastStopTyping(ConnectionInterface $from)
    {
        $message = new StopTypingMessage($this->clients[$from]['name'], $this->clients[$from]['id']);
        foreach ($this->clients as $client) {
            if ($client === $from) {
                continue;
            }
            $client->send(json_encode($message));
        }
    }

    /**
     * @param ConnectionInterface $to
     *
     * @return void
     */
    protected function sendConnectedUserList(ConnectionInterface $to)
    {
        $storage = $this->clients;
        $storage->rewind();
        $result = [];
        while ($storage->valid()) {
            $current = $storage->current();
            if ($current !== $to) {
                $result[] = $storage->getInfo();
            }
            $storage->next();
        }

        $storage->rewind();

        $to->send(json_encode(new UsersListMessage($result)));
    }
}
