import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import ConnectionInput from '../containers/ConnectionInput';
import {sendRegister} from '../actions/connection';
import DesktopNotification from '../containers/DesktopNotification'
import MessageInput from '../containers/MessageInput';
import MessageOutput from '../containers/MessageOutput';
import TypingInfo from '../containers/TypingInfo'
import UserList from '../containers/UserList'
import {
    SOCKET_STATE_CONNECTED,
    SOCKET_STATE_CONNECTING,
    SOCKET_STATE_DISCONNECTED
} from '../constants'

class App extends Component {
    static propTypes = {
        connectionState: PropTypes.string.isRequired,
        username: PropTypes.string,
        isRegistered: PropTypes.bool.isRequired
    };

    render() {
        let dispatch = this.props.dispatch;
        const isRegistered = this.props.isRegistered;
        switch (this.props.connectionState) {
            case SOCKET_STATE_DISCONNECTED:
                return (
                    <div className="app">
                        <ConnectionInput />
                    </div>
                );
            case SOCKET_STATE_CONNECTING:
                return (
                    <div className="app">
                        <div className="app__column app__column_2 app__column_text-center">
                            <p>Connecting...</p>
                        </div>
                    </div>
                );
            case SOCKET_STATE_CONNECTED:
                if (isRegistered) {
                    return (
                        <div className="app">
                            <div className="app__column app__column_2">
                                <div className="message-panel">
                                    <MessageOutput/>
                                    <TypingInfo/>
                                    <MessageInput/>
                                </div>
                            </div>
                            <div className="app__column app__column_3">
                                <UserList/>
                            </div>
                            <DesktopNotification title="Simple Chat Application"/>
                        </div>
                    );
                } else {
                    dispatch(sendRegister(this.props.username));
                    return null;
                }
            default:
                return null;
        }

    }
}

const mapStateToProps = (state) => {
    let c = state.connection;
    return {
        connectionState: c.connectionState,
        username: c.username,
        isRegistered: c.isRegistered
    };
};

export default connect(mapStateToProps)(App);
