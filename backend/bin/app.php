<?php

chdir(dirname(__DIR__));

require 'vendor/autoload.php';

/** @var \Zend\ServiceManager\ServiceManager $container */
$container = require 'config/container.php';

$container->get(\Symfony\Component\Console\Application::class)->run();
