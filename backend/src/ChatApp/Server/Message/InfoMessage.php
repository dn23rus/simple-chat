<?php

namespace ChatApp\Server\Message;

class InfoMessage implements MessageInterface
{
    protected $data;

    /**
     * InfoMessage constructor.
     *
     * @param string $text
     */
    public function __construct($text)
    {
        $this->data = [
            'type'     => self::TYPE_INFO,
            'text'     => $text,
            'datetime' => (new \DateTime('now'))->format(self::DATETIME_FORMAT),
        ];
    }

    /**
     * @inheritdoc
     */
    function jsonSerialize()
    {
        return $this->data;
    }
}
