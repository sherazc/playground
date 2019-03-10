import React, {Component} from "react";
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => {
    const azanOffsetContainer = {
        display: "flex"
    };
    const azanOffset = {
        width: "20%",
        padding: "5px"
    };

    return ({
        azanOffsetContainer, azanOffset
    });
};


class PrayerOffsetFields extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prayerOffsetMinutes: this.props.prayerOffsetMinutes
        }
    }

    componentDidMount() {
        const offsetNames = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Sunset", "Maghrib", "Isha"];
        this.offsetFields = this.createOffsetFields(offsetNames);
    }

    createOffsetFields(offsetNames) {
        const {classes, prayerOffsetMinutes, updatePrayerOffsetMinutes} = this.props;

        const offsetFields = offsetNames.map((offsetName, index) => {


            const onChangeFunction = (event) => {
                const value = event.target.value;
                if (value > 60 || value < -60) {
                    return;
                }
                prayerOffsetMinutes[index] = value;
                this.setState({prayerOffsetMinutes});
                updatePrayerOffsetMinutes(prayerOffsetMinutes);
                console.log("PrayerOffsetFields", prayerOffsetMinutes);
            };


            const offsetTextField = (

                <div key={index}>
                <TextField key={index} className={classes.azanOffset}
                           autoFocus
                           margin="dense"
                           name={offsetName}
                           label={offsetName}
                           type="number"
                           fullWidth
                           value={this.state.prayerOffsetMinutes[index]}
                           onChange={onChangeFunction}
                />

                    {this.state.prayerOffsetMinutes[index]}
                </div>
            );

            console.log("one ", index, new Date());
            return offsetTextField;
        });


        return offsetFields
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <b>Azan offset minutes</b>
                <div className={classes.azanOffsetContainer}>
                    {this.offsetFields}
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(PrayerOffsetFields);
