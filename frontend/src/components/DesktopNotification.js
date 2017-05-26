import React from 'react'
import Notification from 'react-web-notification/lib/components/Notification';
import {MESSAGE_TYPE_MESSAGE} from '../constants';

const DesktopNotification = ({message, title}) => {
    if (message && !message.isOwn) {
        let body = message.username ? `[${message.username}] ${message.text}` : `${message.text}`;
        let icon = message.type === MESSAGE_TYPE_MESSAGE ? '/img/logo-message.png' : '/img/logo.png';
        return (
            <Notification title={title} options={{body: body, icon}}/>
        );
    }

    return (
        <Notification title={title} ignore={true}/>
    );
};

export default DesktopNotification;
