import {addUnit} from "../../../../services/utilities";

export const getSizeRatios = () => {
    // Position and dimension Calculation
    const widthHeightRatio = 0.2666;
    const paddingTopRatio = 0.07; // digits padding
    const clockToDigitWidthRatio = 0.1; // digit width ratio
    const clockToDigitWidthHeightRatio = 1.3333; // digit width to height ratio

    return {widthHeightRatio, paddingTopRatio, clockToDigitWidthRatio, clockToDigitWidthHeightRatio};
};

export const createClockContentStyle = (size, sizeRatios) =>{
    const contentWidth = (size * sizeRatios.clockToDigitWidthRatio) * 8; // digits content width
    return {
        margin: "0 auto",
        width: addUnit(contentWidth)
    };
};

export const createClockContainerStyle = (backgroundImage, size, sizeRatios) => {
    return {
        background: `url(${backgroundImage}) no-repeat`,
        backgroundSize: "100% 100%",
        width: addUnit(size),
        height: addUnit(size * sizeRatios.widthHeightRatio),
        paddingTop: addUnit(size * sizeRatios.paddingTopRatio),
    };
};
