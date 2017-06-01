import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {requestUserList} from '../actions/connection';

class UserList extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        users: PropTypes.array.isRequired
    };

    componentDidMount() {
        let dispatch = this.props.dispatch;
        dispatch(requestUserList());
    }

    render() {
        let users = this.props.users.filter((item) => item.id !== this.props.id);
        users.sort((a, b) => {
            return a.name.localeCompare(b.name);
        });
        return (
            <div className="connected-users">
                <h5 className="connected-users__header">Connected users:</h5>
                <ul className="connected-users__list">
                    <li className="connected-users__list-item connected-users__list-item_me" title="You">{this.props.username}</li>
                    {users.map(user => {
                        return (
                            <li key={user.id} className="connected-users__list-item">{user.name}</li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default UserList;
