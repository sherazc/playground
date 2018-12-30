import React, {Component} from "react";
import InputField from "../../../partials/InputField";
import CreateCredential from "./CreateCredential";

class UpdateCredentials extends Component {
    state = {
        existingCredential: "",
        newCredential: "",
        confirmCredential: "",

    };

    onChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    matchCredentials(event) {
        console.log("Changed " + event.target.name);
    }

    render() {
        return (
            <div>
                <h3>Update Credentials</h3>

                <InputField
                    mode="edit"
                    label="Existing password"
                    name="existingCredential"
                    onChange={this.onChange.bind(this)}
                    required={true}
                    value={this.state.existingCredential}
                />

                <CreateCredential
                    newCredential={this.state.newCredential}
                    confirmCredential={this.state.confirmCredential}
                    newCredentialOnChange={this.onChange.bind(this)}
                    confirmCredentialOnChange={this.onChange.bind(this)}
                    matchCredentials={this.matchCredentials.bind(this)}/>

                <button onClick={this.props.back}>Back</button>

                <hr/>
                <button onClick={this.props.back}>Back</button>
            </div>
        );
    }
}

export default UpdateCredentials;
