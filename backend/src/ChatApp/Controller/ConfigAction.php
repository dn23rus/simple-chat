<?php

namespace ChatApp\Controller;

use Zend\Diactoros\Response\JsonResponse;

class ConfigAction
{
    protected $config;

    public function __construct($config)
    {
        $this->config = $config;
    }

    public function __invoke($req, $res, $next)
    {
        $url = sprintf('ws://%s:%s', $this->config['address'], $this->config['port']);

        return new JsonResponse(['url' => $url], 200, [
            'Access-Control-Allow-Origin' => '*'
        ]);
    }
}
