export const COUNT_ADD = "COUNT_ADD";
export const COUNT_SUBTRACT = "COUNT_SUBTRACT";

export const countAddAction = (num) => {
    return {
        type: COUNT_ADD,
        payload: num
    }
};

export const countSubtractAction = (num) => {
    return {
        type: COUNT_SUBTRACT,
        payload: num
    }
};