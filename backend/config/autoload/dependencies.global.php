<?php

use Zend\Expressive\Application;
use Zend\Expressive\Container\ApplicationFactory;
use Zend\Expressive\Helper;

return [
    'dependencies' => [
        'invokables' => [
            \ChatApp\Server\ClientService::class => \ChatApp\Server\ClientService::class,
            Helper\ServerUrlHelper::class        => Helper\ServerUrlHelper::class,
        ],
        'factories'  => [
            Application::class                            => ApplicationFactory::class,
            'ChatServer'                                  => \ChatApp\Server\ChatServerFactory::class,
            \ChatApp\Console\Command\SetupCommand::class  => \ChatApp\Console\Command\SetupCommandFactory::class,
            \ChatApp\Server\MessageHandler::class         => \ChatApp\Server\MessageHandlerFactory::class,
            \Symfony\Component\Console\Application::class => \ChatApp\Console\ApplicationFactory::class,
            Helper\UrlHelper::class                       => Helper\UrlHelperFactory::class,
        ],
    ],
];
