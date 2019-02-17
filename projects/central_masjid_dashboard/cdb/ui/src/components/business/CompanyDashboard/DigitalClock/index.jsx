import React, {Component} from "react";
import DigitalClockDigit from "./DigitalClockDigit";
import {addUnit} from "../../../../services/utilities";
import ImageSeparator from "./ImageSeparator";
import bg1 from "../../../../images/clock_digital/bg1.svg";
import colon from "../../../../images/clock_digital/colon.svg";
import dot from "../../../../images/clock_digital/dot.svg";
import am from "../../../../images/clock_digital/am.svg";
import pm from "../../../../images/clock_digital/pm.svg";

class DigitalClock extends Component {

    constructor(props) {
        super(props);


        // @Deprecated use getSizeRatios()
        // Position and dimension Calculation
        const widthHeightRatio = 0.2666;
        const paddingTopRatio = 0.07; // digits padding
        const clockToDigitWidthRatio = 0.1; // digit width ratio
        const clockToDigitWidthHeightRatio = 1.3333; // digit width to height ratio

        this.digitWidthLandscape = this.props.sizeLandscapeWidth * clockToDigitWidthRatio;
        this.digitHeightLandscape = this.digitWidthLandscape * clockToDigitWidthHeightRatio;

        this.digitWidthLandscapeUnit = addUnit(this.digitWidthLandscape);
        this.digitHeightLandscapeUnit = addUnit(this.digitHeightLandscape);

        // @Deprecated use createClockContentStyle();
        const contentWidth = (this.props.sizeLandscapeWidth * clockToDigitWidthRatio) * 8; // digits content width

        // State
        this.state = {
            hoursDigitLeft: 0,
            hoursDigitRight: 0,
            minutesDigitLeft: 0,
            minutesDigitRight: 0,
            secondsDigitLeft: 0,
            secondsDigitRight: 0,
            amPmImage: am,
            digitWidth: 0,
            digitHeight: 0,
            clockContainerStyle: {},
            clockContentStyle: {}
        };

        // Styles
        this.styles = {
            // @Deprecated use createDigitalContainerStyle()
            digitalContainerStyle: {
                background: `url(${bg1}) no-repeat`,
                backgroundSize: "100% 100%",
                marginLeft: "2vw",
                marginTop: "2vw",
                zIndex: "5",
                position: "absolute",
                width: addUnit(this.props.sizeLandscapeWidth),
                height: addUnit(this.props.sizeLandscapeWidth * widthHeightRatio),
                paddingTop: addUnit(this.props.sizeLandscapeWidth * paddingTopRatio),
            },
            // @Deprecated use createClockContentStyle()
            digitContent: {
                margin: "0 auto",
                width: addUnit(contentWidth)
            },
        };
    }


    componentDidMount() {
        let mediaQuery = window.matchMedia("(max-width: 960px)");
        this.updateSizeObserver(mediaQuery);
        mediaQuery.addListener(this.updateSizeObserver.bind(this));
        this.startClock();
    }

    updateSizeObserver(mediaQuery) {

        /*
        TODO:
        Pass 2 sizes for lg and md
        Pass 2 margins for lg and md
        Move the styles in state.
        Update styles in the if below.
        Do the same in

        component  flow:
        -- set

        -- get size from media query. pass it LG and
        -- get LG or MD size by media query
        -- using given size calculate height and width
        -- container

        All ratios should be in one place. create a method to get it

        State should contain:
        -- digit width
        -- digit height
        -- container style
        -- container content style

        Create method for calculation of all state elements

        Set state values in update size updateSizeObserver

         */
        if(mediaQuery.matches) {
            // small screen
            this.resizeClock(this.props.sizeMd, this.props.marginMd);
        } else {
            // large screen
            this.resizeClock(this.props.sizeLg, this.props.marginLg);
        }
    }

    resizeClock(size, margin) {
        // console.log("Resizing ", size, margin);
        const sizeRatios = this.getSizeRatios();
        const clockContainerSytle = this.createClockContainerStyle(bg1, size, margin, sizeRatios);
        const ClockContentStyle = this.createClockContentStyle(size, sizeRatios);
        const digitWidth = size * sizeRatios.clockToDigitWidthRatio;
        const digitHeight = digitWidth * sizeRatios.clockToDigitWidthHeightRatio;



    }

    // stateless
    getSizeRatios() {
        // Position and dimension Calculation
        const widthHeightRatio = 0.2666;
        const paddingTopRatio = 0.07; // digits padding
        const clockToDigitWidthRatio = 0.1; // digit width ratio
        const clockToDigitWidthHeightRatio = 1.3333; // digit width to height ratio

        return {widthHeightRatio, paddingTopRatio, clockToDigitWidthRatio, clockToDigitWidthHeightRatio};
    }

    // stateless
    createClockContainerStyle(backgroundImage, size, margin, sizeRatios) {
        return {
            background: `url(${backgroundImage}) no-repeat`,
            backgroundSize: "100% 100%",
            margin: addUnit(margin),
            zIndex: "5",
            position: "absolute",
            width: addUnit(size),
            height: addUnit(size * sizeRatios.widthHeightRatio),
            paddingTop: addUnit(size * sizeRatios.paddingTopRatio),
        };
    }

    // stateless creates digitContent
    createClockContentStyle(size, sizeRatios) {
        const contentWidth = (size * sizeRatios.clockToDigitWidthRatio) * 8; // digits content width
        return {
            margin: "0 auto",
            width: addUnit(contentWidth)
        };
    }









    startClock() {
        setInterval(() => {
            const now = new Date();
            const currentHour24 = now.getHours();

            let currentHour12;
            if (currentHour24 === 0) {
                currentHour12 = 12;
            } else if (currentHour24 > 12) {
                currentHour12 = currentHour24 - 12;
            } else {
                currentHour12 = currentHour24;
            }

            let amPmImage = currentHour24 > 11 ? pm : am;

            this.setState({
                hoursDigitLeft: Math.floor(currentHour12 / 10),
                hoursDigitRight: Math.floor(currentHour12 % 10),
                minutesDigitLeft: Math.floor(now.getMinutes() / 10),
                minutesDigitRight: Math.floor(now.getMinutes() % 10),
                secondsDigitLeft: Math.floor(now.getSeconds() / 10),
                secondsDigitRight: Math.floor(now.getSeconds() % 10),
                amPmImage
            });
        }, 1000);
    }

    render() {
        return (
            <div style={this.styles.digitalContainerStyle}>
                <div style={this.styles.digitContent}>
                    <DigitalClockDigit digit={this.state.hoursDigitLeft} width={this.digitWidthLandscapeUnit} height={this.digitHeightLandscapeUnit}/>
                    <DigitalClockDigit digit={this.state.hoursDigitRight} width={this.digitWidthLandscapeUnit} height={this.digitHeightLandscapeUnit}/>
                    <ImageSeparator width={this.digitWidthLandscape / 2} height={this.digitHeightLandscape} image={colon}/>
                    <DigitalClockDigit digit={this.state.minutesDigitLeft} width={this.digitWidthLandscapeUnit} height={this.digitHeightLandscapeUnit}/>
                    <DigitalClockDigit digit={this.state.minutesDigitRight} width={this.digitWidthLandscapeUnit} height={this.digitHeightLandscapeUnit}/>
                    <ImageSeparator width={this.digitWidthLandscape / 2} height={this.digitHeightLandscape} image={dot}/>
                    <DigitalClockDigit digit={this.state.secondsDigitLeft} width={this.digitWidthLandscapeUnit} height={this.digitHeightLandscapeUnit}/>
                    <DigitalClockDigit digit={this.state.secondsDigitRight} width={this.digitWidthLandscapeUnit} height={this.digitHeightLandscapeUnit}/>
                    <ImageSeparator width={this.digitWidthLandscape} height={this.digitHeightLandscape} image={this.state.amPmImage}/>
                </div>
            </div>
        );
    }
}

export default DigitalClock;
