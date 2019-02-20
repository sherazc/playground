import React, {Component} from "react";
import {Link} from "react-router-dom";

import {
    createDialStyle, createHoursHandStyle,
    createHoursRotateStyle, createMinutesHandStyle,
    createMinutesRotateStyle, createSecondsHandSytle,
    createSecondsRotateStyle
} from "./AnalogClockServices";

class AnalogClock extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dialStyle: {},
            secondsStyle: {},
            minutesStyle: {},
            hoursStyle: {}
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
            this.resizeClock(this.props.sizeMd, this.props.marginMd);
        } else {
            this.resizeClock(this.props.sizeLg, this.props.marginLg);
        }
    }

    resizeClock(size, margin) {
        console.log("Resize called", size, margin);
        const dialStyle = createDialStyle(size, margin);
        const secondsStyle = createSecondsHandSytle(size);
        const minutesStyle = createMinutesHandStyle(size);
        const hoursStyle = createHoursHandStyle(size);
        this.setState({dialStyle, secondsStyle, minutesStyle, hoursStyle});
    }


    startClock() {
        // Seconds
        this.secondsInterval = setInterval(() => {
            this.setState({secondsStyle: {...this.state.secondsStyle, ...createSecondsRotateStyle()}});
        }, 1000);

        // Minutes
        this.minutesInterval = setInterval(() => {
            this.setState({minutesStyle: {...this.state.minutesStyle, ...createMinutesRotateStyle()}});
        }, 1000);

        // Hours
        this.hoursInterval = setInterval(() => {
            this.setState({hoursStyle: {...this.state.hoursStyle, ...createHoursRotateStyle()}});
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.secondsInterval);
        clearInterval(this.minutesInterval);
        clearInterval(this.hoursInterval);
    }

    render() {
        const {dialStyle, secondsStyle, minutesStyle, hoursStyle} = this.state;

        return (
            <ul style={dialStyle}>
                <Link to="/">home</Link>
                <Link to="/c1">c1</Link>
                <Link to="/c2">c2</Link>
                <li style={secondsStyle}></li>
                <li style={minutesStyle}></li>
                <li style={hoursStyle}></li>
            </ul>
        );
    }
}

export default AnalogClock;
