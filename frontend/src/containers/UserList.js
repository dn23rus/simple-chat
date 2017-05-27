import {connect} from 'react-redux'
import UserList from '../components/UserList'

const mapStateToProps = (state) => {
    let c = state.connection;
    return {
        username: c.username,
        users: c.connectedUsers
    };
};

export default connect(mapStateToProps)(UserList);
