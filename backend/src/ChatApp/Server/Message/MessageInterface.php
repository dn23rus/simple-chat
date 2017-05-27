<?php

namespace ChatApp\Server\Message;

interface MessageInterface extends \JsonSerializable
{
    const TYPE_REGISTER = 'REGISTER';
    const TYPE_MESSAGE = 'MESSAGE';
    const TYPE_INFO = 'INFO';
    const TYPE_DENIED = 'DENIED';
    const TYPE_USER_CONNECTED = 'USER_CONNECTED';
    const TYPE_USER_DISCONNECTED = 'USER_DISCONNECTED';
    const TYPE_START_TYPING = 'START_TYPING';
    const TYPE_STOP_TYPING = 'STOP_TYPING';
    const TYPE_USERS_LIST = 'USERS_LIST';

    const DATETIME_FORMAT = 'd/m/Y h:i:s';
}
