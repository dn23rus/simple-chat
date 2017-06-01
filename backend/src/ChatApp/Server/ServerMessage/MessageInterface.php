<?php

namespace ChatApp\Server\ServerMessage;

interface MessageInterface
{
    const DATETIME_FORMAT = \DateTime::ISO8601;

    /**
     * @param string $type
     *
     * @return $this
     */
    public function setType($type);
}
