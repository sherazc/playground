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
        secondDigit: 0
    };

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    addSecond() {
        this.setState({secondDigit: ++this.state.secondDigit});
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.dClockContainer}>
                <DigitalClockDigit digit={Math.floor(this.state.secondDigit % 10)}/>
                <br/>
                <button onClick={this.addSecond.bind(this)}>Add Digit</button>
            </div>
        );
    }
}

export default withStyles(styles)(DigitalClock);
