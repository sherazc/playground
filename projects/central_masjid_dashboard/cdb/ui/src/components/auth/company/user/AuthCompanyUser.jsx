import React, {Component} from "react";
import {connect} from "react-redux";
import {MODE_EDIT, MODE_VIEW} from "../../../partials/InputField";
import {
    createCompanyUserAction,
    updateCompanyUserAction
} from "../../../../store/register-company/actions";

import {NavLink} from "react-router-dom";
import {Redirect} from "react-router";
import {getReactRouterPathParamFromUrl, isNotBlank} from "../../../../services/utilities";
import {isAdminLogin, isAuthPresent, isMyProfile, isSuperAdminLogin} from "../../../../services/auth/AuthNZ";
import UpdateCredentials from "./UpdateCredentials";
import Layout01 from "../../../layout/Layout01/Layout01";
import {
    Button
} from '@material-ui/core';
import SideLabelInputText from "../../../common/SideLabelInputText/SideLabelInputText";


class AuthCompanyUser extends Component {

    constructor(props) {
        super(props);
        this.state = this.createInitialState(this.props.companyUserServiceResponse);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const prevAction = getReactRouterPathParamFromUrl(prevProps, "action");
        const currentAction = getReactRouterPathParamFromUrl(this.props, "action");
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

        const action = getReactRouterPathParamFromUrl(this.props, "action");
        if (action === "create") {
            const loginInCompany = this.props.login.company;
            let company;
            if (loginInCompany && loginInCompany.id) {
                company = loginInCompany;
            } else {
                company = this.props.companyServiceResponse.target;
            }
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
        const action = getReactRouterPathParamFromUrl(props, "action");
        const actionViewOrEdit = action === MODE_VIEW || action === MODE_EDIT;
        const isLoggedIn = isAuthPresent(props.login);
        const adminLogin = isAdminLogin(props.login);
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
        const myProfile = isMyProfile(this.props);
        const action = getReactRouterPathParamFromUrl(this.props, "action");
        const adminLogin = isAdminLogin(this.props.login);
        const superAdminLogin = isSuperAdminLogin(this.props.login);
        // todo create new registration steps display e.g. 1 - 2 - 3
        const redirectUrl = this.getRedirectUrl(this.state, this.props);
        if (redirectUrl) {
            return <Redirect to={redirectUrl}/>;
        }
        if (this.state.resetCredentials) {
            return <UpdateCredentials resetCredential {...this.props} back={this.backToFromResetUpdateCredentials.bind(this)}/>
        }
        if (this.state.updateCredentials) {
            return <UpdateCredentials resetCredential={false} {...this.props} back={this.backToFromResetUpdateCredentials.bind(this)}/>
        }

        return (
            <Layout01>
            <div>
                <h3>Company
                    user, {action === "create" && loginInCompany.id ? `add user to ${loginInCompany.name}` : action}</h3>
                {this.registrationForm(action, loginInCompany)}
                {(adminLogin || superAdminLogin) &&
                    <button onClick={this.resetCredentials.bind(this)}>
                        Reset Password
                    </button>
                }
                {myProfile &&
                    <button onClick={this.updateCredentials.bind(this)}>
                        Update Password
                    </button>
                }
            </div>
            </Layout01>
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
        const mode = action === "profile" || action === MODE_VIEW ? MODE_VIEW : MODE_EDIT;
        return (
            <div>
                <div>
                    <img src={`${process.env.PUBLIC_URL}/images/user_create_update.svg`} alt="User create update"/>
                </div>
                <form onSubmit={this.onSubmit}>
                    <SideLabelInputText
                        mode={mode}
                        label="First Name"
                        name="firstName"
                        onChange={this.onChange}
                        required={true}
                        error={isNotBlank(fieldErrors["user.firstName"])}
                        help={fieldErrors["user.firstName"]}
                        value={this.state.firstName}/>
                    <SideLabelInputText
                        mode={mode}
                        label="Last Name"
                        name="lastName"
                        onChange={this.onChange}
                        required={true}
                        error={isNotBlank(fieldErrors["user.lastName"])}
                        help={fieldErrors["user.lastName"]}
                        value={this.state.lastName}/>
                    <SideLabelInputText
                        mode={mode}
                        label="Email"
                        type="email"
                        name="email"
                        onChange={this.onChange}
                        required={true}
                        error={isNotBlank(fieldErrors["user.email"])}
                        help={fieldErrors["user.email"]}
                        value={this.state.email}/>

                    {action === "create" &&
                    <SideLabelInputText
                        mode={mode}
                        label="Password"
                        name="password"
                        onChange={this.onChange}
                        required={true}
                        error={isNotBlank(fieldErrors["user.password"])}
                        help={fieldErrors["user.password"]}
                        value={this.state.password}/>
                    }
                    {mode !== MODE_VIEW &&
                    <Button variant="outlined" color="primary" type="submit">
                        {loginInCompany.id ? "Save" : "Next"}
                    </Button>
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
