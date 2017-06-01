<?php

namespace ChatApp\Server\ServerMessage;

class TextMessage extends AbstractMessage
{
    /**
     * Message constructor.
     *
     * @param string $id
     * @param string $username
     * @param string $text
     * @param bool   $isOwn
     */
    public function __construct($id, $username, $text, $isOwn = false)
    {
        $this->data = compact('id', 'username', 'text', 'isOwn');
    }

    /**
     * @param bool $flag
     *
     * @return $this
     */
    public function setIsOwn($flag)
    {
        $this->data['isOwn'] = (bool) $flag;

        return $this;
    }
}
