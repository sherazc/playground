import React, {Component} from "react";
import {connect} from "react-redux";
import InputField from "../partials/InputField";
import {loginAction, loginResetAction} from "../../store/login/loginActions";
import {verifyAuthentication} from "../../services/auth/AuthNZ";
import {Redirect} from "react-router";
import {mapStateLoginToProps} from "../../store/lib/utils";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = this.createInitialState();
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSelectCompany = this.onSelectCompany.bind(this);
    }

    createInitialState() {
        return {
            companyId: "",
            email: "super.admin.user@email.com",
            password: "password"
        }
    }

    /*
    componentDidMount() {
        if (this.props.login.token) {
            this.props.loginResetAction();
        }
    }
*/
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

    onSelectCompany(event) {
        this.setState({
            companyId: event.target.value
        });
    }

    loginFailedMessage() {
        if (this.props.successful === false) {
            return <div style={{color: "red"}}>Failed to login</div>;
        }
    }

    render() {
        if (verifyAuthentication(this.props.login.tokenPayload, true)) {
            return <Redirect to={`${process.env.PUBLIC_URL}/auth/admin`}/>
        }
        return (
            <div>
                <div>
                    Sign In
                </div>
                {this.props.login.token}
                {this.loginFailedMessage()}
                <form onSubmit={this.onSubmit}>
                    <select className="form-control" onChange={this.onSelectCompany}>
                        <option value="">Please select</option>
                        {this.props.companies.map((company, index) => {
                            return (
                                <option key={index} value={company.id}>
                                    {company.name}
                                </option>
                            );
                        })}
                    </select>
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

const actions = {loginAction, loginResetAction};

export default connect(mapStateLoginToProps, actions)(Login);
