import React, {Component} from 'react'
import Notification from 'react-web-notification/lib/components/Notification';

const DesktopNotification = ({message, title}) => {
    if (message && !message.isOwn) {
        let body = message.username ? `[${message.username}] ${message.text}` : `${message.text}`;
        return (
            <Notification title={title} options={{body: body}}/>
        );
    }

    return (
        <Notification title={title} ignore={true}/>
    );
};

export default DesktopNotification;
