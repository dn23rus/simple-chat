import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import ConnectionInput from '../containers/ConnectionInput';
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
        connectionState: PropTypes.string.isRequired
    };

    render() {
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
                        <p>Connecting...</p>
                    </div>
                );
            case SOCKET_STATE_CONNECTED:
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
            default:
                return null;
        }

    }
}

const mapStateToProps = (state) => {
    let c = state.connection;
    return {
        connectionState: c.connectionState
    };
};

export default connect(mapStateToProps)(App);
