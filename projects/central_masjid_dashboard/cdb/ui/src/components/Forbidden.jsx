import React from "react";
import {connect} from "react-redux";
import {loginMapStateToProps} from "../store/lib/utils";

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

export default connect(loginMapStateToProps)(Forbidden);
