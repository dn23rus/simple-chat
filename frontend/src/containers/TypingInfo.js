import {connect} from 'react-redux'
import TypingInfo from '../components/TypingInfo'

const mapStateToProps = (state) => {
    let t = state.typing;
    return {
        users: t.users || []
    };
};

export default connect(mapStateToProps)(TypingInfo);
