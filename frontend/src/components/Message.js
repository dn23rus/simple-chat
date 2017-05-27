import React from 'react'
import {
    MESSAGE_TYPE_MESSAGE,
    MESSAGE_TYPE_INFO,
    MESSAGE_TYPE_USER_CONNECTED,
    MESSAGE_TYPE_USER_DISCONNECTED
} from '../constants';

const Message = ({type, username, text, datetime, isOwn}) => {
    let result = null;
    switch (type) {
        case MESSAGE_TYPE_MESSAGE:
            result = isOwn ? (
                    <p>
                        <span
                            className="message-panel__list-item-username message-panel__list-item-username_own">(me):</span>
                        <span className="message-panel__list-item-text">{text}</span>
                        <span className="message-panel__list-item-datetime">[{datetime}]</span>
                    </p>
                ) : (
                    <p>
                        <span className="message-panel__list-item-username">{username}:</span>
                        <span className="message-panel__list-item-text">{text}</span>
                        <span className="message-panel__list-item-datetime">[{datetime}]</span>
                    </p>
                );
            break;
        case MESSAGE_TYPE_USER_CONNECTED:
            result = (
                <p>
                    <span className="message-panel__list-item-text message-panel__list-item-text_info">New user [{username}] has been connected.</span>
                    <span className="message-panel__list-item-datetime">[{datetime}]</span>
                </p>
            );
            break;
        case MESSAGE_TYPE_USER_DISCONNECTED:
            result = (
                <p>
                    <span className="message-panel__list-item-text message-panel__list-item-text_info">User [{username}] has been connected.</span>
                    <span className="message-panel__list-item-datetime">[{datetime}]</span>
                </p>
            );
            break;
        case MESSAGE_TYPE_INFO:
            result = (
                <p>
                    <span className="message-panel__list-item-text message-panel__list-item-text_info">{text}</span>
                    <span className="message-panel__list-item-datetime">[{datetime}]</span>
                </p>
            );
            break;
        default:
            break
    }
    return result;
};

export default Message;
