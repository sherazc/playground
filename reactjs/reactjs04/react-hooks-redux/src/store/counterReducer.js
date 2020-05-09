const INITIAL_STATE = {count: 0};
const TYPE_INCREMENT = "TYPE_INCREMENT";
const TYPE_DECREMENT = "TYPE_DECREMENT";

export {TYPE_INCREMENT, TYPE_DECREMENT};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case TYPE_INCREMENT:
            return {...state, count: state.count + 1};
        case TYPE_DECREMENT:
            return {...state, count: state.count - 1};
        default:
            return state;
    }
}
