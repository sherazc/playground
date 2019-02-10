import React, {Component} from "react";
import {withStyles} from '@material-ui/core/styles';
import DigitalClockDigit from "./DigitalClockDigit";
import {addUnit} from "../../../../services/utilities";

const styles = theme => {

    const dClockContainer = {
        background: `url(${process.env.PUBLIC_URL}/images/clock_digital/bg1.svg) no-repeat`,
        backgroundSize: "100% 100%",
        backgroundColor: "red",
        marginLeft: "auto",
        marginRight: "auto",
        zIndex: "5",
        position: "absolute",
    };

    return {
        dClockContainer,
    };
};

class DigitalClock extends Component {

    constructor(props) {
        super(props);
        const widthHeightRatio = 0.2666;
        const paddingTopRatio = 0.07; // digits padding
        const clockToDigitWidthRatio = 0.1; // digit width ratio
        const clockToDigitWidthHeightRatio = 1.3333; // digit width to height ratio

        this.digitWidthLandscape = this.props.sizeLandscapeWidth * clockToDigitWidthRatio;
        this.digitHeightLandscape = this.digitWidthLandscape * clockToDigitWidthHeightRatio;

        this.digitWidthLandscapeUnit = addUnit(this.digitWidthLandscape);
        this.digitHeightLandscapeUnit = addUnit(this.digitHeightLandscape);

        this.state = {
            hoursDigitLeft: 0,
            hoursDigitRight: 0,
            minutesDigitLeft: 0,
            minutesDigitRight: 0,
            secondsDigitLeft: 0,
            secondsDigitRight: 0,
        };

        const contentWidth = (this.props.sizeLandscapeWidth * clockToDigitWidthRatio) * 6;

        this.styles = {
            digitalContainerStyle: {
                width: addUnit(this.props.sizeLandscapeWidth),
                height: addUnit(this.props.sizeLandscapeWidth * widthHeightRatio),
                paddingTop: addUnit(this.props.sizeLandscapeWidth * paddingTopRatio),
            },
            digitalContent: {
                margin: "0 auto",
                width: addUnit(contentWidth)
            },
            colonStyle: {
                background: `url(${process.env.PUBLIC_URL}/images/clock_digital/bg1.svg) no-repeat`,
                width: addUnit(this.clockToDigitWidthRatio / 2),
                height: addUnit(this.digitHeightLandscape)

            }
        };
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
        const {classes} = this.props;

        return (
            <div className={classes.dClockContainer} style={this.styles.digitalContainerStyle}>
                <div style={this.styles.digitalContent}>
                    <DigitalClockDigit digit={this.state.hoursDigitLeft} width={this.digitWidthLandscapeUnit} height={this.digitHeightLandscapeUnit}/>
                    <DigitalClockDigit digit={this.state.hoursDigitRight} width={this.digitWidthLandscapeUnit} height={this.digitHeightLandscapeUnit}/>

                    <DigitalClockDigit digit={this.state.minutesDigitLeft} width={this.digitWidthLandscapeUnit} height={this.digitHeightLandscapeUnit}/>
                    <DigitalClockDigit digit={this.state.minutesDigitRight} width={this.digitWidthLandscapeUnit} height={this.digitHeightLandscapeUnit}/>
                    <DigitalClockDigit digit={this.state.secondsDigitLeft} width={this.digitWidthLandscapeUnit} height={this.digitHeightLandscapeUnit}/>
                    <DigitalClockDigit digit={this.state.secondsDigitRight} width={this.digitWidthLandscapeUnit} height={this.digitHeightLandscapeUnit}/>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(DigitalClock);
