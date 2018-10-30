import React, {Component} from "react";
import {connect} from "react-redux";
import InputField from "../partials/InputField";
// import InputField from "../partials/InputField";
// import {saveCompanyAction} from "../../store/register-company/actions";

class RegisterCompanyUser extends Component {

    constructor(props) {
        super(props);
        this.state = this.createFlatState(this.props.companyUserServiceResponse);

        this.onChange = this.onChange.bind(this);
        // this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    createFlatState(companyUserServiceResponse) {
        return {...companyUserServiceResponse.target}
    }



    render() {
        console.log(this.state);
        return (
            <div>
                <h3>Register</h3>
                {this.registrationForm()}
            </div>
        );
    }

    registrationForm() {
        const fieldErrors = this.props.companyUserServiceResponse.fieldErrors;
        return (
            <div>
                <div>
                    <img src="../images/user_create_update.svg" alt="User create update"/>
                </div>
                <div>
                    <input name="id" value={this.state.id} readOnly/>
                    <InputField
                        label="First Name"
                        name="firstName"
                        onChange={this.onChange}
                        required={true}
                        fieldError={fieldErrors["user.firstName"]}
                        value={this.state.firstName}/>
                    <InputField
                        label="Last Name"
                        name="lastName"
                        onChange={this.onChange}
                        required={true}
                        fieldError={fieldErrors["user.lastName"]}
                        value={this.state.lastName}/>
                    <InputField
                        label="Email"
                        type="email"
                        name="email"
                        onChange={this.onChange}
                        required={true}
                        fieldError={fieldErrors["user.email"]}
                        value={this.state.email}/>
                    <button type="submit">Submit</button>
                </div>
            </div>
        );
    }
}

const actions = {
    //createUpdateCompanyAction: createUpdateCompanyAction
};


const mapStateToProps = state => {
    return {
        companyUserServiceResponse: state.registerCompany.companyUserServiceResponse
    };
};

export default connect(mapStateToProps, actions)(RegisterCompanyUser);

