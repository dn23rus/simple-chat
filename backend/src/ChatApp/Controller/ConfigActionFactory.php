<?php

namespace ChatApp\Controller;

use Interop\Container\ContainerInterface;
use Zend\ServiceManager\Factory\FactoryInterface;

class ConfigActionFactory implements FactoryInterface
{

    /**
     * @inheritdoc
     */
    public function __invoke(ContainerInterface $container, $requestedName, array $options = null)
    {
        $cnf = $container->get('config');
        $cnf = $cnf['chat-server'];

        return new ConfigAction($cnf);
    }
}
