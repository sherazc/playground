const INITIAL_STATE = {name: "NA"};
const TYPE_UPDATE_NAME = "TYPE_UPDATE_NAME";

export {TYPE_UPDATE_NAME};

export default function nameReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case TYPE_UPDATE_NAME:
            return {...state, name: action.payload};
        default:
            return state;
    }
}
