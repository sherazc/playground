import React, {Component} from "react";
import {Redirect} from "react-router";
import {connect} from "react-redux";
import InputField from "../partials/InputField";
import {saveCompanyUserAction} from "../../store/register-company/actions";

class RegisterCompanyUser extends Component {

    constructor(props) {
        super(props);
        this.state = this.createFlatState(this.props.companyUserServiceResponse);

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    onSubmit(event) {
        event.preventDefault();
        let company = this.props.companyServiceResponse.target;
        let user = this.props.companyUserServiceResponse.target;
        const saveUser = {
            id: user.id,
            "companyId": company.id,
            "email": this.state.email,
            "password": this.state.password,
            "firstName": this.state.firstName,
            "lastName": this.state.lastName,
            "roles": ["ADMIN"],
            "active": true,
            "verified": true

        };
        this.props.saveCompanyUserAction(saveUser);
    }

    createFlatState(companyUserServiceResponse) {
        return {...companyUserServiceResponse.target}
    }

    isCompanyInState() {
        let company = this.props.companyServiceResponse.target;
        return company && company.id;
    }

    render() {
        if (!this.isCompanyInState()) {
            return <Redirect to="/register"/>
        }
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
                <form onSubmit={this.onSubmit}>
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
                    <InputField
                        label="Password"
                        name="password"
                        onChange={this.onChange}
                        required={true}
                        fieldError={fieldErrors["user.password"]}
                        value={this.state.password}/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

const actions = {
    saveCompanyUserAction: saveCompanyUserAction
};


const mapStateToProps = state => {
    return {
        companyServiceResponse: state.registerCompany.companyServiceResponse,
        companyUserServiceResponse: state.registerCompany.companyUserServiceResponse
    };
};

export default connect(mapStateToProps, actions)(RegisterCompanyUser);

