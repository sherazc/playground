import React, {Component} from "react";
import axios from "axios";
import {NavLink} from "react-router-dom";
import Layout01 from "../../layout/Layout01/Layout01";
import {getQueryParam} from "../../../services/utilities";

const baseUrl = process.env.REACT_APP_API_BASE_PATH;

class VerifyEmail extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const userId = getQueryParam("userId");
        const emailVerifyCode = getQueryParam("emailVerifyCode");

        axios
            .get(`${baseUrl}/api/auth/users/${userId}/verifyEmail/${emailVerifyCode}`)
            .then(response => {
                console.log(response.data);
            });

    }

    verifyMessage() {
        return "Confirmed update message. send user and company in verification response.";
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