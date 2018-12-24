import React, {Component} from "react";
import {connect} from "react-redux";
import InputField from "../../../partials/InputField";
import {createCompanyUserAction, updateCompanyUserAction} from "../../../../store/register-company/actions";

import {NavLink} from "react-router-dom";
import {Redirect} from "react-router";

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


        console.log(user);


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

        saveUser.companyId = user.companyId;

        const action = this.props.match.params.action;
        if (action === "create") {
            this.props.createCompanyUserAction(company, saveUser);
        } else {
            this.props.updateCompanyUserAction(saveUser);
        }
    }

    createInitialState(companyUserServiceResponse) {
        return {...companyUserServiceResponse.target}
    }

    render() {
        let user = this.props.companyUserServiceResponse.target;
        const action = this.props.match.params.action;

        if (action !== 'create' && (!user || !user.id)) {
            return <Redirect to={`${process.env.PUBLIC_URL}/auth/company/user/create`}/>;
        }
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

                <hr/>
                <NavLink to={`${process.env.PUBLIC_URL}/auth/company/user/view`}>
                    View Company User
                </NavLink>
                <br/>
                <NavLink to={`${process.env.PUBLIC_URL}/auth/company/user/edit`}>
                    Edit Company User
                </NavLink>
                <br/>
                <NavLink to={`${process.env.PUBLIC_URL}/auth/company/user/list/all`}>
                    All Companies, All Users; List
                </NavLink>

            </div>
        );
    }
}

const actions = {saveCompanyUserAction: createCompanyUserAction, updateCompanyUserAction};



const mapStateToProps = state => {
    return {
        companyServiceResponse: state.registerCompany.companyServiceResponse,
        companyUserServiceResponse: state.registerCompany.companyUserServiceResponse,
        login: state.login
    };
};

export default connect(mapStateToProps, actions)(AuthCompanyUser);

