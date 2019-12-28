import React, {Component} from "react";
import axios from "axios";
import {NavLink} from "react-router-dom";
import Layout01 from "../../layout/Layout01/Layout01";
import {getQueryParam} from "../../../services/utilities";

const baseUrl = process.env.REACT_APP_API_BASE_PATH;

class VerifyEmail extends Component {

    constructor(props) {
        super(props);
        this.state = {response: {}};
    }

    componentDidMount() {
        const userId = getQueryParam("userId");
        const emailVerifyCode = getQueryParam("emailVerifyCode");

        axios
            .get(`${baseUrl}/api/auth/users/${userId}/verifyEmail/${emailVerifyCode}`)
            .then(response => this.setState({response: response.data}));

    }

    render() {
        const {response} = this.state;
        console.log(response);
        return (
            <Layout01>
                <div>
                    <h1>Confirm Registration</h1>
                    {response.successful === undefined && <p>Loading...</p>}
                    {response.successful !== undefined && <p>{response.message}</p>}
                    {response.successful &&
                        <p>
                            <NavLink to={`${process.env.PUBLIC_URL}/`}>
                                Login
                            </NavLink>
                        </p>
                    }
                </div>
            </Layout01>
        );
    }
}

export default VerifyEmail;