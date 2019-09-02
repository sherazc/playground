import React, {Component} from "react";
import {connect} from "react-redux";
import InputField from "./partials/InputField";
import {loginAction, loginResetAction} from "../store/login/actions";
import {verifyAuthentication} from "../services/auth/AuthNZ";
import {Redirect} from "react-router";
import {mapStateLoginToProps} from "../store/lib/utils";
import SaveCancel from "./business/admin/TabPrayer/SaveCancel/SaveCancel";
import CloseablePanel from "./common/CloseablePanel/CloseablePanel";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = this.createInitialState();
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.login.token) {
            this.props.loginResetAction();
        }
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
            companyId: "company1",
            email: "super.admin.user@email.com",
            password: "password",
            show: true
        }
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
                <h3>Login</h3>
                {this.props.login.token}
                {this.loginFailedMessage()}
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
                    <button type="button" onClick={() => this.setState({show: !this.state.show})}>show/hide</button>
                </form>
                <CloseablePanel
                    title="Expansion Panel"
                    editMode={this.state.show}
                    onSave={() => console.log("Save")}
                    onCancel={() => console.log("Cancel")}>
                    abc<br/>abc<br/>abc<br/>abc<br/>abc<br/>abc<br/>abc<br/>abc<br/>abc<br/>abc<br/>abc<br/>abc<br/>abc
                </CloseablePanel>
                <SaveCancel
                    show={this.state.show}
                    onSave={() => console.log("Save Click")}
                    onCancel={() => console.log("Cancle Click")}
                    saveLabel="Save"
                    cancelLabel="Cancel"
                />
            </div>
        );
    }
}

const actions = {loginAction, loginResetAction};

export default connect(mapStateLoginToProps, actions)(Login);
