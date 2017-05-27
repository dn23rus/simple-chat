<?php

namespace ChatApp\Server\Message;

class InfoMessage extends AbstractMessage
{
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
}
