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
import ResetCredentials from "./ResetCredentials";
import UpdateCredentials from "./UpdateCredentials";

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
        if ((currentAction === "create" && prevAction !== "create")
            || (currentAction === "profile" && prevAction !== "profile")) {
            this.setState(this.createInitialState(this.props.companyUserServiceResponse));
        }
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    onSubmit(event) {
        event.preventDefault();
        let user = this.props.companyUserServiceResponse.target;

        const saveUser = {
            "id": user.id,
            "companyId": this.state.companyId,
            "email": this.state.email,
            "password": this.state.password,
            "firstName": this.state.firstName,
            "lastName": this.state.lastName,
            "roles": ["ADMIN"],
            "active": true,
            "verified": true
        };

        const action = getPathParamFromProps(this.props, "action");
        if (action === "create") {
            const loginInCompany = this.props.login.company;
            const company = loginInCompany || this.props.companyServiceResponse.target;
            saveUser.companyId = company.id;
            this.props.createCompanyUserAction(company, saveUser, loginInCompany.id);
        } else {
            this.props.updateCompanyUserAction(saveUser);
        }
    }

    createInitialState(companyUserServiceResponse) {
        return {
            ...companyUserServiceResponse.target,
            password: "",
            updateCredentials: false,
            resetCredentials: false
        };
    }

    getRedirectUrl(state, props) {
        const action = getPathParamFromProps(props, "action");
        const actionViewOrEdit = action === "view" || action === "edit";
        const isLoggedIn = isAuthPresent(props.login);
        const adminLogin = isLoggedIn && verifyAuthorization(props.login.tokenPayload, ['ADMIN']);
        const isNewCompanyRegisterComplete = props.companyServiceResponse && props.companyServiceResponse.target && props.companyServiceResponse.target.id;
        const companyUserSelected = props.companyUserServiceResponse && props.companyUserServiceResponse.target && props.companyUserServiceResponse.target.id;

        // Logged in user can do anything to it's profile.
        if (isLoggedIn && props.login.user.id === props.companyUserServiceResponse.target.id) {
            return;
        }

        if (action === "profile" && !isLoggedIn) {
            return `${process.env.PUBLIC_URL}/login`;
        }

        if (action === "create" && !isLoggedIn && !isNewCompanyRegisterComplete) {
            return `${process.env.PUBLIC_URL}/auth/company/create`;
        }

        if ((actionViewOrEdit && !adminLogin)
            || (state.updateCredentials && !adminLogin)) {
            return `${process.env.PUBLIC_URL}/forbidden`;
        }

        if (actionViewOrEdit && adminLogin && !companyUserSelected) {
            return `${process.env.PUBLIC_URL}/auth/company/user/list/current`;
        }
    }

    render() {
        const loginInCompany = this.props.login.company;
        const action = getPathParamFromProps(this.props, "action");
        // todo create new registration steps display e.g. 1 - 2 - 3
        const redirectUrl = this.getRedirectUrl(this.state, this.props);
        if (redirectUrl) {
            return <Redirect to={redirectUrl}/>;
        }
        if (this.state.resetCredentials) {
            return <ResetCredentials {...this.props} back={this.backToFromResetUpdateCredentials.bind(this)}/>
        }
        if (this.state.updateCredentials) {
            return <UpdateCredentials {...this.props} back={this.backToFromResetUpdateCredentials.bind(this)}/>
        }

        return (
            <div>
                <h3>Company
                    user, {action === "create" && loginInCompany.id ? `add user to ${loginInCompany.name}` : action}</h3>
                {this.registrationForm(action, loginInCompany)}
                <button onClick={this.resetCredentials.bind(this)}>
                    Reset Password
                </button>
                <button onClick={this.updateCredentials.bind(this)}>
                    Update Password
                </button>
            </div>
        );
    }

    resetCredentials() {
        this.setState({resetCredentials: true, updateCredentials: false});
    }

    updateCredentials() {
        this.setState({resetCredentials: false, updateCredentials: true});
    }

    backToFromResetUpdateCredentials() {
        this.setState({resetCredentials: false, updateCredentials: false});
    }

    registrationForm(action, loginInCompany) {
        const fieldErrors = this.props.companyUserServiceResponse.fieldErrors;
        const mode = action === "profile" || action === "view" ? "view" : "";
        return (
            <div>
                <div>
                    <img src={`${process.env.PUBLIC_URL}/images/user_create_update.svg`} alt="User create update"/>
                </div>
                <form onSubmit={this.onSubmit}>
                    <InputField
                        mode={mode}
                        label="First Name"
                        name="firstName"
                        onChange={this.onChange}
                        required={true}
                        fieldError={fieldErrors["user.firstName"]}
                        value={this.state.firstName}/>
                    <InputField
                        mode={mode}
                        label="Last Name"
                        name="lastName"
                        onChange={this.onChange}
                        required={true}
                        fieldError={fieldErrors["user.lastName"]}
                        value={this.state.lastName}/>
                    <InputField
                        mode={mode}
                        label="Email"
                        type="email"
                        name="email"
                        onChange={this.onChange}
                        required={true}
                        fieldError={fieldErrors["user.email"]}
                        value={this.state.email}/>

                    {action === "create" &&
                    <InputField
                        mode={mode}
                        label="Password"
                        name="password"
                        onChange={this.onChange}
                        required={true}
                        fieldError={fieldErrors["user.password"]}
                        value={this.state.password}/>
                    }
                    {mode !== "view" &&
                    <button type="submit">
                        {loginInCompany.id ? "Save" : "Next"}
                    </button>
                    }
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
