import React, {Component} from "react";
import {isAuthPresent, verifyAuthorization} from "../../../../services/auth/AuthNZ";
import {Redirect} from "react-router";
import InputField from "../../../partials/InputField";
import NewCredentialFields from "./NewCredentialFields";
const baseUrl = process.env.REACT_APP_API_BASE_PATH;

class ResetCredentials extends Component {
    initialState = {
        newCredential: "",
        confirmCredential: "",
        successMessage: "",
        errorMessage: ""
    };

    state = {...this.initialState};

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    validateCredentials() {
        return this.state.newCredential === this.state.confirmCredential && this.state.newCredential.length >= 8;
    }

    onSubmit(event) {
        event.preventDefault();
    }

    getRedirectUrl(state, props, user) {
        const isLoggedIn = isAuthPresent(props.login);
        const adminLogin = isLoggedIn && verifyAuthorization(props.login.tokenPayload, ['ADMIN']);
        const superAdminLogin = isLoggedIn && verifyAuthorization(props.login.tokenPayload, ['SUPER_ADMIN']);

        if (superAdminLogin) {
            return;
        }

        const company = props.login.company;

        if (!adminLogin || !user || !company || user.companyId !== company.id) {
            return `${process.env.PUBLIC_URL}/forbidden`;
        }
    }

    render() {
        const user = this.props.companyUserServiceResponse.target;
        const redirectUrl = this.getRedirectUrl(this.state, this.props, user);
        if (redirectUrl) {
            return <Redirect to={redirectUrl}/>;
        }

        const validCredential = this.validateCredentials();

        return (
            <div>
                <h3>Reset Credentials</h3>
                {this.state.successMessage &&
                <div>
                    {this.state.successMessage}
                </div>
                }
                {this.state.errorMessage &&
                <div style={{color: "red"}}>
                    {this.state.errorMessage}
                </div>
                }
                <form onSubmit={this.onSubmit}>
                    <InputField
                        mode="view"
                        label="Email"
                        name="email"
                        required={true}
                        value={user.email}/>
                    <NewCredentialFields
                        newCredential={this.state.newCredential}
                        confirmCredential={this.state.confirmCredential}
                        newCredentialOnChange={this.onChange}
                        confirmCredentialOnChange={this.onChange}/>
                    <button type="submit" disabled={!validCredential}>Update</button>
                </form>
                <hr/>
                <button onClick={this.props.back}>Back</button>
            </div>
        );
    }
}

export default ResetCredentials;