import React, {Component} from "react";
import {
    Checkbox
} from "@material-ui/core";

class UserGrid extends Component {
    buildUsersGrid(users) {
        return (
            <table border="1">
                <thead>
                <tr>
                    <th>
                        Index
                    </th>
                    <th>
                        User ID
                    </th>
                    <th>
                        Company ID
                    </th>
                    <th>
                        Company Name
                    </th>
                    <th>
                        Email
                    </th>
                    <th>
                        First Name
                    </th>
                    <th>
                        Last Name
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
                                {user.id}
                            </td>
                            <td>
                                {user.companyId}
                            </td>
                            <td>
                                {user.company.name}
                            </td>
                            <td>
                                {user.email}
                            </td>
                            <td>
                                {user.firstName}
                            </td>
                            <td>
                                {user.lastName}
                            </td>
                            <td>
                                {user.roles.map(roleName => roleName + ", ")}
                            </td>
                            <td>

                                <Checkbox color="primary"
                                          name="generateIqamah"
                                          checked={user.active}
                                  //        onChange={this.onChangeChecked}
                                />
                            </td>
                            <td>
                                {user.verified}
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
        let content = undefined;
        if (users && users.length > 0) {
            content = this.buildUsersGrid(users);
        } else {
            content = <div>No users found</div>
        }

        return content;
    }
}

export default UserGrid;