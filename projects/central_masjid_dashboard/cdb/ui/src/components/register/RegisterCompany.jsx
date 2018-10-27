import React, {Component} from "react";
import {connect} from "react-redux";
import StateSelect from "../partials/StateSelect";
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
                <h3>Register Masjid</h3>
                {formOrConfirm}
            </div>
        );
    }

    registrationForm() {
        return (
            <div>
                <div>
                    <img src="images/company_create_update.svg" alt="Company create update"/>
                </div>
                <div>
                    <form onSubmit={this.onSubmit}>
                        <InputField
                            label="Masjid Name"
                            name="companyName"
                            onChange={this.onChange}
                            required={true}
                            value={this.state.companyName}/>

                        <InputField
                            label="Street"
                            name="companyAddressStreet"
                            onChange={this.onChange}
                            required={true}
                            value={this.state.companyAddressStreet}/>

                        <InputField
                            label="City"
                            name="companyAddressCity"
                            onChange={this.onChange}
                            required={true}
                            value={this.state.companyAddressCity}/>

                        <StateSelect
                            label="State"
                            selectedStateAbv={this.state.companyAddressState}
                            name="companyAddressState"
                            required={true}
                            onChange={this.onChange}/>

                        <InputField
                            label="Zip"
                            name="companyAddressZip"
                            onChange={this.onChange}
                            required={true}
                            value={this.state.companyAddressZip}/>

                        <button type="submit">Next</button>
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

