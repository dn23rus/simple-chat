<?php

namespace ChatApp\Server\Message;

class Message implements MessageInterface
{
    protected $data;

    /**
     * Message constructor.
     *
     * @param string $username
     * @param string $text
     * @param bool   $isOwn
     */
    public function __construct($username, $text, $isOwn = false)
    {
        $this->data = [
            'type'     => self::TYPE_MESSAGE,
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

    /**
     * @inheritdoc
     */
    function jsonSerialize()
    {
        return $this->data;
    }
}
