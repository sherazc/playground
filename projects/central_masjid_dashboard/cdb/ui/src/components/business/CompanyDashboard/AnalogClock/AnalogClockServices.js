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
