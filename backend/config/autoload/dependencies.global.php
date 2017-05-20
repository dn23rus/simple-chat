<?php

use Zend\Expressive\Application;
use Zend\Expressive\Container\ApplicationFactory;
use Zend\Expressive\Helper;

return [
    'dependencies' => [
        'invokables' => [
            Helper\ServerUrlHelper::class       => Helper\ServerUrlHelper::class,
            ChatApp\Server\ClientService::class => ChatApp\Server\ClientService::class,
        ],
        'factories'  => [
            Application::class                   => ApplicationFactory::class,
            Helper\UrlHelper::class              => Helper\UrlHelperFactory::class,
            ChatApp\Server\MessageHandler::class => ChatApp\Server\MessageHandlerFactory::class,
            'ChatServer'                         => ChatApp\Server\ChatServerFactory::class,
        ],
    ],
];
