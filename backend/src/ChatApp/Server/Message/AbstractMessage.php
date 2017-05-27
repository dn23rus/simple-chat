<?php

namespace ChatApp\Server\Message;

abstract class AbstractMessage implements MessageInterface
{
    protected $data = [];

    /**
     * @inheritdoc
     */
    public function jsonSerialize()
    {
        return $this->data;
    }
}
