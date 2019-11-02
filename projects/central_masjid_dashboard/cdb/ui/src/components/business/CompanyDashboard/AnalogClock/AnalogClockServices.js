import dial from "../../../../images/clock_analog/dial.svg";
import {addUnit} from "../../../../services/utilities";
import seconds_hand from "../../../../images/clock_analog/seconds_hand.svg";
import minutes_hand from "../../../../images/clock_analog/minutes_hand.svg";
import hours_hand from "../../../../images/clock_analog/hours_hand.svg";

const createRotateStyle = (degree) => {
    const rotate = "rotate(" + degree + "deg)";
    return {"MozTransform": rotate, "WebkitTransform": rotate, "transform": rotate};
};

export const createSecondsRotateStyle = () =>  {
    const seconds = new Date().getSeconds();
    const degree = seconds * 6;
    return createRotateStyle(degree);
};

export const createMinutesRotateStyle = () => {
    const minutes = new Date().getMinutes();
    const degree = minutes * 6;
    return createRotateStyle(degree);
};

export const createHoursRotateStyle = () => {
    const hours = new Date().getHours();
    const minutes = new Date().getMinutes();
    const degree = hours * 30 + (minutes / 2);
    return createRotateStyle(degree);
};


export const createDialStyle = (size) => {
    const sizeUnit = addUnit(size);
    return {
        position: "absolute",
        width: sizeUnit,
        height: sizeUnit,
        background: `url(${dial}) no-repeat`,
        backgroundSize: sizeUnit,
        listStyle: "none",
        right: "auto",
        zIndex: "5",
    };
};

const createClockHandStyle = (size) => {
    const clockHandsHeight = size;
    const clockHandsWidth = size / 10;
    const clockHandsCenter = size / 2 - clockHandsWidth / 2;

    const clockHandsWidthUnit = addUnit(clockHandsWidth);
    const clockHandsHeightUnit = addUnit(clockHandsHeight);
    const clockHandsCenterUnit = addUnit(clockHandsCenter);

    return {
        position: "absolute",
        width: clockHandsWidthUnit,
        height: clockHandsHeightUnit,
        top: "0",
        left: clockHandsCenterUnit,
        backgroundSize: `${clockHandsWidthUnit} ${clockHandsHeightUnit}`,
    }
};

export const createSecondsHandSytle = (size) => {
    return {
        background: `url(${seconds_hand}) no-repeat`,
        zIndex: "30",
        ...createClockHandStyle(size)
    }
};

export const createMinutesHandStyle = (size) => {
    return {
        background: `url(${minutes_hand}) no-repeat`,
        zIndex: "20",
        ...createClockHandStyle(size)
    }
};

export const createHoursHandStyle = (size) => {
    return {
        background: `url(${hours_hand}) no-repeat`,
        zIndex: "10",
        ...createClockHandStyle(size)
    }
};
