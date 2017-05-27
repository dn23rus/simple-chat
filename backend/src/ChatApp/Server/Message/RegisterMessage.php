<?php

namespace ChatApp\Server\Message;

class RegisterMessage extends AbstractMessage
{
    /**
     * RegisterMessage constructor.
     *
     * @param string $identity
     */
    public function __construct($identity)
    {
        $this->data = [
            'type'     => self::TYPE_REGISTER,
            'identity' => $identity,
            'datetime' => (new \DateTime('now'))->format(self::DATETIME_FORMAT),
        ];
    }
}
