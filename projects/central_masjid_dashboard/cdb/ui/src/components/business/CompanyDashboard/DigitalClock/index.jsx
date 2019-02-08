import React, {Component} from "react";
import {withStyles} from '@material-ui/core/styles';

const addUnit = (num) => {
    return num + "vw";
};

const styles = theme => {
    return {};
};

class DigitalClock extends Component {
    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                Digital clock
            </div>
        );
    }
}

export default withStyles(styles)(DigitalClock);
