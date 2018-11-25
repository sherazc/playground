import {Route, withRouter} from 'react-router-dom';
import connect from "react-redux/es/connect/connect";

class AuthRoute extends Route {
    componentDidMount() {
        // TODO: implement authentication and authorization logic.
        console.log("history", this.props.history);
        console.log("user", this.props.user);
    }
}
const mapStateToProps = state => {
    return {
        successful: state.login.successful,
        token: state.login.token,
        company: state.login.company,
        user: state.login.user
    }
};

export default connect(mapStateToProps)(withRouter(AuthRoute));
