import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import MessageInput from '../containers/MessageInput';
import MessageOutput from '../containers/MessageOutput';
import ConnectionInput from '../containers/ConnectionInput';
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
                    <div className="ChatApplication_W">
                        <ConnectionInput />
                    </div>
                );
            case SOCKET_STATE_CONNECTING:
                return (
                    <div className="ChatApplication_W">
                        <p>Connecting...</p>
                    </div>
                );
            case SOCKET_STATE_CONNECTED:
                return (
                    <div className="ChatApplication_W">
                        <MessageOutput/>
                        <MessageInput/>
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
