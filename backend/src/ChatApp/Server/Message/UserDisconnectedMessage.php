<?php

namespace ChatApp\Server\Message;

class UserDisconnectedMessage extends AbstractMessage
{
    /**
     * UserDisconnectedMessage constructor.
     *
     * @param string     $username
     * @param string|int $id
     */
    public function __construct($username, $id)
    {
        $this->data = [
            'type'     => self::TYPE_USER_DISCONNECTED,
            'id'       => $id,
            'username' => $username,
            'datetime' => (new \DateTime('now'))->format(self::DATETIME_FORMAT),
        ];
    }
}
