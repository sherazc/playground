import React, {Component} from "react";
import DigitalClockDigit from "./DigitalClockDigit";
import {addUnit} from "../../../../services/utilities";
import ImageSeparator from "./ImageSeparator";
import bg1 from "../../../../images/clock_digital/bg1.svg";
import colon from "../../../../images/clock_digital/colon.svg";
import dot from "../../../../images/clock_digital/dot.svg";
import am from "../../../../images/clock_digital/am.svg";
import pm from "../../../../images/clock_digital/pm.svg";
import {createClockContainerStyle, createClockContentStyle, getSizeRatios} from "./DigitalClockServices";
import styles from "./DigitalClock.module.scss"


class DigitalClock extends Component {

    constructor(props) {
        super(props);
        // State
        this.state = {
            // Time
            hoursDigitLeft: 0,
            hoursDigitRight: 0,
            minutesDigitLeft: 0,
            minutesDigitRight: 0,
            secondsDigitLeft: 0,
            secondsDigitRight: 0,
            amPmImage: am,

            // styles
            digitWidth: 0,
            digitHeight: 0,
            clockContainerStyle: {},
            clockContentStyle: {}
        };
    }

    componentDidMount() {
        let mediaQuery = window.matchMedia("(max-width: 960px)");
        this.updateSizeObserver(mediaQuery);
        mediaQuery.addListener(this.updateSizeObserver.bind(this));
        this.startClock();
    }

    updateSizeObserver(mediaQuery) {
        if(mediaQuery.matches) {
            this.resizeClock(this.props.sizeMd);
        } else {
            this.resizeClock(this.props.sizeLg);
        }
    }

    resizeClock(size) {
        const sizeRatios = getSizeRatios();
        const clockContainerStyle = createClockContainerStyle(bg1, size, sizeRatios);
        const clockContentStyle = createClockContentStyle(size, sizeRatios);
        const digitWidth = size * sizeRatios.clockToDigitWidthRatio;
        const digitHeight = digitWidth * sizeRatios.clockToDigitWidthHeightRatio;

        this.setState({clockContainerStyle, clockContentStyle, digitWidth, digitHeight});
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
        const {clockContainerStyle, clockContentStyle, digitWidth, digitHeight,
            hoursDigitLeft, hoursDigitRight, minutesDigitLeft, minutesDigitRight,
            secondsDigitLeft, secondsDigitRight, amPmImage} = this.state;
        const digitWidthUnit = addUnit(digitWidth) + "";
        const digitHeightUnit = addUnit(digitHeight) + "";

        return (
            <div className={styles.container} style={clockContainerStyle}>
                <div style={clockContentStyle}>
                    <DigitalClockDigit digit={hoursDigitLeft} width={digitWidthUnit} height={digitHeightUnit}/>
                    <DigitalClockDigit digit={hoursDigitRight} width={digitWidthUnit} height={digitHeightUnit}/>
                    <ImageSeparator image={colon} width={digitWidth / 2} height={digitHeight} />
                    <DigitalClockDigit digit={minutesDigitLeft} width={digitWidthUnit} height={digitHeightUnit}/>
                    <DigitalClockDigit digit={minutesDigitRight} width={digitWidthUnit} height={digitHeightUnit}/>
                    <ImageSeparator image={dot} width={digitWidth / 2} height={digitHeight}/>
                    <DigitalClockDigit digit={secondsDigitLeft} width={digitWidthUnit} height={digitHeightUnit}/>
                    <DigitalClockDigit digit={secondsDigitRight} width={digitWidthUnit} height={digitHeightUnit}/>
                    <ImageSeparator image={amPmImage} width={digitWidth} height={digitHeight} />
                </div>
            </div>
        );
    }
}

export default DigitalClock;
