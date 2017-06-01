<?php

namespace ChatApp\Server\ServerMessage;

class DeniedMessage extends AbstractMessage
{
    const INVALID_MESSAGE = 1;
    const INVALID_NAME    = 2;
    const NOT_REGISTERED  = 3;

    /**
     * DeniedMessage constructor.
     *
     * @param string $reason
     * @param int    $code
     */
    public function __construct($reason, $code)
    {
        $this->data = compact('reason', 'code');
    }
}
