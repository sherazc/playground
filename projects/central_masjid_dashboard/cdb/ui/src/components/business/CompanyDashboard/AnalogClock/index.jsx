import React, {Component} from "react";
import {withStyles} from '@material-ui/core/styles';
import {Link} from "react-router-dom";

const addUnit = (num) => {
    return num + "vw";
};

const styles = theme => {

    const width = 50;
    const height = width;

    const clockHandsHeight = height;
    const clockHandsWidth = width / 10;
    const clockHandsCenter = width / 2 - clockHandsWidth / 2;


    const widthUnit = addUnit(width);
    const heightUnit = addUnit(height);
    const clockHandsHeightUnit = addUnit(clockHandsHeight);
    const clockHandsWidthUnit = addUnit(clockHandsWidth);
    const clockHandsCenterUnit = addUnit(clockHandsCenter)


    const clockDial = {
        position: "absolute",
        width: widthUnit,
        height: heightUnit,
        background: `url(${process.env.PUBLIC_URL}/images/clock_analog/dial.svg) no-repeat`,
        backgroundSize: widthUnit,
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
        width: clockHandsWidthUnit,
        height: clockHandsHeightUnit,
        top: "0",
        left: clockHandsCenterUnit,
        backgroundSize: `${clockHandsWidthUnit} ${clockHandsHeightUnit}`,
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
    hoursInterval;
    minutesInterval;
    secondsInterval;

    state = {
        secondsStyle: {},
        minutesStyle: {},
        hoursStyle: {}
    };

    componentDidMount() {
        this.secondsInterval = setInterval(() => {
            const seconds = new Date().getSeconds();
            const degree = seconds * 6;
            const rotate = "rotate(" + degree + "deg)";
            this.setState({
                secondsStyle: {"MozTransform": rotate, "WebkitTransform": rotate, "transform": rotate}
            });
        }, 1000);

        this.minutesInterval = setInterval(() => {
            const minutes = new Date().getMinutes();
            const degree = minutes * 6;
            const rotate = "rotate(" + degree + "deg)";
            this.setState({
                minutesStyle: {"MozTransform": rotate, "WebkitTransform": rotate, "transform": rotate}
            });
        }, 1000);

        this.secondsInterval = setInterval(() => {
            const hours = new Date().getHours();
            const minutes = new Date().getMinutes();
            const degree = hours * 30 + (minutes / 2);
            const rotate = "rotate(" + degree + "deg)";
            this.setState({
                hoursStyle: {"MozTransform": rotate, "WebkitTransform": rotate, "transform": rotate}
            });
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
