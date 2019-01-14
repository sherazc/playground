import React from "react";
import {connect} from "react-redux";
import {mapStateLoginToProps} from "../store/lib/utils";

const Dashboard = (props) => {
    return (
        <div>
            <h3>Dashboard</h3>
            <div>
                Login token: {props.login.token}
            </div>
            <div>
                Company: {props.login.company.name}
            </div>
            <div>
                User: {props.login.user.firstName} {props.login.user.lastName}
            </div>
        </div>
    );
};

export default connect(mapStateLoginToProps)(Dashboard);
