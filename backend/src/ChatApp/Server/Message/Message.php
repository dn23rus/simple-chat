<?php

namespace ChatApp\Server\Message;

class Message extends AbstractMessage
{
    /**
     * Message constructor.
     *
     * @param string $username
     * @param string $id
     * @param string $text
     * @param bool   $isOwn
     */
    public function __construct($username, $id, $text, $isOwn = false)
    {
        $this->data = [
            'type'     => self::TYPE_MESSAGE,
            'id'       => $id,
            'username' => $username,
            'text'     => $text,
            'isOwn'    => $isOwn,
            'datetime' => (new \DateTime('now'))->format(self::DATETIME_FORMAT),
        ];
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
