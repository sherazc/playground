import React, {Component} from "react";
import {
    Checkbox
} from "@material-ui/core";
import ConfirmDialog, {
    createConfirmDialogState,
    createBlankConfirmDialogState
} from "../../../common/ConfirmDialog/ConfirmDialog";

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

    buildUsersGrid(users) {
        return (
            <table border="1">
                <thead>
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
                        Company Name
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
                {users.map((user, index) => {
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
                                {user.company.name}
                            </td>

                            <td>
                                {user.roles.map(roleName => roleName + ", ")}
                            </td>
                            <td>
                                <Checkbox color="primary"
                                          onChange={() => this.onChangeActivateUser(user.id, user.email, user.active)}
                                          checked={user.active}/>
                            </td>
                            <td>

                                <Checkbox color="primary" checked={user.verified}/>
                            </td>
                            <td>
                                <a href="#/" onClick={(e) => {
                                    e.preventDefault();
                                    this.props.editCompanyUser(user.id);
                                }}>
                                    View
                                </a>
                                &nbsp;|&nbsp;
                                <a href="#/" onClick={(e) => {
                                    e.preventDefault();
                                    this.props.deleteCompanyUser(user.id);
                                }}>
                                    Delete <span style={{fontSize: "8px"}}>(Not implemented)</span>
                                </a>
                            </td>
                        </tr>
                    );
                })}
                </tbody>

            </table>
        );
    };

    render() {
        const users = this.props.users;
        let content;
        if (users && users.length > 0) {
            content = this.buildUsersGrid(users);
        } else {
            content = <div>No users found</div>
        }

        return (<>
            {content}
            <ConfirmDialog dialog={this.state.activateConfirmDialog}/>
        </>);
    }
}

export default UserGrid;