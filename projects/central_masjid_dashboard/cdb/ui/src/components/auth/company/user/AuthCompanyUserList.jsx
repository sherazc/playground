import React, {Component} from "react";
import {activateUser, getAllCompaniesAllUsers, getCompanyAllUsers} from "../../../../services/auth/CompanyListService";
import {getReactRouterPathParamFromUrl, isBlank} from "../../../../services/utilities";
import UserGrid from "./UserGrid";
import {prepareCompanyUserToEdit} from "../../../../store/register-company/actions";
import {connect} from "react-redux";
import {Redirect} from "react-router";
import {isAdminLogin, isSuperAdminLogin} from "../../../../services/auth/AuthNZ";
import Layout01 from "../../../layout/Layout01/Layout01";
import {mapStateLoginToProps} from "../../../../store/lib/utils";

class AuthCompanyUserList extends Component {
    constructor(props) {
        super(props);
        this.state = {editCompanyUserPrepared: false, companiesUsers: []};
        this.onActivateUser = this.onActivateUser.bind(this);
        this.activateUserCallback = this.activateUserCallback.bind(this);
    }

    componentDidMount() {
        const action = getReactRouterPathParamFromUrl(this.props, "action");
        this.updateAllOrCurrentUsers(action);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const prevAction = getReactRouterPathParamFromUrl(prevProps, "action");
        const currentAction = getReactRouterPathParamFromUrl(this.props, "action");
        if (currentAction !== prevAction) {
            this.updateAllOrCurrentUsers(currentAction);
        }
    }

    updateAllOrCurrentUsers(action) {
        const redirectUrl = this.getRedirectUrl(action, this.props);
        if (redirectUrl) {
            return;
        }
        if (action === "all") {
            getAllCompaniesAllUsers(this.updateCompaniesUsers.bind(this));
        } else {
            getCompanyAllUsers(this.updateCompaniesUsers.bind(this), this.props.login.company.id);
        }
    }

    updateCompaniesUsers(companiesUsers) {
        this.setState({companiesUsers});
    }

    editCompanyUser(userId) {
        let user = this.findUserById(this.state.companiesUsers, userId);
        this.props.prepareCompanyUserToEdit(user);
        this.setState({editCompanyUserPrepared: true});
    }

    findUserById(companiesUsers, userId) {
        if (!companiesUsers) {
            return;
        }
        let result;
        for (let i = 0; i < companiesUsers.length; i++) {
            const companyUsers = companiesUsers[i];
            result = companyUsers.users.find(user => user.id === userId);
            if (result) {
                break;
            }
        }
        return result;
    }

    deleteCompanyUser(userId) {
        console.log("Delete user not implemented yet")
    }

    getRedirectUrl(action, props) {
        const adminLogin = isAdminLogin(props.login);
        const superAdminLogin = isSuperAdminLogin(props.login);

        if (action === "current" && !adminLogin && !superAdminLogin) {
            return `${process.env.PUBLIC_URL}/forbidden`;
        }

        if (action === "all" && !superAdminLogin) {
            return `${process.env.PUBLIC_URL}/forbidden`;
        }

        if (this.state.editCompanyUserPrepared) {
            return `${process.env.PUBLIC_URL}/auth/company/user/view`;
        }
    }

    onActivateUser(userId, active) {
        activateUser(this.activateUserCallback, userId, active);
    }


    activateUserCallback(serviceResponse) {
        if (!serviceResponse.target || isBlank(serviceResponse.target.id)) {
            return;
        }
        const updatedUser = serviceResponse.target;

        for (let i = 0; i < this.state.companiesUsers.length; i++) {
            const companyUsers = this.state.companiesUsers[i];
            for (let j = 0; j < companyUsers.users.length; j++) {
                const user = companyUsers.users[j]
                if (user.id === updatedUser.id) {
                    user.active = updatedUser.active;
                }
            }
        }
        this.setState({companiesUsers: this.state.companiesUsers});
    }

    render() {
        const action = getReactRouterPathParamFromUrl(this.props, "action");
        const redirectUrl = this.getRedirectUrl(action, this.props);
        if (redirectUrl) {
            return <Redirect to={redirectUrl}/>;
        }

        return (
            <Layout01>
                <div>
                    <UserGrid
                        companiesUsers={this.state.companiesUsers}
                        onActivateUser={this.onActivateUser}
                        editCompanyUser={this.editCompanyUser.bind(this)}
                        deleteCompanyUser={this.deleteCompanyUser.bind(this)}/>
                </div>
            </Layout01>
        );
    }


}

export default connect(mapStateLoginToProps, {prepareCompanyUserToEdit})(AuthCompanyUserList);