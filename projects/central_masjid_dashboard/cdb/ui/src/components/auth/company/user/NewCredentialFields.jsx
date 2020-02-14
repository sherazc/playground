import React, {Component} from "react";
import SideLabelInputText from "../../../common/SideLabelInputText/SideLabelInputText";

class NewCredentialFields extends Component {
    constructor(props) {
        super(props);
        this.state = this.createInitialState();
        this.onChangeNewCredential = this.onChangeNewCredential.bind(this);
        this.onChangeConfirmCredential = this.onChangeConfirmCredential.bind(this);
    }

    createInitialState() {
        return {
            newCredential: "",
            confirmCredential: ""
        };
    }

    componentDidMount() {
        this.setState({
            newCredential: this.props.newCredential,
            confirmCredential: this.props.confirmCredential
        });
    }

    onChangeNewCredential(event) {
        this.props.onChangeNewCredential(event);
        this.setState({newCredential: event.target.value})
    }

    onChangeConfirmCredential(event) {
        this.props.onChangeConfirmCredential(event);
        this.setState({confirmCredential: event.target.value})
    }

    render() {
        const credentialNotMatch = this.state.newCredential !== this.state.confirmCredential;
        return (
            <>
                <SideLabelInputText
                    mode="edit"
                    label="New Password"
                    name="newCredential"
                    type="password"
                    value={this.props.newCredential}
                    onChange={this.onChangeNewCredential}
                    required={true}/>

                <SideLabelInputText
                    mode="edit"
                    label="Confirm"
                    name="confirmCredential"
                    type="password"
                    value={this.props.confirmCredential}
                    onChange={this.onChangeConfirmCredential}
                    required={true}
                    error={credentialNotMatch}
                    help={credentialNotMatch && 'Password do not match'}
                />
            </>
        );
    }
}

export default NewCredentialFields;
