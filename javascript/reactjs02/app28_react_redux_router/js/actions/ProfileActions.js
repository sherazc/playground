import Constants from "../Constants";

const setNameAction = (name) => {
    return {
        type: Constants.ACTION_SET_NAME,
        payload: name
    };
};

const setBranchAction = (branch) => {
    return {
        type: Constants.ACTION_SET_BRANCH,
        payload: branch
    };
};

const setDepartmentAction = (department) => {
    return {
        type: Constants.ACTION_SET_DEPARTMENT,
        payload: department
    };
};

const setPositionAction = (position) => {
    return {
        type: Constants.ACTION_SET_POSITION,
        payload: position
    };
};

export {setNameAction, setBranchAction, setDepartmentAction, setPositionAction};