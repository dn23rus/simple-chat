import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import App from './App';
import {initApp} from '../actions/init'
import {
    APP_STATE_NOT_INITED,
    APP_STATE_INITIALIZATION,
    APP_STATE_READY
} from '../constants'

class AppWrapper extends Component {
    static propTypes = {
        appState: PropTypes.string.isRequired
    };

    componentDidMount() {
        this.props.retrieveConfigs('/backend/chat-config');
        // this.props.retrieveConfigs('http://chat-application.loc/backend/chat-config');
    };

    render() {
        switch (this.props.appState) {
            case APP_STATE_NOT_INITED:
            case APP_STATE_INITIALIZATION:
                return (
                    <div className="ChatApplication">
                        <p>Initialization...</p>
                    </div>
                );
            case APP_STATE_READY:
                return (
                    <div className="ChatApplication">
                        <App/>
                    </div>
                );
            default:
                return null;
        }

    }
}

const mapStateToProps = (state) => {
    let i = state.init;
    return {
        appState: i.appState
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        retrieveConfigs: (url) => dispatch(initApp(url))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AppWrapper);
