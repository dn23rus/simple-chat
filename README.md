### Client-Server communication

```
Client
    -> connect
Server
    on connect:
    -> sends register message (REGISTER)
        {type, identity, datetime}
        // identity is secret key
Client
    <- accepts register message
    -> sends accept register (REGISTER)
        {type, from: identity, username}

Server
    on message
    <- accepts register message, filter name (REGISTER)
        {type, from: identity, name}
    => broadcasts connection info (USER_CONNECTED)
        {type, id, username, isOwn, datetime}
        // id is public key
    -> sends connected users list (USERS_LIST)
        {items: [{id, username}, ...]}

    ...
    accept other message types
    if (not registered)
        -> sends DENIED with reason and code
    else
        <- accepts message (MESSAGE)
            {type, from:identity, text}
        => broadCastMessage  (MESSAGE)
            {type, id, username, text, isOwn, datetime}

        or
        <- accepts start typing (START_TYPING)
            {type, from: identity}
        => broadcastStartTyping (START_TYPING)
            {type, id, username}

        or
        <- accepts stop typing (STOP_TYPING)
            {type, from: identity}
        => broadcastStopTyping (STOP_TYPING)
            {type, id, username}
```
