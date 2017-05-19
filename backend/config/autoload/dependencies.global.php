<?php

return [
    'dependencies' => [
        'invokables' => [
            ChatApp\Server\ClientService::class => ChatApp\Server\ClientService::class,
        ],
        'factories'  => [
            ChatApp\Server\MessageHandler::class => ChatApp\Server\MessageHandlerFactory::class,
            'ChatServer'                         => ChatApp\Server\ChatServerFactory::class,
        ],
    ],
];
