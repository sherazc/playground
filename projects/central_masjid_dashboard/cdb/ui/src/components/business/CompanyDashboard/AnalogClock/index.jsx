import React, {Component} from "react";
import {withStyles} from '@material-ui/core/styles';

const styles = theme => {

    const clockDial = {
        position: "absolute",
        width: "160px",
        height: "160px",
        background: `url(${process.env.PUBLIC_URL}/images/clock_analog/dial.svg) no-repeat`,
        backgroundSize: "160px",
        listStyle: "none",
        left: "30px",
        right: "auto",
        marginTop: "30px",
        marginLeft: "auto",
        marginRight: "auto",
        zIndex: "5",
    };
    const clockHands = {
        position: "absolute",
        width: "8px",
        height: "160px",
        top: "0px",
        left: "76px",
        backgroundSize: "8px 160px",
    };

    const secondHand = {
        ...clockHands,
        background: `url(${process.env.PUBLIC_URL}/images/clock_analog/seconds_hand.svg) no-repeat`,
        zIndex: "30"
    };
    const minuteHand = {
        ...clockHands,
        background: `url(${process.env.PUBLIC_URL}/images/clock_analog/minutes_hand.svg) no-repeat`,
        zIndex: "20"
    };
    const hourHand = {
        ...clockHands,
        background: `url(${process.env.PUBLIC_URL}/images/clock_analog/hours_hand.svg) no-repeat`,
        zIndex: "10"
    };

    return {
        clockDial, secondHand, minuteHand, hourHand
    };
};

class AnalogClock extends Component {
    render() {
        const {classes} = this.props;
        return (
            <ul className={classes.clockDial}>
                <li className={classes.secondHand}></li>
                <li className={classes.minuteHand}></li>
                <li className={classes.hourHand}></li>
            </ul>
        );
    }
}

export default withStyles(styles)(AnalogClock);