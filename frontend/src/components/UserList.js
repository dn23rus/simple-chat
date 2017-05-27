import React, {Component} from 'react';
import PropTypes from 'prop-types'

class UserList extends Component {
    static propTypes = {
        username: PropTypes.string.isRequired,
        users: PropTypes.array.isRequired
    };

    render() {
        let users = this.props.users;
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
