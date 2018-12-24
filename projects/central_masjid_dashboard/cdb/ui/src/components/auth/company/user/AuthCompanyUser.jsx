import React, {Component} from "react";
import {connect} from "react-redux";
import InputField from "../../../partials/InputField";
import {saveCompanyUserAction} from "../../../../store/register-company/actions";
import {createLoginMapStateToProps} from "../../../../store/lib/utils";

class AuthCompanyUser extends Component {

    constructor(props) {
        super(props);
        this.state = this.createInitialState(this.props.companyUserServiceResponse);

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    onSubmit(event) {
        event.preventDefault();
        let company = undefined;
        if (this.props.addUserFlow) {
            company = this.props.company;
        } else {
            company = this.props.companyServiceResponse.target;
        }

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
        this.props.saveCompanyUserAction(company, saveUser);
    }

    createInitialState(companyUserServiceResponse) {
        return {...companyUserServiceResponse.target}
    }

    render() {
        /*
        if (!shouldBeOnRegisterUser(this.props.companyServiceResponse.target, this.props.addUserFlow)) {
            return <Redirect to={`${process.env.PUBLIC_URL}/register`}/>;
        }
        */
        return (
            <div>
                <h3>Add user to company</h3>
                {this.registrationForm()}
            </div>
        );
    }

    registrationForm() {
        const fieldErrors = this.props.companyUserServiceResponse.fieldErrors;
        const action = this.props.match.params.action;
        return (
            <div>
                <div>
                    <img src={`${process.env.PUBLIC_URL}/images/user_create_update.svg`} alt="User create update"/>
                </div>
                <form onSubmit={this.onSubmit}>
                    <InputField
                        mode={action}
                        label="First Name"
                        name="firstName"
                        onChange={this.onChange}
                        required={true}
                        fieldError={fieldErrors["user.firstName"]}
                        value={this.state.firstName}/>
                    <InputField
                        mode={action}
                        label="Last Name"
                        name="lastName"
                        onChange={this.onChange}
                        required={true}
                        fieldError={fieldErrors["user.lastName"]}
                        value={this.state.lastName}/>
                    <InputField
                        mode={action}
                        label="Email"
                        type="email"
                        name="email"
                        onChange={this.onChange}
                        required={true}
                        fieldError={fieldErrors["user.email"]}
                        value={this.state.email}/>

                    {action === "create" &&
                        <InputField
                            label="Password"
                            name="password"
                            onChange={this.onChange}
                            required={true}
                            fieldError={fieldErrors["user.password"]}
                            value={this.state.password}/>
                    }
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
        companyUserServiceResponse: state.registerCompany.companyUserServiceResponse,
        ...createLoginMapStateToProps(state)
    };
};

export default connect(mapStateToProps, actions)(AuthCompanyUser);

