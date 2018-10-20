/**
 *
 * THIS IS JUST FOR REFERENCE. DELETE IT ONCE ITS NOT NEEDED ANYMORE.
 *
 */

export const COUNT_ADD = "COUNT_ADD";
export const COUNT_SUBTRACT = "COUNT_SUBTRACT";

/*
When there is no async calls then we can directly return
action object. We don't have to call dispatch() function
with the action object.
*/

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