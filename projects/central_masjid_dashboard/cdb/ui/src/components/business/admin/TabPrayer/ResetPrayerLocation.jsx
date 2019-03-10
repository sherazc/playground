import React, {Component} from "react";
import {geoCodeLocation} from "./PrayerServices";
import {styles} from "./ResetPrayerLocationStyles";
import {withStyles} from '@material-ui/core/styles';
import {
    Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText,
    DialogTitle, FormControl, InputLabel, MenuItem, Select
} from "@material-ui/core";
import {allCalculationMethods, allAsrJuristicMethods} from "./prayerCollections";

class ResetPrayerLocation extends Component {
    constructor(props) {
        super(props);
        this.state = this.createInitState();
        this.handleChange = this.handleChange.bind(this);
        this.handleGeocode = this.handleGeocode.bind(this);
        this.validateLocation = this.validateLocation.bind(this);
        this.updatePrayerOffsetMinutes = this.updatePrayerOffsetMinutes.bind(this);
    }

    createInitState() {
/*

        return {
            open: false,
            location: "",
            locationValid: undefined,
            step: 0,
            geoCode: this.createInitGeoCode(),
            calculationMethod: 1,
            asrJuristicMethod: 0,
            prayerOffsetMinutes: [0, 0, 0, 0, 0, 0, 0],
        };

*/

        return {
            "open": true,
            "location": "30004",
            "locationValid": true,
            "step": 1,
            "geoCode": {
                "latitude": 34.17630630000001,
                "longitude": -84.2910759,
                "timezone": -5,
                "timezoneId": "America/New_York",
                "timezoneName": "Eastern Standard Time"
            },
            "calculationMethod": "",
            "asrJuristicMethod": "",
            "prayerOffsetMinutes": [0, 0, 0, 0, 0, 0, 0]
        };
    }

    createInitGeoCode() {
        return {
            latitude: 0,
            longitude: 0,
            timezone: 0,
            timezoneId: "",
            timezoneName: ""
        };
    }

    handleOpen = () => {
        this.setState({...this.createInitState(), open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleGeocode(locationValid, geoCode) {
        if (locationValid) {
            this.setState({step: 1, locationValid, geoCode});
        } else {
            this.setState({step: 0, locationValid: false, geoCode: this.createInitGeoCode()});
        }
    }

    validateLocation() {
        geoCodeLocation(this.state.location, this.handleGeocode);
    }


    step1() {
        const locationHelperMessage = "Enter zip-code or city and state or full address";
        const locationMessage = this.state.locationValid === false ? `Invalid Location. ${locationHelperMessage}` : locationHelperMessage;
        return (
            <div>
                <DialogContentText>
                    Are you sure, you want to reset location?
                    <br/>
                    All Azan time will get reset. Even manually entered Azan times.
                    <br/>
                </DialogContentText>
                <TextField
                    error={this.state.locationValid === false}
                    helperText={locationMessage}
                    autoFocus
                    margin="dense"
                    name="location"
                    label="Location/Address"
                    type="text"
                    fullWidth
                    value={this.state.location}
                    onChange={this.handleChange}/>
            </div>
        );
    }

    updatePrayerOffsetMinutes(prayerOffsetMinutes) {
        this.setState({prayerOffsetMinutes});
    }

    step2() {
        const {classes} = this.props;
        /*
        "calculationMethod": 1,
        "asrJuristic": 0,
        "prayerOffsetMinutes": [0, 0, 0, 0, 0, 0, 0]
         */

        const latitude = `${this.state.geoCode.latitude}`.substring(0, 10);
        const longitude = `${this.state.geoCode.longitude}`.substring(0, 10);

        return (
            <div>
                <DialogContentText>
                    <b>Location</b> {this.state.location}
                    <br/>
                    <b>Geocode</b> {latitude}/{longitude}
                    <br/>
                    <b>Time Zone</b>
                    &nbsp;{this.state.geoCode.timezone}
                    &nbsp;- {this.state.geoCode.timezoneName}
                    &nbsp;- {this.state.geoCode.timezoneId}
                </DialogContentText>
                {/*
                <PrayerOffsetFields
                    prayerOffsetMinutes={this.state.prayerOffsetMinutes}
                    updatePrayerOffsetMinutes={this.updatePrayerOffsetMinutes}/>
                */}


                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="calculationMethod">Calculation Method</InputLabel>
                    <Select
                        value={this.state.calculationMethod}
                        onChange={this.handleChange}
                        inputProps={{
                            name: 'calculationMethod',
                            id: 'calculationMethod',
                        }} className={classes.selectEmpty}>
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {allCalculationMethods.map((calculationMethod, index) => {
                            return <MenuItem key={index} value={calculationMethod.id}>{calculationMethod.name}</MenuItem>
                        })}
                    </Select>
                </FormControl>

                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="asrJuristicMethod">Asr Juristic Method</InputLabel>
                    <Select
                        value={this.state.asrJuristicMethod}
                        onChange={this.handleChange}
                        inputProps={{
                            name: 'asrJuristicMethod',
                            id: 'asrJuristicMethod',
                        }} className={classes.selectEmpty}>
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {allAsrJuristicMethods.map((asrJuristicMethod, index) => {
                            return <MenuItem key={index} value={asrJuristicMethod.id}>{asrJuristicMethod.name}</MenuItem>
                        })}
                    </Select>
                </FormControl>

                {this.createPrayerOffsetFields()}
            </div>
        );
    }

    createPrayerOffsetFields() {
        const {classes} = this.props;

        const offsetNames = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Sunset", "Maghrib", "Isha"];

        const offsetFields = offsetNames.map((offsetName, index) => {
            const onChangeFunction = (event) => {
                const value = event.target.value;
                if (value > 60 || value < -60) {
                    return;
                }
                const prayerOffsetMinutes = this.state.prayerOffsetMinutes;
                prayerOffsetMinutes[index] = value;
                this.setState({prayerOffsetMinutes})
            };

            const offsetTextField = (
                <TextField
                    key={index} className={classes.azanOffset}
                    margin="dense" name={offsetName}
                    label={offsetName} type="number" fullWidth
                    value={this.state.prayerOffsetMinutes[index]}
                    onChange={onChangeFunction}/>
            );

            return offsetTextField;
        });

        return (
            <div>
                <b>Azan offset minutes</b>
                <div className={classes.azanOffsetContainer}>
                    {offsetFields}
                </div>
            </div>
        );
    }

    render() {
        return (
            <div>
                <Button variant="outlined" color="primary" onClick={this.handleOpen}>
                    Reset Salah Location
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Reset Salah Location</DialogTitle>
                    <DialogContent>
                        {this.state.step === 0 && this.step1()}
                        {this.state.step === 1 && this.step2()}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>

                        {this.state.step === 0 &&
                        <Button onClick={this.validateLocation} color="primary">
                            Validate Location
                        </Button>}
                        {this.state.step === 1 &&
                        <Button onClick={this.validateLocation} color="primary">
                            Validate Location
                        </Button>}
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(ResetPrayerLocation);