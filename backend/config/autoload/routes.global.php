<?php

return [
    'dependencies' => [
        'invokables' => [
            Zend\Expressive\Router\RouterInterface::class => Zend\Expressive\Router\ZendRouter::class,
        ],
        // Map middleware -> factories here
        'factories'  => [
            ChatApp\Controller\ConfigAction::class => ChatApp\Controller\ConfigActionFactory::class,
        ],
    ],

    'routes' => [
        // Example:
        [
            'name'            => 'chat-config',
            'path'            => '/backend/chat-config',
            'middleware'      => ChatApp\Controller\ConfigAction::class,
            'allowed_methods' => ['GET'],
        ],
    ],
];
