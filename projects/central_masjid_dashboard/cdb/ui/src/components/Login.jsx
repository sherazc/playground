import React, {Component} from "react";
import {connect} from "react-redux";

class Login extends Component {
    render() {
        return (
            <div>
                <h3>Login</h3>
                Login
            </div>
        );
    }
}


export default connect(null, null)(Login);
