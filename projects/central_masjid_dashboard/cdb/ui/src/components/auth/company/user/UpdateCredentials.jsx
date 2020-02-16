import React, {Component} from "react";
import axios from "axios";
import {MODE_EDIT, MODE_VIEW} from "../../../partials/InputField";
import NewCredentialFields from "./NewCredentialFields";
import {collectErrorMessageFromResponseData} from "../../../../services/utilities";
import {ALERT_SUCCESS, showAlert} from "../../../../store/common/alert/actions";
import {connect} from "react-redux";
import {isAdminLogin, isSuperAdminLogin} from "../../../../services/auth/AuthNZ";
import {Redirect} from "react-router";
import {
    Button
} from '@material-ui/core';
import Layout01 from "../../../layout/Layout01/Layout01";
import SideLabelInputText from "../../../common/SideLabelInputText/SideLabelInputText";

const baseUrl = process.env.REACT_APP_API_BASE_PATH;

class UpdateCredentials extends Component {
    initialState = {
        existingCredential: "",
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
        this.validateCredentials = this.validateCredentials.bind(this);
        this.handleServerResponse = this.handleServerResponse.bind(this);
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    onSubmit(event) {
        event.preventDefault();
        let email = undefined;
        let request = {newCredential: this.state.newCredential};
        let requestUrl = undefined;

        if (this.props.resetCredential) {
            email = this.props.companyUserServiceResponse.target.email;
            requestUrl = `${baseUrl}/api/auth/credential/reset/user/${email}`;
        } else {
            email = this.props.login.user.email;
            request.existingCredential = this.state.existingCredential;
            requestUrl = `${baseUrl}/api/auth/credential/update/user/${email}`;
        }

        axios.put(requestUrl, request)
            .then(response => this.handleServerResponse(response.data),
                failResponse => this.handleServerResponse(failResponse.response.data))
            .catch(errorResponse => this.handleServerResponse(errorResponse.response.data));
    }

    getRedirectUrl(state, props, user) {
        if (!props.resetCredential) {
            return;
        }

        const adminLogin = isAdminLogin(props.login);
        const superAdminLogin = isSuperAdminLogin(props.login);

        if (superAdminLogin) {
            return;
        }

        const company = props.login.company;

        if (!adminLogin || !user || !company || user.companyId !== company.id) {
            return `${process.env.PUBLIC_URL}/forbidden`;
        }
    }

    validateCredentials() {
        return this.state.newCredential === this.state.confirmCredential && this.state.newCredential.length >= 8;
    }

    handleServerResponse(responseData) {
        const successful = responseData && responseData.successful && responseData.target;
        if (successful) {
            this.props.showAlert(ALERT_SUCCESS, responseData.message);
            this.setState({...this.initialState, successMessage: responseData.message});
            this.props.back();
        } else {
            const errorMessage = collectErrorMessageFromResponseData(responseData, "Failed to update password.");
            this.setState({
                successMessage: "",
                errorMessage: errorMessage
            });
        }
    }

    render() {
        let user = undefined;
        if (this.props.resetCredential) {
            user = this.props.companyUserServiceResponse.target;
        } else {
            user = this.props.login.user;
        }

        const redirectUrl = this.getRedirectUrl(this.state, this.props, user);
        if (redirectUrl) {
            return <Redirect to={redirectUrl}/>;
        }

        const validCredential = this.validateCredentials();

        return (
            <Layout01>
                <div>
                    <h3>
                        {this.props.resetCredential ? "Reset" : "Update"} Password
                    </h3>
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
                        <SideLabelInputText
                            mode={MODE_VIEW}
                            label="Email"
                            name="email"
                            required={true}
                            value={user.email}/>
                        {!this.props.resetCredential &&
                        <SideLabelInputText
                            mode={MODE_EDIT}
                            label="Existing password"
                            name="existingCredential"
                            onChange={this.onChange}
                            required={true}
                            value={this.state.existingCredential}
                            type="password"
                            // error={isNotBlank(fieldErrors["user.firstName"])}
                            // help={fieldErrors["user.firstName"]}
                        />
                        }
                        <NewCredentialFields
                            newCredential={this.state.newCredential}
                            confirmCredential={this.state.confirmCredential}
                            onChangeNewCredential={this.onChange}
                            onChangeConfirmCredential={this.onChange}/>
                        <div style={{marginTop: "20px"}}>
                            <Button onClick={this.props.back} variant="outlined" color="primary" type="button">
                                Back
                            </Button>
                            <Button disabled={!validCredential} variant="outlined" color="primary" type="submit">
                                Update
                            </Button>
                        </div>
                    </form>

                </div>
            </Layout01>
        );
    }
}

export default connect(undefined, {showAlert})(UpdateCredentials);

