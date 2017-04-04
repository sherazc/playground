import actionNames from "./actionNamesConstants";

const setNum1Action = (num) => {
    return {
        type: actionNames.ACTION_SET_NUM1,
        payload: parseInt(num)
    };
};

export default setNum1Action;