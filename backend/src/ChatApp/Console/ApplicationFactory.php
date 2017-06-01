<?php

namespace ChatApp\Console;

use Interop\Container\ContainerInterface;
use Symfony\Component\Console\Application;
use Zend\ServiceManager\Factory\FactoryInterface;

class ApplicationFactory implements FactoryInterface
{

    /**
     * @inheritdoc
     */
    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        $config = $container->get('config')['console'];
        $commands = isset($config['commands']) ? $config['commands'] : [];

        $application = new Application($config['config']['name']);

        foreach ($commands as $command) {
            $application->add($container->get($command));
        }

        return $application;
    }
}
