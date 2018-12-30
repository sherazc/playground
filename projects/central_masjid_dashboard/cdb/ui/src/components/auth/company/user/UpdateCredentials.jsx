import React, {Component} from "react";
import InputField from "../../../partials/InputField";
import NewCredentialFields from "./NewCredentialFields";
import {companyUserCredentialsUpdate} from "../../../../services/auth/CredentialServices";

class UpdateCredentials extends Component {
    state = {
        existingCredential: "",
        newCredential: "",
        confirmCredential: ""
    };

    onChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    onSubmit(event) {
        event.preventDefault();
        const email = this.props.login.user.email;
        companyUserCredentialsUpdate(email, this.state.existingCredential, this.state.confirmCredential);
    }

    validateCredentials() {
        return this.state.newCredential === this.state.confirmCredential && this.state.newCredential.length >= 8;
    }

    render() {
        const validCredential = this.validateCredentials();

        return (
            <div>
                <h3>Update Credentials</h3>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <InputField
                        mode="edit"
                        label="Existing password"
                        name="existingCredential"
                        onChange={this.onChange.bind(this)}
                        required={true}
                        value={this.state.existingCredential}
                    />

                    <NewCredentialFields
                        newCredential={this.state.newCredential}
                        confirmCredential={this.state.confirmCredential}
                        newCredentialOnChange={this.onChange.bind(this)}
                        confirmCredentialOnChange={this.onChange.bind(this)}/>

                    <button type="submit" disabled={!validCredential}>Update</button>
                </form>
                <hr/>
                <button onClick={this.props.back}>Back</button>
            </div>
        );
    }
}

export default UpdateCredentials;
