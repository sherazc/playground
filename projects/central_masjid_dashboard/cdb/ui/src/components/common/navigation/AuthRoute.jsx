import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from "react-redux";
import {verifyAuthentication, verifyAuthorization} from "../../../services/auth/AuthNZ";
import {mapStateLoginToProps} from "../../../store/lib/utils";

class AuthRoute extends Route {
    render() {
        if (!verifyAuthentication(this.props.login.tokenPayload, this.props.authenticate)) {
            return <Redirect to={`${process.env.PUBLIC_URL}/`}/>;
        }

        if (!verifyAuthorization(this.props.login.tokenPayload, this.props.rolesAll, this.props.rolesAny)) {
            return <Redirect to={`${process.env.PUBLIC_URL}/forbidden`}/>;
        }

        return super.render();
    }
}

export default connect(mapStateLoginToProps)(AuthRoute);
