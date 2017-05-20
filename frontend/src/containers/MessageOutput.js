import {connect} from 'react-redux'
import MessageOutput from '../components/MessageOutput'

const mapStateToProps = (state) => {
    let c = state.connection;
    return {
        messages: c.messages || []
    };
};

export default connect(mapStateToProps)(MessageOutput);
