<?php

chdir(dirname(__DIR__));

require 'vendor/autoload.php';

/** @var \Zend\ServiceManager\ServiceManager $container */
$container = require 'config/container.php';

/** @var \Ratchet\Server\IoServer $server */
$server = $container->get('ChatServer');

$server->run();
