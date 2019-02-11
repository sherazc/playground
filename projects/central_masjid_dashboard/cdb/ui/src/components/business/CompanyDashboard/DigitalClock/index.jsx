import React, {Component} from "react";
import DigitalClockDigit from "./DigitalClockDigit";
import {addUnit} from "../../../../services/utilities";

class DigitalClock extends Component {

    constructor(props) {
        super(props);

        // Position and dimension Calculation
        const widthHeightRatio = 0.2666;
        const paddingTopRatio = 0.07; // digits padding
        const clockToDigitWidthRatio = 0.1; // digit width ratio
        const clockToDigitWidthHeightRatio = 1.3333; // digit width to height ratio

        this.digitWidthLandscape = this.props.sizeLandscapeWidth * clockToDigitWidthRatio;
        this.digitHeightLandscape = this.digitWidthLandscape * clockToDigitWidthHeightRatio;

        this.digitWidthLandscapeUnit = addUnit(this.digitWidthLandscape);
        this.digitHeightLandscapeUnit = addUnit(this.digitHeightLandscape);

        const contentWidth = (this.props.sizeLandscapeWidth * clockToDigitWidthRatio) * 8; // digits content width

        // State
        this.state = {
            hoursDigitLeft: 0,
            hoursDigitRight: 0,
            minutesDigitLeft: 0,
            minutesDigitRight: 0,
            secondsDigitLeft: 0,
            secondsDigitRight: 0,
        };

        // Styles
        const digitStyle = {
            width: addUnit(this.digitWidthLandscape),
            height: addUnit(this.digitHeightLandscape),
            float: "left",

            position: "relative",
            backgroundSize: "cover",
            // overflow: "hidden",
            top: "0px"
        };

        const digitHalfWidth = {
            ...digitStyle,
            //width: addUnit(this.digitWidthLandscape / 2),
            backgroundColor: "pink"
        };



        this.styles = {
            digitalContainerStyle: {
                background: `url(${process.env.PUBLIC_URL}/images/clock_digital/bg1.svg) no-repeat`,
                backgroundSize: "100% 100%",
                backgroundColor: "red",
                marginLeft: "auto",
                marginRight: "auto",
                zIndex: "5",
                position: "absolute",
                width: addUnit(this.props.sizeLandscapeWidth),
                height: addUnit(this.props.sizeLandscapeWidth * widthHeightRatio),
                paddingTop: addUnit(this.props.sizeLandscapeWidth * paddingTopRatio),
            },
            digitContent: {
                margin: "0 auto",
                width: addUnit(contentWidth)
            },
            colonStyle: {
                ...digitHalfWidth,
                background: `url(${process.env.PUBLIC_URL}/images/clock_digital/0.svg) no-repeat`,
                backgroundColor: "pink",
                backgroundSize: "auto"
            },
            dotStyle: {
                ...digitHalfWidth,
                background: `url(${process.env.PUBLIC_URL}/images/clock_digital/dot.svg)`,
            }
        };

        console.log("colonStyle", this.styles.colonStyle);
    }

    componentDidMount() {
        setInterval(() => {
            const now = new Date();

            this.setState({
                hoursDigitLeft: Math.floor(now.getHours() / 10),
                hoursDigitRight: Math.floor(now.getHours() % 10),
                minutesDigitLeft: Math.floor(now.getMinutes() / 10),
                minutesDigitRight: Math.floor(now.getMinutes() % 10),
                secondsDigitLeft: Math.floor(now.getSeconds() / 10),
                secondsDigitRight: Math.floor(now.getSeconds() % 10),
            });
        }, 1000);
    }

    render() {
        return (
            <div style={this.styles.digitalContainerStyle}>
                <div style={this.styles.digitContent}>
                    <DigitalClockDigit digit={this.state.hoursDigitLeft} width={this.digitWidthLandscapeUnit} height={this.digitHeightLandscapeUnit}/>
                    <DigitalClockDigit digit={this.state.hoursDigitRight} width={this.digitWidthLandscapeUnit} height={this.digitHeightLandscapeUnit}/>
                    <div style={{
                        backgroundColor: "yellow",
                        float: "left",
                        height: "5.3332vw",
                        width: "4vw"

                    }}>
                        <div style={{
                            backgroundImage: "url(/images/clock_digital/5.svg)",
                            backgroundSize: "100% 100%",
                            height: "5.3332vw",
                            position: "relative",
                            top: "0px",
                            width: "4vw"
                        }} >
                        </div>

                    </div>
                    <DigitalClockDigit digit={this.state.minutesDigitLeft} width={this.digitWidthLandscapeUnit} height={this.digitHeightLandscapeUnit}/>
                    <DigitalClockDigit digit={this.state.minutesDigitRight} width={this.digitWidthLandscapeUnit} height={this.digitHeightLandscapeUnit}/>
                    <div style={this.styles.dotStyle}/>
                    <DigitalClockDigit digit={this.state.secondsDigitLeft} width={this.digitWidthLandscapeUnit} height={this.digitHeightLandscapeUnit}/>
                    <DigitalClockDigit digit={this.state.secondsDigitRight} width={this.digitWidthLandscapeUnit} height={this.digitHeightLandscapeUnit}/>
                </div>
            </div>
        );
    }
}

export default DigitalClock;
