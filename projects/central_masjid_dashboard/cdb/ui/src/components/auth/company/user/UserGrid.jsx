import React, {Component} from "react";
import {
    Checkbox
} from "@material-ui/core";
import ConfirmDialog, {
    createConfirmDialogState,
    createBlankConfirmDialogState
} from "../../../common/ConfirmDialog/ConfirmDialog";
import {mapStateLoginToProps} from "../../../../store/lib/utils";
import {connect} from "react-redux";

class UserGrid extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activateConfirmDialog: createBlankConfirmDialogState()
        };
        this.onChangeActivateUser = this.onChangeActivateUser.bind(this);
        this.closeActivateConfirmDialog = this.closeActivateConfirmDialog.bind(this);
        this.onChangeActivateUser = this.onChangeActivateUser.bind(this);
        this.onActivateUser = this.onActivateUser.bind(this);
    }

    onChangeActivateUser(userId, email, active) {
        const activateConfirmDialog = createConfirmDialogState(
            true,
            active ? "Confirm Deactivate" : "Confirm Activate",
            `Are you sure, you want to ${active ? "disable" : "enable"} ${email}.`,
            this.closeActivateConfirmDialog,
            () => this.onActivateUser(userId, !active)
        );
        this.setState({activateConfirmDialog});
    }

    onActivateUser(userId, active) {
        this.props.onActivateUser(userId, active);
        this.closeActivateConfirmDialog();
    }

    closeActivateConfirmDialog() {
        this.setState({activateConfirmDialog: createBlankConfirmDialogState()});
    }

    buildUsersGrid(companyUsers) {
        return (
            <table border="1" style={{marginBottom: "30px"}}>
                <thead>
                <tr><th colSpan={100}>{companyUsers.name}</th></tr>
                <tr>
                    <th>
                        Index
                    </th>
                    <th>
                        Name
                    </th>
                    <th>
                        Email
                    </th>
                    <th>
                        Roles
                    </th>
                    <th>
                        Active
                    </th>
                    <th>
                        Verified
                    </th>
                    <th>
                        Action
                    </th>
                </tr>
                </thead>
                <tbody>
                {companyUsers.users.map((user, index) => {
                    const selfRow = this.props.login.user.id !== user.id;
                    return (
                        <tr key={index}>
                            <td>
                                {index + 1}
                            </td>
                            <td>
                                {user.firstName} {user.lastName}
                            </td>
                            <td>
                                {user.email}
                            </td>

                            <td>
                                {user.roles.map(roleName => roleName + ", ")}
                            </td>
                            <td>
                                <Checkbox color="primary" disabled={!selfRow}
                                          onChange={() => this.onChangeActivateUser(user.id, user.email, user.active)}
                                          checked={user.active}/>
                            </td>
                            <td>

                                <Checkbox color="primary" checked={user.verified} disabled={!selfRow}/>
                                <span style={{fontSize: "8px"}}>(Not implemented)</span>
                            </td>
                            <td>
                                <a href="#/" onClick={(e) => {
                                    e.preventDefault();
                                    this.props.editCompanyUser(user.id);
                                }}>
                                    View
                                </a>
                                {selfRow && (<>
                                    &nbsp;|&nbsp;
                                    <a href="#/" onClick={(e) => {
                                        e.preventDefault();
                                        this.props.deleteCompanyUser(user.id);
                                    }}>
                                        Delete <span style={{fontSize: "8px"}}>(Not implemented)</span>
                                    </a>
                                </>)}
                            </td>
                        </tr>
                    );
                })}
                </tbody>

            </table>
        );
    }

    render() {
        const companiesUsers = this.props.companiesUsers;
        let content;
        if (companiesUsers && companiesUsers.length > 0) {
            content = companiesUsers.map(companyUsers => this.buildUsersGrid(companyUsers));
        } else {
            content = <div>No users found</div>
        }

        return (<>
            {content}
            <ConfirmDialog dialog={this.state.activateConfirmDialog}/>
        </>);
    }
}

export default connect(mapStateLoginToProps)(UserGrid);