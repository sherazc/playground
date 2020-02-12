import React, {Component} from "react";
import {connect} from "react-redux";
import {MODE_CREATE, MODE_EDIT, MODE_PROFILE, MODE_VIEW} from "../../../partials/InputField";
import {
    createCompanyUserAction,
    updateCompanyUserAction
} from "../../../../store/register-company/actions";

import {NavLink} from "react-router-dom";
import {Redirect} from "react-router";
import {
    getReactRouterPathParamFromUrl,
    isNotBlank,
    replaceNonEmailCharacters,
    replaceNonNameCharacters,
    trimToLength
} from "../../../../services/utilities";
import {
    isAdminLogin,
    isAuthPresent,
    isSameUsers,
    isSuperAdminLogin,
    loadUserFromProps
} from "../../../../services/auth/AuthNZ";
import UpdateCredentials from "./UpdateCredentials";
import Layout01 from "../../../layout/Layout01/Layout01";
import {
    Button
} from '@material-ui/core';
import SideLabelInputText from "../../../common/SideLabelInputText/SideLabelInputText";
import {createEmptyCompanyUser} from "../../../../services/domain/EmptyObject";


class AuthCompanyUser extends Component {

    constructor(props) {
        super(props);
        this.state = this.createInitialState(this.props.companyUserServiceResponse);
        this.onChange = this.onChange.bind(this);
        this.onChangeNameCharacters = this.onChangeNameCharacters.bind(this);
        this.onChangeEmailCharacters = this.onChangeEmailCharacters.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    createInitialState(companyUserServiceResponse) {
        return {
            ...companyUserServiceResponse.target,
            password: "",
            updateCredentials: false,
            resetCredentials: false,
            validEmail: true
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const prevAction = getReactRouterPathParamFromUrl(prevProps, "action");
        const currentAction = getReactRouterPathParamFromUrl(this.props, "action");
        if ((currentAction === MODE_CREATE && prevAction !== MODE_CREATE)
            || (currentAction === MODE_PROFILE && prevAction !== MODE_PROFILE)) {
            this.setState(this.createInitialState(this.props.companyUserServiceResponse));
        }
    }

    onChangeNameCharacters(event) {
        this.setState({[event.target.name]: replaceNonNameCharacters(event.target.value, 30)});
    }

    onChangeEmailCharacters(event) {
        this.setState({[event.target.name]: replaceNonEmailCharacters(event.target.value, 30)});
        this.setState({
            validEmail:
                /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/.test(event.target.value)
        });
    }

    onChange(event) {
        this.setState({[event.target.name]: trimToLength(event.target.value, 100)});
    }


    onSubmit(event) {
        event.preventDefault();
        let user = this.props.companyUserServiceResponse.target;

        const saveUser = createEmptyCompanyUser();
        saveUser.id = user.id;
        saveUser.companyId = this.state.companyId;
        saveUser.email = this.state.email;
        saveUser.password = this.state.password;
        saveUser.firstName = this.state.firstName;
        saveUser.lastName = this.state.lastName;

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
            const userInProps = loadUserFromProps(this.props);
            saveUser.emailVerifyCode = userInProps.emailVerifyCode;
            saveUser.registrationDate = userInProps.registrationDate;
            saveUser.active = userInProps.active;
            saveUser.verified = userInProps.verified;
            saveUser.roles = userInProps.roles;
            this.props.updateCompanyUserAction(saveUser);
        }
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

        if (action === MODE_PROFILE && !isLoggedIn) {
            return `${process.env.PUBLIC_URL}/`;
        }

        if (action === MODE_CREATE && !isLoggedIn && !isNewCompanyRegisterComplete) {
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
        const mode = action === MODE_PROFILE || action === MODE_VIEW ? MODE_VIEW : MODE_EDIT;
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <SideLabelInputText
                        mode={mode}
                        label="First Name"
                        name="firstName"
                        onChange={this.onChangeNameCharacters}
                        required={true}
                        error={isNotBlank(fieldErrors["user.firstName"])}
                        help={fieldErrors["user.firstName"]}
                        value={this.state.firstName}/>
                    <SideLabelInputText
                        mode={mode}
                        label="Last Name"
                        name="lastName"
                        onChange={this.onChangeNameCharacters}
                        required={true}
                        error={isNotBlank(fieldErrors["user.lastName"])}
                        help={fieldErrors["user.lastName"]}
                        value={this.state.lastName}/>
                    <SideLabelInputText
                        mode={mode}
                        label="Email"
                        type="email"
                        name="email"
                        onChange={this.onChangeEmailCharacters}
                        required={true}
                        error={!this.state.validEmail || isNotBlank(fieldErrors["user.email"])}
                        help={!this.state.validEmail ? "Invalid Email" : fieldErrors["user.email"]}
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
            </div>
        );
    }


    actionToHeading(action) {
        let result = '';
        if (!action || MODE_CREATE === action) {
            result = "Register User";
        } else if (MODE_EDIT === action) {
            result = "Edit User Profile";
        } else if (MODE_VIEW === action || MODE_PROFILE === action) {
            result = "User Profile";
        }
        return result;
    }

    actionToDescription(action, loginCompany, newRegisterCompany, myProfile) {
        let result = '';
        if (action === MODE_CREATE) {
            if (loginCompany && loginCompany.id) {
                result = `Add user to ${loginCompany.name}`
            } else if (newRegisterCompany && newRegisterCompany.id) {
                result = `Add user to ${newRegisterCompany.name}`
            }
        } else if (MODE_EDIT === action) {
            if (myProfile) {
                result = "Edit my user profile";
            } else {
                result = "Edit another user profile";
            }
        } else if (MODE_VIEW === action || MODE_PROFILE === action) {
            if (myProfile) {
                result = "Viewing my user profile";
            } else {
                result = "Viewing another user profile";
            }
        }

        return result;
    }

    createNavLinks(props) {
        const isLoggedIn = isAuthPresent(props.login);
        if (!isLoggedIn) return;

        const action = getReactRouterPathParamFromUrl(props, "action");
        const adminLogin = isAdminLogin(props.login);
        const superAdminLogin = isSuperAdminLogin(props.login);
        const myProfile = isSameUsers(props.login.user, props.companyUserServiceResponse.target);

        return (<>
            {action !== MODE_EDIT && (<>
                <NavLink
                    to={`${process.env.PUBLIC_URL}/auth/company/user/edit`}>
                    Edit User
                </NavLink>
                {this.makeDivider()}
            </>)}
            {myProfile && (
                <NavLink to="#" onClick={this.updateCredentials.bind(this)}>
                    Update Password
                </NavLink>
            )}
            {(adminLogin || superAdminLogin) && (<>
                {myProfile && this.makeDivider()}
                <NavLink to="#" onClick={this.resetCredentials.bind(this)}>
                    Reset Password
                </NavLink>
            </>)}
        </>);
    }

    makeDivider() {
        return <span style={{margin: "10px"}}>|</span>
    }

    render() {
        const loginInCompany = this.props.login.company;
        const myProfile = isSameUsers(this.props.login.user, this.props.companyUserServiceResponse.target);
        const action = getReactRouterPathParamFromUrl(this.props, "action");

        // todo create new registration steps display e.g. 1 - 2 - 3
        const redirectUrl = this.getRedirectUrl(this.state, this.props);
        if (redirectUrl) {
            return <Redirect to={redirectUrl}/>;
        }
        if (this.state.resetCredentials) {
            return <UpdateCredentials resetCredential {...this.props}
                                      back={this.backToFromResetUpdateCredentials.bind(this)}/>
        }
        if (this.state.updateCredentials) {
            return <UpdateCredentials resetCredential={false} {...this.props}
                                      back={this.backToFromResetUpdateCredentials.bind(this)}/>
        }

        return (
            <Layout01>
                <div>
                    <h1>{this.actionToHeading(action)}</h1>
                    {this.createNavLinks(this.props)}
                    <div>{this.actionToDescription(action, loginInCompany, this.props.companyServiceResponse.target, myProfile)}</div>
                    {this.registrationForm(action, loginInCompany)}
                </div>
            </Layout01>
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
