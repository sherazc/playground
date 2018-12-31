import React, {Component} from "react";
import axios from "axios";
import InputField from "../../../partials/InputField";
import NewCredentialFields from "./NewCredentialFields";
import {collectErrorMessageFromResponseData} from "../../../../services/utilities";
import {ALERT_SUCCESS, showAlert} from "../../../../store/common/alert/actions";
import connect from "react-redux/es/connect/connect";

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
        const email = this.props.login.user.email;
        const request = {
            existingCredential: this.state.existingCredential,
            newCredential: this.state.newCredential
        };
        axios.put(`${baseUrl}/api/auth/credential/update/user/${email}`, request)
            .then(response => this.handleServerResponse(response.data),
                failResponse => this.handleServerResponse(failResponse.response.data))
            .catch(errorResponse => this.handleServerResponse(errorResponse.response.data));
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

    validateCredentials() {
        return this.state.newCredential === this.state.confirmCredential && this.state.newCredential.length >= 8;
    }

    render() {
        const validCredential = this.validateCredentials();
        const user = this.props.login.user.email;

        return (
            <div>
                <h3>Update Credentials</h3>
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
                    <InputField
                        mode="edit"
                        label="Existing password"
                        name="existingCredential"
                        onChange={this.onChange}
                        required={true}
                        value={this.state.existingCredential}/>

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

export default connect(undefined, {showAlert})(UpdateCredentials);

