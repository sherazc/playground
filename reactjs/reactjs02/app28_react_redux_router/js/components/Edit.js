import React from "react"
import {connect} from "react-redux";
import Link from 'react-router/Link';
import Match from 'react-router/Match';

import {Branch, Department} from "./ProfileDetail";

import {setNameAction} from "../actions/ProfileActions";

const Edit = (props) => {
    function setName(event) {
        props.setName(event.target.value);
    }

    return(
        <div className="paddedBoxYellow">
            <div style={{fontWeight: "bold"}}>
                Edit
            </div>
            <div>
                <label style={{marginRight: "10px"}}>Name: </label>
                <input value={props.profile.name} onChange={setName} className="form-control"/>
            </div>

            <div>
                <Link to={props.pathname + "/department"} className="btn btn-danger">
                    Department
                </Link>
                <Link to={props.pathname + "/branch"} className="btn btn-success">
                    Branch
                </Link>
                <hr/>
                <Match pattern={props.pathname + "/branch"} component={Branch}/>
                <Match pattern={props.pathname + "/department"} component={Department}/>
            </div>
        </div>
    );
};

const mapStateToProps = (globalState) => {
    return {
        profile: globalState.profile
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setName: (name) => {
            dispatch(setNameAction(name))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);