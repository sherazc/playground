import React from "react";
import {connect} from "react-redux";

const Forbidden = (props) => {
    return (
        <div>
            <h3>Forbidden - 403</h3>
            <div>
                User: {props.user.firstName} {props.user.lastName} is not allowed to access this resources.
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

export default connect(mapStateToProps)(Forbidden);
