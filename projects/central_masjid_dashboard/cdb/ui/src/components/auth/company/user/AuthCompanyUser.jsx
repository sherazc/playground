import React, {Component} from "react";
import {connect} from "react-redux";
import InputField from "../../../partials/InputField";
import {
    createCompanyUserAction,
    updateCompanyUserAction
} from "../../../../store/register-company/actions";

import {NavLink} from "react-router-dom";
import {Redirect} from "react-router";
import {getPathParamFromProps} from "../../../../services/utilities";
import {isAuthPresent, verifyAuthorization} from "../../../../services/auth/AuthNZ";

class AuthCompanyUser extends Component {

    constructor(props) {
        super(props);
        this.state = this.createInitialState(this.props.companyUserServiceResponse);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const prevAction = getPathParamFromProps(prevProps, "action");
        const currentAction = getPathParamFromProps(this.props, "action");
        if (currentAction === "create" && prevAction !== "create") {
            this.setState(this.createInitialState(this.props.companyUserServiceResponse));
        }
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    onSubmit(event) {
        event.preventDefault();

        let company = undefined;
        if (this.props.addUserFlow) {
            company = this.props.login.company;
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

        saveUser.companyId = user.companyId;

        const action = getPathParamFromProps(this.props, "action");
        if (action === "create") {
            this.props.createCompanyUserAction(company, saveUser);
        } else {
            this.props.updateCompanyUserAction(saveUser);
        }
    }

    createInitialState(companyUserServiceResponse) {
        const companyUser = {...companyUserServiceResponse.target};
        companyUser.password = "";
        return companyUser
    }

    getRedirectUrl(props) {
        const action = getPathParamFromProps(this.props, "action");
        const actionViewOrEdit = action === "view" || action === "edit";
        const isLoggedIn = isAuthPresent(props.login);
        const adminLogin = isLoggedIn && verifyAuthorization(this.props.login.tokenPayload, ['ADMIN']);
        const isNewCompanyRegisterComplete = props.companyServiceResponse && props.companyServiceResponse.target && props.companyServiceResponse.target.id;
        const companyUserSelected = props.companyUserServiceResponse && props.companyUserServiceResponse.target && props.companyUserServiceResponse.target.id;

        if (action === "create" && !isLoggedIn && !isNewCompanyRegisterComplete) {
            return `${process.env.PUBLIC_URL}/auth/company/create`;
        }

        if (actionViewOrEdit && !adminLogin) {
            return `${process.env.PUBLIC_URL}/forbidden`;
        }

        if (actionViewOrEdit && adminLogin && !companyUserSelected) {
            return `${process.env.PUBLIC_URL}/auth/company/user/list/current`;
        }
    }

    render() {
        const action = getPathParamFromProps(this.props, "action");
        // todo create new registration steps display e.g. 1 - 2 - 3
        const redirectUrl = this.getRedirectUrl(this.props);
        if (redirectUrl) {
            return <Redirect to={redirectUrl}/>;
        }
        return (
            <div>
                <h3>Company user {action}</h3>
                {this.registrationForm()}
            </div>
        );
    }

    registrationForm() {
        const fieldErrors = this.props.companyUserServiceResponse.fieldErrors;
        const action = getPathParamFromProps(this.props, "action");
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
                        mode={action}
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

const actions = {createCompanyUserAction, updateCompanyUserAction};

const mapStateToProps = state => {
    return {
        companyServiceResponse: state.registerCompany.companyServiceResponse,
        companyUserServiceResponse: state.registerCompany.companyUserServiceResponse,
        login: state.login
    };
};

export default connect(mapStateToProps, actions)(AuthCompanyUser);
