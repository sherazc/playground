import Constants from "../Constants";

const initialProfileState = {
    name: "Sheraz",
    branch: "Atlanta",
    department: "IT",
    position: "Developer"
};

const ProfileReducer = (state = initialProfileState, action)  => {
    switch (action.type) {
        case Constants.ACTION_SET_NAME:
            state = {
                ...state,
                name: action.payload
            };
            break;
        case Constants.ACTION_SET_BRANCH:
            state = {
                ...state,
                branch: action.payload
            };
            break;
        case Constants.ACTION_SET_DEPARTMENT:
            state = {
                ...state,
                department: action.payload
            };
            break;
        case Constants.ACTION_SET_POSITION:
            state = {
                ...state,
                position: action.payload
            };
            break;
    }
    return state;
};

export default ProfileReducer;