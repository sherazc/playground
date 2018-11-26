import React from 'react';
import {Route, Redirect, withRouter} from 'react-router-dom';
import connect from "react-redux/es/connect/connect";
import {verifyAuthentication, verifyAuthorization} from "../../../services/auth/AuthNZ";

class AuthRoute extends Route {
    render() {
        if (!verifyAuthentication(this.props.token, this.props.authenticate)) {
            return <Redirect to="/login"/>;
        }

        if (!verifyAuthorization()) {
            return <Redirect to="/forbidden"/>;
        }

        return super.render();
    }
}
const mapStateToProps = state => {
    return {
        successful: state.login.successful,
        token: state.login.token,
        company: state.login.company,
        user: state.login.user
    };
};

export default connect(mapStateToProps)(withRouter(AuthRoute));
