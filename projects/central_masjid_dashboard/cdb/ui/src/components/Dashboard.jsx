import React from "react";
import {connect} from "react-redux";
import {loginMapStateToProps} from "../store/lib/utils";

const Dashboard = (props) => {
    return (
        <div>
            <h3>Dashboard</h3>
            <div>
                Login token: {props.token}
            </div>
            <div>
                Company: {props.company.name}
            </div>
            <div>
                User: {props.user.firstName} {props.user.lastName}
            </div>
        </div>
    );
};


export default connect(loginMapStateToProps)(Dashboard);
