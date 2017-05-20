import {connect} from 'react-redux'
import ConnectionInput from '../components/ConnectionInput'

const mapStateToProps = (state) => {
    let c = state.init;
    return {
        wsUrl: c.wsUrl
    };
};

export default connect(mapStateToProps)(ConnectionInput);
