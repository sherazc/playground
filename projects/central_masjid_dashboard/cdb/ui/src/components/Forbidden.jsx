import React from "react";
import {connect} from "react-redux";
import {mapStateLoginToProps} from "../store/lib/utils";

const Forbidden = (props) => {
    return (
        <div>
            <h3>Forbidden - 403</h3>
            <div>
                User: {props.login.user.firstName} {props.login.user.lastName} is not allowed to access this resources.
            </div>
        </div>
    );
};

export default connect(mapStateLoginToProps)(Forbidden);
