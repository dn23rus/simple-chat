import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Notification from 'react-web-notification/lib/components/Notification';
import {
    S_MESSAGE_TYPE_MESSAGE_BROADCAST,
    S_MESSAGE_TYPE_USER_CONNECTED_BROADCAST,
    S_MESSAGE_TYPE_USER_DISCONNECTED_BROADCAST
} from '../constants';

class DesktopNotification extends Component {
    constructor(props) {
        super(props);

        // strange bug with Notification.disableActiveWindow, but it works in this way:
        this.windowFocus = true;
        this.onWindowFocus = this._onWindowFocus.bind(this);
        this.onWindowBlur = this._onWindowBlur.bind(this);
    }

    _onWindowFocus(){
        this.windowFocus = true;
    }

    _onWindowBlur(){
        this.windowFocus = false;
    }

    componentDidMount() {
        if (window.addEventListener){
            window.addEventListener('focus', this.onWindowFocus);
            window.addEventListener('blur', this.onWindowBlur);
        } else if (window.attachEvent){
            window.attachEvent('focus', this.onWindowFocus);
            window.attachEvent('blur', this.onWindowBlur);
        }
    }

    componentWillUnmount() {
        if (window.removeEventListner){
            window.removeEventListener('focus', this.onWindowFocus);
            window.removeEventListener('blur', this.onWindowBlur);
        } else if (window.detachEvent){
            window.detachEvent('focus', this.onWindowFocus);
            window.detachEvent('blur', this.onWindowBlur);
        }
    }

    render() {
        let title = this.props.title;
        let data = this.props.data;
        if (data) {
            let body = null, icon = null;

            switch (data.type) {
                case S_MESSAGE_TYPE_MESSAGE_BROADCAST:
                    if (data.isOwn) {
                        break;
                    }
                    body = `[${data.username}] ${data.text}`;
                    icon = '/img/logo-message.png';
                    break;
                case S_MESSAGE_TYPE_USER_CONNECTED_BROADCAST:
                    body = `New user [${data.username}] has been connected`;
                    icon = '/img/logo.png';
                    break;
                case S_MESSAGE_TYPE_USER_DISCONNECTED_BROADCAST:
                    body = `User [${data.username}] has been disconnected`;
                    icon = '/img/logo.png';
                    break;
                default:
                    break;
            }

            if (body !== null && icon !== null) {
                return (
                    <Notification title={title} options={{body, icon}} onClick={() => {
                        try {
                            window.focus();
                            document.getElementById('messageInput').focus();
                        } catch (e) {
                            console.log(e);
                        }
                    }} timeout={3000} ignore={this.windowFocus}/>
                );
            }
        }
        return (
            <Notification title={title} ignore={true}/>
        );
    }
}

export default DesktopNotification;
