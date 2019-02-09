import React, {Component} from "react";
import {withStyles} from '@material-ui/core/styles';
import DigitalClockDigit from "./DigitalClockDigit";

const addUnit = (num) => {
    return num + "vw";
};

const styles = theme => {

    const dClockContainer = {
        width: "174px",
        height: "66px",
        background: `url(${process.env.PUBLIC_URL}/images/clock_digital/bg1.svg) no-repeat`,
        backgroundSize: "100% 100%",
        backgroundColor: "red",
        marginTop: "30px",
        left: "30px",
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
    state = {
        hoursDigitLeft: 0,
        hoursDigitRight: 0,
        minutesDigitLeft: 0,
        minutesDigitRight: 0,
        secondsDigitLeft: 0,
        secondsDigitRight: 0,
    };

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
            <div className={classes.dClockContainer}>
                <DigitalClockDigit digit={this.state.hoursDigitLeft}/>
                <DigitalClockDigit digit={this.state.hoursDigitRight}/>
                <DigitalClockDigit digit={this.state.minutesDigitLeft}/>
                <DigitalClockDigit digit={this.state.minutesDigitRight}/>
                <DigitalClockDigit digit={this.state.secondsDigitLeft}/>
                <DigitalClockDigit digit={this.state.secondsDigitRight}/>
            </div>
        );
    }
}

export default withStyles(styles)(DigitalClock);
