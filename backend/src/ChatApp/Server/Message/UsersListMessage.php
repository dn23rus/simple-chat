<?php

namespace ChatApp\Server\Message;

class UsersListMessage extends AbstractMessage
{
    /**
     * UsersListMessage constructor.
     *
     * @param array $list
     */
    public function __construct(array $list)
    {
        $this->data = [
            'type'  => self::TYPE_USERS_LIST,
            'items' => $list,
        ];
    }
}
