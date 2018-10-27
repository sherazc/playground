import React, {Component} from "react";
import {connect} from "react-redux";
import InputField from "../partials/InputField";
import {createUpdateCompanyAction} from "../../store/company/actions";

class RegisterCompany extends Component {

    constructor(props) {
        super(props);
        this.state = this.createBlankFlatCompany();

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    onSubmit(event) {
        event.preventDefault();
        // const state = this.state;

        const createUpdateCompany = {
            company: {
                name: this.state.companyName,
                address: {
                    street: this.state.companyAddressStreet,
                    city: this.state.companyAddressCity,
                    state: this.state.companyAddressState,
                    zip: this.state.companyAddressZip
                }
            },
            adminUser: {
                email: this.state.adminUserEmail,
                password: this.state.adminUserPassword,
                firstName: this.state.adminUserFirstName,
                lastName: this.state.adminUserLastName,
                roles: ["ADMIN"],
                active: true,
                verified: true
            }
        };
        this.props.createUpdateCompanyAction(createUpdateCompany);
    }

    createBlankFlatCompany() {
        return {
            companyName: "",
            companyAddressStreet: "",
            companyAddressCity: "",
            companyAddressState: "",
            companyAddressZip: "",
            companyAddressLongitude: "",
            companyAddressLatitude: "",
            companyIcon: "",
            adminUserEmail: "",
            adminUserPassword: "",
            adminUserFirstName: "",
            adminUserLastName: "",
            adminUserRoles: []
        }
    }

    render() {
        const registrationComplete = this.props.createUpdateCompany.successful;

        let formOrConfirm;
        if (registrationComplete) {
            formOrConfirm = this.registrationConfimation();
        } else {
            formOrConfirm = this.registrationForm();
        }

        return (
            <div>
                <h3>Register</h3>
                {formOrConfirm}
            </div>
        );
    }

    registrationForm() {
        return (
            <div>
                <div>
                    <img src="images/user_create_update.svg" alt="User create update"/>
                </div>
                <div>
            <form onSubmit={this.onSubmit}>
                <InputField
                    label="Email address"
                    name="adminUserEmail"
                    onChange={this.onChange}
                    required={true}
                    value={this.state.adminUserEmail}
                    type="email"
                    help="We'll never share your email with anyone else."
                />

                <InputField
                    label="Password"
                    name="adminUserPassword"
                    type="password"
                    onChange={this.onChange}
                    required={true}
                    value={this.state.adminUserPassword}/>

                <InputField
                    label="First Name"
                    name="adminUserFirstName"
                    onChange={this.onChange}
                    value={this.state.adminUserFirstName}/>

                <InputField
                    label="Last Name"
                    name="adminUserLastName"
                    onChange={this.onChange}
                    value={this.state.adminUserLastName}/>

                <button type="submit">Submit</button>
            </form>
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
    createUpdateCompanyAction: createUpdateCompanyAction
};


const mapStateToProps = state => {
    return {
        createUpdateCompany: state.company.createUpdateCompany
    };
};

export default connect(mapStateToProps, actions)(RegisterCompany);

