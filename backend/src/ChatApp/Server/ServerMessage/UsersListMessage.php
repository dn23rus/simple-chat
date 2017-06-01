<?php

namespace ChatApp\Server\ServerMessage;

class UsersListMessage extends AbstractMessage
{
    /**
     * UsersListMessage constructor.
     *
     * @param array $list
     */
    public function __construct(array $list)
    {
        $this->data['items'] = $list;
    }
}
