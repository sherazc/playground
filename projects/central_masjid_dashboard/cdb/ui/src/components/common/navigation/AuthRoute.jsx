import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from "react-redux";
import {verifyAuthentication, verifyAuthorization} from "../../../services/auth/AuthNZ";
import {createLoginMapStateToProps} from "../../../store/lib/utils";

class AuthRoute extends Route {
    render() {
        if (!verifyAuthentication(this.props.tokenPayload, this.props.authenticate)) {
            return <Redirect to={`${process.env.PUBLIC_URL}/login`}/>;
        }

        if (!verifyAuthorization(this.props.tokenPayload, this.props.rolesAll, this.props.rolesAny)) {
            return <Redirect to={`${process.env.PUBLIC_URL}/forbidden`}/>;
        }

        return super.render();
    }
}

export default connect(createLoginMapStateToProps)(AuthRoute);
