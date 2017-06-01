<?php

return [
    'console'      => [
        'config'   => [
            'name' => 'Application console',
        ],
        'commands' => [
            ChatApp\Console\Command\SetupCommand::class,
        ],
    ],
];
