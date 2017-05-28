import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {TEXT_TYPING_STOP_TIMEOUT} from '../actions/types';

class TypingInfo extends Component {
    static propTypes = {
        users: PropTypes.array.isRequired
    };

    constructor(props) {
        super(props);
        this.checkExpireInterval = null;
    }

    componentDidMount() {
        this._refreshCheckExpire();
    }

    componentDidUpdate() {
        this._refreshCheckExpire();
    }

    _refreshCheckExpire() {
        if (this.checkExpireInterval) {
            clearInterval(this.checkExpireInterval);
        }
        let dispatch = this.props.dispatch;
        this.checkExpireInterval = setInterval(() => {
            for (let user of this.props.users) {
                let date = new Date();
                if (date - user.createdAt > 5000) {
                    dispatch({
                        type: TEXT_TYPING_STOP_TIMEOUT,
                        user
                    });
                }
            }
        }, 200);
    }

    componentWillUnmount() {
        clearInterval(this.checkExpireInterval);
    }

    render() {
        let doDisplay = this.props.users.length > 0;
        let users = this.props.users.slice(-3);
        return (
            <div className="message-panel__typing-info">
                <span className="message-panel__typing-text" style={{display: doDisplay ? 'block' : 'none'}}>
                    <strong>{users.map((u) => u.username).join(', ')}</strong> {users.length > 1 ? 'are' : 'is'} typing...
                </span>
            </div>
        );
    }
}

export default TypingInfo;
