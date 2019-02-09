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
        const paddingTopRatio = 0.0555; // digits padding
        const clockToDigitWidthRatio = 0.115; // digit size

        this.state = {
            hoursDigitLeft: 0,
            hoursDigitRight: 0,
            minutesDigitLeft: 0,
            minutesDigitRight: 0,
            secondsDigitLeft: 0,
            secondsDigitRight: 0,
        };

        const contentWidth = (this.props.sizeLandscapeWidth * clockToDigitWidthRatio) * 8;


        this.styles = {
            digitalContainerStyle: {
                width: addUnit(this.props.sizeLandscapeWidth),
                height: addUnit(this.props.sizeLandscapeWidth * widthHeightRatio),
                paddingTop: addUnit(this.props.sizeLandscapeWidth * paddingTopRatio),
            },
            digitalContent: {
                margin: "0 auto",
                width: addUnit(contentWidth),
                backgroundColor: "yellow",
                height: "30px"
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
                    <DigitalClockDigit {...this.props} digit={this.state.hoursDigitLeft}/>
                    <DigitalClockDigit {...this.props} digit={this.state.hoursDigitRight}/>
                    <DigitalClockDigit {...this.props} digit={this.state.minutesDigitLeft}/>
                    <DigitalClockDigit {...this.props} digit={this.state.minutesDigitRight}/>
                    <DigitalClockDigit {...this.props} digit={this.state.secondsDigitLeft}/>
                    <DigitalClockDigit {...this.props} digit={this.state.secondsDigitRight}/>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(DigitalClock);
