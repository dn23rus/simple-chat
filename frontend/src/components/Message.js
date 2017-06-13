import React from 'react'
import moment from 'moment-timezone';
import browserLocale from 'browser-locale';
import {
    S_MESSAGE_TYPE_MESSAGE_BROADCAST,
    S_MESSAGE_TYPE_USER_CONNECTED_BROADCAST,
    S_MESSAGE_TYPE_USER_DISCONNECTED_BROADCAST
} from '../constants';

const Message = ({type, username, text, datetime, isOwn}) => {

    const formatDatetime = (datetime) => {
        let format = 'H:mm DD/MM/YYYY';
        switch (browserLocale()) {
            case 'ru-RU':
                format = 'H:mm DD.MM.YYYY';
                break;
            case 'en-US':
            case 'en-GB':
                format = 'h:mm a MM/DD/YYYY';
                break;
            default:
                break;

        }
        return moment(datetime).format(format);
    };

    datetime = formatDatetime(datetime);
    let result = null;
    switch (type) {
        case S_MESSAGE_TYPE_MESSAGE_BROADCAST:
            result = isOwn ? (
                    <p>
                        <span
                            className="message-panel__list-item-username message-panel__list-item-username_own">(me):</span>
                        <span className="message-panel__list-item-text">{text}</span>
                        <span className="message-panel__list-item-datetime">{datetime}</span>
                    </p>
                ) : (
                    <p>
                        <span className="message-panel__list-item-username">{username}:</span>
                        <span className="message-panel__list-item-text">{text}</span>
                        <span className="message-panel__list-item-datetime">{datetime}</span>
                    </p>
                );
            break;
        case S_MESSAGE_TYPE_USER_CONNECTED_BROADCAST:
            result = (
                <p>
                    <span className="message-panel__list-item-text message-panel__list-item-text_info">New user [{username}] has been connected.</span>
                    <span className="message-panel__list-item-datetime">{datetime}</span>
                </p>
            );
            break;
        case S_MESSAGE_TYPE_USER_DISCONNECTED_BROADCAST:
            result = (
                <p>
                    <span className="message-panel__list-item-text message-panel__list-item-text_info">User [{username}] has been disconnected.</span>
                    <span className="message-panel__list-item-datetime">{datetime}</span>
                </p>
            );
            break;
        default:
            break
    }
    return result;
};

export default Message;
