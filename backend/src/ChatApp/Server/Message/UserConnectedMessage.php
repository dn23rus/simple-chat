<?php

namespace ChatApp\Server\Message;

class UserConnectedMessage extends AbstractMessage
{
    /**
     * UserConnectedMessage constructor.
     *
     * @param string $username
     * @param string $id
     * @param bool   $isOwn
     */
    public function __construct($username, $id, $isOwn = false)
    {
        $this->data = [
            'type'     => self::TYPE_USER_CONNECTED,
            'id'       => $id,
            'username' => $username,
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
