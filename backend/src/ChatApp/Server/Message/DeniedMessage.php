<?php

namespace ChatApp\Server\Message;

class DeniedMessage extends AbstractMessage
{
    /**
     * DeniedMessage constructor.
     *
     * @param string $reason
     */
    public function __construct($reason)
    {
        $this->data = [
            'type'     => self::TYPE_DENIED,
            'reason'   => $reason,
            'datetime' => (new \DateTime('now'))->format(self::DATETIME_FORMAT),
        ];
    }
}
