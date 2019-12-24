import React, {Component} from "react";

import {NavLink} from "react-router-dom";
import Layout01 from "../../layout/Layout01/Layout01";
import {getQueryParam} from "../../../services/utilities";

class VerifyEmail extends Component {

    componentDidMount() {
        // /api/auth/users/{userId}/verifyEmail/{emailVerifyCode}
        const userId = getQueryParam("userId");
        const emailVerifyCode = getQueryParam("emailVerifyCode");

        console.log("userId", userId, "emailVerifyCode", emailVerifyCode);
    }

    verifyMessage() {
        return "Confirmed";
    }

    render() {

        const message = this.verifyMessage();
        return (
            <Layout01>
            <div>
                <h3>Confirm Registration</h3>
                <p>
                    {message}
                </p>
                <p>
                    <NavLink to={`${process.env.PUBLIC_URL}/`}>
                        Login
                    </NavLink>
                </p>
            </div>
            </Layout01>
        );
    }
}

export default VerifyEmail;