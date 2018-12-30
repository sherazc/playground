import React from "react";
import InputField from "../../../partials/InputField";

const matchCredentials = (newCredential, confirmCredential) => {
    console.log(`Chaged ${newCredential} = ${confirmCredential}`);
};

const CreateCredential = (props) => {
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
                onBlur={() => matchCredentials(props.newCredential, props.confirmCredential)}
            />
        </>
    );
};

export default CreateCredential;
