<?php

namespace ChatApp\Server\ServerMessage;

class SimpleMessage extends AbstractMessage
{
    /**
     * SimpleMessage constructor.
     *
     * @param $id
     * @param $username
     */
    public function __construct($id, $username)
    {
        $this->data = compact('id', 'username');
    }
}
