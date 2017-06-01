<?php

namespace ChatApp\Server;

use ChatApp\Server\ClientMessage\MessageWrapper;
use ChatApp\Server\ServerMessage\DeniedMessage;
use ChatApp\Server\ServerMessage\SimpleMessage;
use ChatApp\Server\ServerMessage\TextMessage;
use ChatApp\Server\ServerMessage\MessageInterface;
use ChatApp\Server\ServerMessage\UsersListMessage;
use Ratchet\ConnectionInterface;
use Ratchet\MessageComponentInterface;

class MessageHandler implements MessageComponentInterface
{
    const C_MESSAGE_TYPE_REGISTER      = 'REGISTER';
    const C_MESSAGE_TYPE_MESSAGE       = 'MESSAGE';
    const C_MESSAGE_TYPE_GET_USER_LIST = 'GET_USER_LIST';
    const C_MESSAGE_TYPE_START_TYPING  = 'START_TYPING';
    const C_MESSAGE_TYPE_STOP_TYPING   = 'STOP_TYPING';

    const S_MESSAGE_TYPE_REGISTERED                  = 'REGISTERED';
    const S_MESSAGE_TYPE_DENIED                      = 'DENIED';
    const S_MESSAGE_TYPE_USER_LIST                   = 'USER_LIST';
    const S_MESSAGE_TYPE_USER_CONNECTED_BROADCAST    = 'CONNECTED';
    const S_MESSAGE_TYPE_USER_DISCONNECTED_BROADCAST = 'DISCONNECTED';
    const S_MESSAGE_TYPE_MESSAGE_BROADCAST           = 'MESSAGE';
    const S_MESSAGE_TYPE_START_TYPING_BROADCAST      = 'START_TYPING';
    const S_MESSAGE_TYPE_STOP_TYPING_BROADCAST       = 'STOP_TYPING';

    /**
     * @var array
     */
    protected $clientMessageDataMap = [
        self::C_MESSAGE_TYPE_REGISTER      => ['name'],
        self::C_MESSAGE_TYPE_MESSAGE       => ['text'],
        self::C_MESSAGE_TYPE_GET_USER_LIST => [],
        self::C_MESSAGE_TYPE_START_TYPING  => [],
        self::C_MESSAGE_TYPE_STOP_TYPING   => [],
    ];

    /**
     * @var array
     */
    protected $serverMessageMap = [
        self::S_MESSAGE_TYPE_REGISTERED                  => SimpleMessage::class,
        self::S_MESSAGE_TYPE_DENIED                      => DeniedMessage::class,
        self::S_MESSAGE_TYPE_USER_LIST                   => UsersListMessage::class,
        self::S_MESSAGE_TYPE_USER_CONNECTED_BROADCAST    => SimpleMessage::class,
        self::S_MESSAGE_TYPE_USER_DISCONNECTED_BROADCAST => SimpleMessage::class,
        self::S_MESSAGE_TYPE_MESSAGE_BROADCAST           => TextMessage::class,
        self::S_MESSAGE_TYPE_START_TYPING_BROADCAST      => SimpleMessage::class,
        self::S_MESSAGE_TYPE_STOP_TYPING_BROADCAST       => SimpleMessage::class,
    ];

    /**
     * @var ClientService
     */
    protected $clientService;

    /**
     * @var \SplObjectStorage|ConnectionInterface[]
     */
    protected $clients;

    /**
     * @var array
     */
    protected $uniqueIds = [];

    /**
     * MessageHandler constructor.
     *
     * @param ClientService $clientService
     */
    public function __construct(ClientService $clientService)
    {
        $this->clientService = $clientService;
        $this->clients = new \SplObjectStorage();
    }

    /**
     * @param string $type
     *
     * @return MessageInterface
     */
    protected function createNewMessage($type)
    {
        $params = func_get_args();
        array_shift($params);

        $class = $this->serverMessageMap[$type];
        $result = new $class(...$params);
        $result->setType($type);

        return $result;
    }

    /**
     * @param string $msg
     *
     * @return MessageWrapper
     */
    protected function parseMessage($msg)
    {
        $msg = json_decode($msg, true, 25) ?: [];

        $msg = array_replace_recursive(['type' => '', 'data' => []], $msg);
        $msg['data'] = array_merge(
            isset($this->clientMessageDataMap[$msg['type']]) ? $this->clientMessageDataMap[$msg['type']] : [],
            isset($msg['data']) ? $msg['data'] : []
        );

        return new MessageWrapper($msg['type'], $msg['data']);
    }

    /**
     * @inheritdoc
     */
    function onOpen(ConnectionInterface $conn)
    {
        $this->clients->attach($conn);
    }

    /**
     * @inheritdoc
     */
    function onClose(ConnectionInterface $conn)
    {
        $id = isset($this->clients[$conn]['id']) ? $this->clients[$conn]['id'] : null;
        $username = isset($this->clients[$conn]['name']) ? $this->clients[$conn]['name'] : null;
        $this->clients->detach($conn);
        if ($id) {
            unset($this->uniqueIds[$id]);
            $this->broadcastDisconnectedInfo($id, $username);
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
        $msg = $this->parseMessage($msg);

        if (!$msg->isValid()) {
            $response = $this->createNewMessage(
                self::S_MESSAGE_TYPE_DENIED,
                'Unable to parse your message',
                DeniedMessage::INVALID_MESSAGE
            );
            $from->send($response);

            return;
        }

        switch ($msg->getType()) {
            case self::C_MESSAGE_TYPE_REGISTER:
                if (!$this->isClientRegistered($from)) {
                    $name = $this->clientService->filterName($msg->name);
                    if ($name) {
                        $id = $this->getUniqueId();
                        $this->clients->offsetSet($from, [
                            'id'   => $id,
                            'name' => $name,
                        ]);
                        $from->send($this->createNewMessage(self::S_MESSAGE_TYPE_REGISTERED, $id, $name));
                        $this->broadcastConnectedInfo($from);
                    } else {
                        $response = $this->createNewMessage(
                            self::S_MESSAGE_TYPE_DENIED,
                            'Invalid username',
                            DeniedMessage::INVALID_NAME
                        );
                        $from->send($response);
                    }
                } // else do nothing
                break;
            case self::C_MESSAGE_TYPE_GET_USER_LIST:
                if ($this->isClientRegistered($from)) {
                    $this->sendConnectedUserList($from);
                }
                break;
            case self::C_MESSAGE_TYPE_MESSAGE:
                if ($this->isClientRegistered($from)) {
                    $text = $this->clientService->filterMessage($msg->text);
                    if ($text) {
                        $this->broadCastMessage($from, $text);
                    }
                }
                break;
            case self::C_MESSAGE_TYPE_START_TYPING:
                if ($this->isClientRegistered($from)) {
                    $this->broadcastTypingInfo($from, self::S_MESSAGE_TYPE_START_TYPING_BROADCAST);
                }
                break;
            case self::C_MESSAGE_TYPE_STOP_TYPING:
                if ($this->isClientRegistered($from)) {
                    $this->broadcastTypingInfo($from, self::S_MESSAGE_TYPE_STOP_TYPING_BROADCAST);
                }
                break;
            default:
                break;
        }
    }

    /**
     * @param ConnectionInterface $conn
     *
     * @return bool
     */
    protected function isClientRegistered(ConnectionInterface $conn)
    {
        return isset($this->clients[$conn]['id']);
    }

    /**
     * @param int $length
     *
     * @return string
     */
    protected function getUniqueId($length = 16)
    {
        $id = $this->clientService->generateRandomString($length);
        while (isset($this->uniqueIds[$id])) {
            $id = $this->clientService->generateRandomString($length);
        }
        $this->uniqueIds[$id] = $id;

        return $id;
    }

    /**
     * @param ConnectionInterface $from
     * @param string              $text
     *
     * @return void
     */
    protected function broadCastMessage(ConnectionInterface $from, $text)
    {
        /** @var TextMessage $message */
        $message = $this->createNewMessage(
            self::S_MESSAGE_TYPE_MESSAGE_BROADCAST,
            $this->clients[$from]['id'],
            $this->clients[$from]['name'],
            $text

        );
        foreach ($this->clients as $client) {
            if (!$this->isClientRegistered($client)) {
                continue;
            }
            $message->setIsOwn($client === $from);

            $client->send($message);
        }
    }

    /**
     * @param ConnectionInterface $from
     *
     * @return void
     */
    protected function broadcastConnectedInfo(ConnectionInterface $from)
    {
        $message = $this->createNewMessage(
            self::S_MESSAGE_TYPE_USER_CONNECTED_BROADCAST,
            $this->clients[$from]['id'],
            $this->clients[$from]['name']
        );
        foreach ($this->clients as $client) {
            if (!$this->isClientRegistered($client)) {
                continue;
            }
            if ($client === $from) {
                continue;
            }
            $client->send($message);
        }
    }

    /**
     * @param string|int $id
     * @param string     $username
     *
     * @return void
     */
    protected function broadcastDisconnectedInfo($id, $username)
    {
        $message = $this->createNewMessage(self::S_MESSAGE_TYPE_USER_DISCONNECTED_BROADCAST, $id, $username);
        foreach ($this->clients as $client) {
            if (!$this->isClientRegistered($client)) {
                continue;
            }
            $client->send($message);
        }
    }

    /**
     * @param ConnectionInterface $from
     * @param string              $type
     */
    protected function broadcastTypingInfo(ConnectionInterface $from, $type)
    {
        $message = $this->createNewMessage($type, $this->clients[$from]['id'], $this->clients[$from]['name']);
        foreach ($this->clients as $client) {
            if (!$this->isClientRegistered($client)) {
                continue;
            }
            if ($client === $from) {
                continue;
            }
            $client->send($message);
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
        $items = [];
        while ($storage->valid()) {
            $items[] = $storage->getInfo();
            $storage->next();
        }

        $storage->rewind();

        $message = $this->createNewMessage(self::S_MESSAGE_TYPE_USER_LIST, $items);

        $to->send($message);
    }
}
