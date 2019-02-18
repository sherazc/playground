import React, {Component} from "react";
import {withStyles} from '@material-ui/core/styles';
import {Link} from "react-router-dom";
import {addUnit} from "../../../../services/utilities";
import {
    createDialStyle, createHoursHandStyle,
    createHoursRotateStyle, createMinutesHandStyle,
    createMinutesRotateStyle, createSecondsHandSytle,
    createSecondsRotateStyle
} from "./AnalogClockServices";
import dial from "../../../../images/clock_analog/dial.svg";
import hours_hand from "../../../../images/clock_analog/hours_hand.svg";
import minutes_hand from "../../../../images/clock_analog/minutes_hand.svg";
import seconds_hand from "../../../../images/clock_analog/seconds_hand.svg";


/*
TODO:

-- Move all global styles inside class
-- Remove dependency on material UI
-- Pass LG and MD sizes and margin props
-- Move images inside react app instead of public
 */


const styles = theme => {
    const size = 50;
    const margin = 5;

    const clockDial = createDialStyle(size, margin);

    const secondHand = createSecondsHandSytle(size);
    const minuteHand = createMinutesHandStyle(size);
    const hourHand = createHoursHandStyle(size);

    return {
        clockDial, secondHand, minuteHand, hourHand
    };
};

class AnalogClock extends Component {
    hoursInterval;
    minutesInterval;
    secondsInterval;

    state = {
        secondsStyle: {},
        minutesStyle: {},
        hoursStyle: {}
    };

    componentDidMount() {
        // Seconds
        this.secondsInterval = setInterval(() => {
            this.setState({secondsStyle: createSecondsRotateStyle()});
        }, 1000);

        // Minutes
        this.minutesInterval = setInterval(() => {
            this.setState({minutesStyle: createMinutesRotateStyle()});
        }, 1000);

        // Hours
        this.hoursInterval = setInterval(() => {
            this.setState({hoursStyle: createHoursRotateStyle()});
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.secondsInterval);
        clearInterval(this.minutesInterval);
        clearInterval(this.hoursInterval);

    }

    render() {
        const {classes} = this.props;
        return (
            <ul className={classes.clockDial}>
                <Link to="/">home</Link>
                <Link to="/c1">c1</Link>
                <Link to="/c2">c2</Link>
                <li className={classes.secondHand} style={this.state.secondsStyle}></li>
                <li className={classes.minuteHand} style={this.state.minutesStyle}></li>
                <li className={classes.hourHand} style={this.state.hoursStyle}></li>
            </ul>
        );
    }
}

export default withStyles(styles)(AnalogClock);
