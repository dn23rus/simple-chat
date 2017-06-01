import {connect} from 'react-redux'
import UserList from '../components/UserList'

const mapStateToProps = (state) => {
    let c = state.connection;
    return {
        username: c.username,
        users: c.connectedUsers,
        id: c.identity
    };
};

export default connect(mapStateToProps)(UserList);
