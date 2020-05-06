import React from "react";
import {connect} from "react-redux";
import Link from 'react-router/Link';
import Match from 'react-router/Match';

import Profile from "./Profile";
import Edit from "./Edit";

const Employee = (props) => {
    return(
        <div className="paddedBoxBlue">
            Employee: {props.profile.name}
            <br/>
            <Link to="/" className="btn btn-primary">Profile</Link>
            <Link to="/edit" className="btn btn-warning">Edit</Link>
            <hr/>
            <Match exactly={true} pattern="/" component={Profile} />
            <Match pattern="/edit" component={Edit} />
        </div>
    );
};

const mapStateToProps = (globalState) => {
    return ({
        profile: globalState.profile
    });
};

export default connect(mapStateToProps, null)(Employee);
// export default Employee;