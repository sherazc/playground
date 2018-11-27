import React from 'react';
import {Route, Redirect, withRouter} from 'react-router-dom';
import connect from "react-redux/es/connect/connect";
import {verifyAuthentication, verifyAuthorization} from "../../../services/auth/AuthNZ";
import {loginMapStateToProps} from "../../../store/lib/utils";

class AuthRoute extends Route {
    render() {
        if (!verifyAuthentication(this.props.tokenPayload, this.props.authenticate)) {
            return <Redirect to="/login"/>;
        }

        if (!verifyAuthorization(this.props.tokenPayload, this.props.rolesAll, this.props.rolesAny)) {
            return <Redirect to="/forbidden"/>;
        }

        return super.render();
    }
}

export default connect(loginMapStateToProps)(withRouter(AuthRoute));
