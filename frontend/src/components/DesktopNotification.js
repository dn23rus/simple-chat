import React from 'react'
import Notification from 'react-web-notification/lib/components/Notification';
import {
    MESSAGE_TYPE_MESSAGE,
    MESSAGE_TYPE_INFO,
    MESSAGE_TYPE_USER_CONNECTED,
    MESSAGE_TYPE_USER_DISCONNECTED
} from '../constants';

const DesktopNotification = ({message, title}) => {
    if (message) {
        let body = null, icon = null;

        switch (message.type) {
            case MESSAGE_TYPE_INFO:
                body = message.text;
                icon = '/img/logo.png';
                break;
            case MESSAGE_TYPE_MESSAGE:
                if (message.isOwn) {
                    break;
                }
                body = `[${message.username}] ${message.text}`;
                icon = '/img/logo-message.png';
                break;
            case MESSAGE_TYPE_USER_CONNECTED:
                body = `New user [${message.username}] has been connected`;
                icon = '/img/logo.png';
                break;
            case MESSAGE_TYPE_USER_DISCONNECTED:
                body = `User [${message.username}] has been disconnected`;
                icon = '/img/logo.png';
                break;
            default:
                break;
        }

        if (body != null && icon != null) {
            return (
                <Notification title={title} options={{body, icon}} onClick={() => {
                    try {
                        window.focus()
                    } catch (e) {
                        console.log(e);
                    }
                }} disableActiveWindow={true} timeout={3000}/>
            );
        }
    }

    return (
        <Notification title={title} ignore={true}/>
    );
};

export default DesktopNotification;
