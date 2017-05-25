import {connect} from 'react-redux'
import DesktopNotification from '../components/DesktopNotification';

const mapStateToProps = (state) => {
    let n = state.notification;
    return {
        message: n.message
    };
};

export default connect(mapStateToProps)(DesktopNotification);
