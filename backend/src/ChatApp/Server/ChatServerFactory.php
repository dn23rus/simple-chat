<?php

namespace ChatApp\Server;

use Interop\Container\ContainerInterface;
use Ratchet\Http\HttpServer;
use Ratchet\Server\IoServer;
use Ratchet\WebSocket\WsServer;
use Zend\ServiceManager\Factory\FactoryInterface;

class ChatServerFactory implements FactoryInterface
{
    /**
     * @inheritdoc
     */
    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        $cnf = $container->get('Config');
        $cnf = $cnf['chat-server'];

        $server = IoServer::factory(
            new HttpServer(new WsServer($container->get(MessageHandler::class))),
            $cnf['port'],
            $cnf['address']
        );

        return $server;
    }
}
