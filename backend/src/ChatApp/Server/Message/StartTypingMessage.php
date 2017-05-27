<?php

namespace ChatApp\Server\Message;

class StartTypingMessage extends AbstractMessage
{
    /**
     * StartTypingMessage constructor.
     *
     * @param string $username
     * @param string $id
     */
    public function __construct($username, $id)
    {
        $this->data = [
            'type'     => self::TYPE_START_TYPING,
            'username' => $username,
            'id'       => $id,
        ];
    }
}
