import React, {Component} from "react";

import {
    createDialStyle, createHoursHandStyle,
    createHoursRotateStyle, createMinutesHandStyle,
    createMinutesRotateStyle, createSecondsHandSytle,
    createSecondsRotateStyle
} from "./AnalogClockServices";

import styles from "./AnalogClock.module.scss"

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
            this.resizeClock(this.props.sizeMd);
        } else {
            this.resizeClock(this.props.sizeLg);
        }
    }

    resizeClock(size) {
        const dialStyle = createDialStyle(size);
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
            <div className={styles.container}>
            <ul style={dialStyle}>
                <li style={secondsStyle} />
                <li style={minutesStyle} />
                <li style={hoursStyle} />
            </ul>
            </div>
        );
    }
}

export default AnalogClock;
