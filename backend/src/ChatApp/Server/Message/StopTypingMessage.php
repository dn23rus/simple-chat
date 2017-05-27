<?php

namespace ChatApp\Server\Message;

class StopTypingMessage extends AbstractMessage
{
    /**
     * StopTypingMessage constructor.
     *
     * @param string $username
     * @param string $id
     */
    public function __construct($username, $id)
    {
        $this->data = [
            'type'     => self::TYPE_STOP_TYPING,
            'username' => $username,
            'id'       => $id,
        ];
    }
}
