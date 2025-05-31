import actionNames from "./actionNamesConstants";

const setNum2Action = (num) => {
    return {
        type: actionNames.ACTION_SET_NUM2,
        payload: parseInt(num)
    };
};

export default setNum2Action;