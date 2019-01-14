import React from "react";
import InputField from "../../../partials/InputField";

const NewCredentialFields = (props) => {
    return (
        <>
            <InputField
                mode="edit"
                label="New Password"
                name="newCredential"
                required={true}
                value={props.newCredential}
                onChange={props.newCredentialOnChange}
            />
            <InputField
                mode="edit"
                label="Confirm"
                name="confirmCredential"
                required={true}
                value={props.confirmCredential}
                onChange={props.confirmCredentialOnChange}
            />
        </>
    );
};

export default NewCredentialFields;
