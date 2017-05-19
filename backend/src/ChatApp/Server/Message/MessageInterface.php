<?php

namespace ChatApp\Server\Message;

interface MessageInterface extends \JsonSerializable
{
    const TYPE_REGISTER = 'REGISTER';
    const TYPE_MESSAGE = 'MESSAGE';
    const TYPE_INFO = 'INFO';
    const TYPE_DENIED = 'DENIED';

    const DATETIME_FORMAT = 'Y-m-d h:i:s';
}
