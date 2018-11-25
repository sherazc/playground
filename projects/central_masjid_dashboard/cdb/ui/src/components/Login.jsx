import React, {Component} from "react";
import {connect} from "react-redux";
import InputField from "./partials/InputField";
import {loginAction} from "../store/login/actions";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = this.createInitialState();
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    onSubmit(event) {
        event.preventDefault();
        const loginRequest = {
            companyId: this.state.companyId,
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginAction(loginRequest);
    }

    createInitialState() {
        return {
            companyId: "",
            email: "",
            password: ""
        }
    }

    render() {
        console.log("token", this.props.token);
        console.log("company", this.props.company);
        console.log("user", this.props.user);
        console.log("loginAction", this.props.loginAction);
        return (
            <div>
                <h3>Login</h3>
                <form onSubmit={this.onSubmit}>
                    <InputField
                        label="Company ID"
                        name="companyId"
                        onChange={this.onChange}
                        value={this.state.companyId}/>
                    <InputField
                        label="Email"
                        name="email"
                        required={true}
                        onChange={this.onChange}
                        value={this.state.email}/>
                    <InputField
                        label="Password"
                        name="password"
                        required={true}
                        onChange={this.onChange}
                        value={this.state.password}/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

const actions = {loginAction};

const mapStateToProps = state => {
    return {
        token: state.login.token,
        company: state.login.company,
        user: state.login.user
    }
};

export default connect(mapStateToProps, actions)(Login);
