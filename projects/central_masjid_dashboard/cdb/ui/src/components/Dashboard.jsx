import React from "react";
import {connect} from "react-redux";

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

const mapStateToProps = state => {
    return {
        successful: state.login.successful,
        token: state.login.token,
        company: state.login.company,
        user: state.login.user
    }
};

export default connect(mapStateToProps)(Dashboard);
