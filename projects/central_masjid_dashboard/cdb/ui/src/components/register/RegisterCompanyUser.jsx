import React, {Component} from "react";
import {connect} from "react-redux";
// import InputField from "../partials/InputField";
// import {saveCompanyAction} from "../../store/register-company/actions";

class RegisterCompanyUser extends Component {

    render() {
        return (
            <div>
                <h3>Register</h3>
                {this.registrationForm()}
            </div>
        );
    }

    registrationForm() {
        return (
            <div>
                <div>
                    <img src="../images/user_create_update.svg" alt="User create update"/>
                </div>
                <div>

                </div>
            </div>
        );
    }

    registrationConfimation() {
        const {name} = this.props.createUpdateCompany.target.company;
        const {email} = this.props.createUpdateCompany.target.adminUser;
        return (
            <div>
                Registration Complete
                <br/>
                {name} registered by {email}.
            </div>
        );
    }
}

/*
{
   "company":    {
      "name": "Company Name",
      "address":       {
         "street": "123 St",
         "city": "City",
         "state": "ST",
         "zip": "12345",
         "longitude": "1.1",
         "latitude": "2.2"
      },
      "icon": "icon"
   },
   "adminUser": {
      "email": "email@email.com",
      "password": "password123",
      "firstName": "First",
      "lastName": "Last",
      "roles": ["ADMIN"],
      "active": true,
      "verified": true
   }
}
 */


const actions = {
    //createUpdateCompanyAction: createUpdateCompanyAction
};


const mapStateToProps = state => {
    return {
        //createUpdateCompany: state.company.createUpdateCompany
    };
};

export default connect(mapStateToProps, actions)(RegisterCompanyUser);

