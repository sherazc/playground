import React from "react"
import {connect} from "react-redux";
import {setDepartmentAction, setBranchAction, setPositionAction} from "../actions/ProfileActions";
import Constants from "../Constants";

/*
IMPORTANT NOTE:
We are using printOption() in both branch and department select boxes.
We don't have to set "selected={true}" in option. ReactJS automatically
adjusts it.
*/
const printOption = (item, index) => {
    return (<option key={index}>{item}</option>);
};

const BranchComponent = (props) => {
    const setBranch = (event) => {
        props.setBranch(event.target.value);
    };

    return (
        <div className="paddedBoxGreen">
            <div style={{fontWeight: "bold"}}>
                Branch
            </div>
            <div>
                <label style={{marginRight: "10px"}}>Branch: </label>
                <select value={props.profile.branch} onChange={setBranch} className="form-control">
                    {Constants.BRANCHES.map(printOption)}
                </select>
            </div>
        </div>
    );
};

const DepartmentComponent = (props) => {
    const setPosition = (event) => {
        props.setPosition(event.target.value);
    };

    const setDepartment = (event) => {
        props.setDepartment(event.target.value);
    };

    return (
        <div className="paddedBoxRed">
            <div style={{fontWeight: "bold"}}>
                Department
            </div>
            <div>
                <label style={{marginRight: "10px"}}>Position:</label>
                <input value={props.profile.position} onChange={setPosition} className="form-control"/>
            </div>
            <p style={{margin: "10px"}}>Department can be changed in text field OR select box. Note how then stay in sync</p>
            <div>
                <label style={{marginRight: "10px"}}>Department Select:</label>
                <select data={Constants.DEPARTMENTS} value={props.profile.department}
                        onChange={setDepartment} className="form-control">
                    {Constants.DEPARTMENTS.map(printOption)}
                </select>

            </div>
            <div>
                <label style={{marginRight: "10px"}}>Department Text:</label>
                <input value={props.profile.department} onChange={setDepartment} className="form-control"/>
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
        setDepartment: (department) => {
            dispatch(setDepartmentAction(department))
        },
        setBranch: (branch) => {
            dispatch(setBranchAction(branch))
        },
        setPosition: (position) => {
            dispatch(setPositionAction(position))
        }
    }
};

const Branch = connect(mapStateToProps, mapDispatchToProps)(BranchComponent);
const Department = connect(mapStateToProps, mapDispatchToProps)(DepartmentComponent);

export {Branch, Department};
