import React, {Component}from "react";
import SideLabelInputText from "../../../common/SideLabelInputText/SideLabelInputText";

class NewCredentialFields extends Component {

    constructor(props) {
        super(props);
    }

   render() {

       return (
           <>Show new confirm password error message
               <SideLabelInputText
                   mode="edit"
                   label="New Password"
                   name="newCredential"
                   value={this.props.newCredential}
                   onChange={this.props.onChangeNewCredential}
                   required={true}/>

               <SideLabelInputText
                   mode="edit"
                   label="Confirm"
                   name="confirmCredential"
                   value={this.props.confirmCredential}
                   onChange={this.props.onChangeConfirmCredential}
                   required={true}
                   // error={message}
                   // help={fieldErrors["user.firstName"]}
               />
           </>
       );
   }
}

export default NewCredentialFields;
