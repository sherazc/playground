import React, {Component} from "react";
import {geoCodeLocation, updatePrayerLocation} from "./../PrayerServices";
import {
    Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText,
    DialogTitle, FormControl, InputLabel, MenuItem, Select
} from "@material-ui/core";
import {allCalculationMethods, allAsrJuristicMethods} from "./../prayerCollections";
import styles from "./ResetPrayerConfig.module.scss";
import {connect} from "react-redux";

class ResetPrayerConfig extends Component {
    constructor(props) {
        super(props);
        this.state = this.createInitState(props.prayerConfig);
        this.handleChange = this.handleChange.bind(this);
        this.handleValidateLocation = this.handleValidateLocation.bind(this);
        this.handleGeocode = this.handleGeocode.bind(this);
        this.handleFinish = this.handleFinish.bind(this);
        this.handleUpdatedPrayerTime = this.handleUpdatedPrayerTime.bind(this);
    }

    createInitState(prayerConfig) {
        return {
            open: false,
            location: prayerConfig.location,
            locationValid: undefined,
            step: 0,
            geoCode: this.createInitGeoCode(prayerConfig.geoCode),
            calculationMethod: prayerConfig.calculationMethod,
            asrJuristicMethod: prayerConfig.asrJuristicMethod,
            prayerOffsetMinutes: prayerConfig.prayerOffsetMinutes,
        };
    }

    createInitGeoCode(geoCode) {
        if (geoCode) {
            return {...geoCode}
        } else {
            return {
                latitude: 0,
                longitude: 0,
                timezone: 0,
                timezoneId: "",
                timezoneName: ""
            };
        }
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleOpen = () => {
        this.setState({...this.createInitState(this.props.prayerConfig), open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleGeocode(locationValid, geoCode) {
        if (locationValid) {
            this.setState({step: 1, locationValid, geoCode});
        } else {
            this.setState({step: 0, locationValid: false, geoCode: this.createInitGeoCode()});
        }
    }

    handleValidateLocation() {
        geoCodeLocation(this.state.location, this.handleGeocode);
    }

    handleFinish() {
        const prayerConfig = {
            location: this.state.location,
            calculationMethod: this.state.calculationMethod,
            asrJuristicMethod: this.state.asrJuristicMethod,
            prayerOffsetMinutes: this.state.prayerOffsetMinutes,
            geoCode: this.state.geoCode
        };

        updatePrayerLocation(1234, prayerConfig, this.handleUpdatedPrayerTime);
    }

    handleUpdatedPrayerTime(serviceResponse) {
        if (serviceResponse
            && serviceResponse.successful
            && serviceResponse.target
            && serviceResponse.target.length > 0) {
            this.props.handleUpdatedPrayerTime(serviceResponse.target);
            this.handleClose();
        } else {
            // TODO: show error message
            console.error("Error getting updated prayer time, or parsing updated prayer times.");
        }
    }

    step1() {
        const locationHelperMessage = "Enter zip-code or city and state or full address";
        const locationMessage = this.state.locationValid === false ? `Invalid Location. ${locationHelperMessage}` : locationHelperMessage;
        return (
            <div>
                <DialogContentText>
                    Are you sure, you want to reset prayers?
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

    step2() {

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


                <FormControl className={styles.formControl}>
                    <InputLabel htmlFor="calculationMethod">Calculation Method</InputLabel>
                    <Select
                        value={this.state.calculationMethod}
                        onChange={this.handleChange}
                        inputProps={{
                            name: 'calculationMethod',
                            id: 'calculationMethod',
                        }} className={styles.selectEmpty}>
                        {allCalculationMethods.map((calculationMethod, index) => {
                            return <MenuItem key={index}
                                             value={calculationMethod.id}>{calculationMethod.name}</MenuItem>
                        })}
                    </Select>
                </FormControl>

                <FormControl className={styles.formControl}>
                    <InputLabel htmlFor="asrJuristicMethod">Asr Juristic Method</InputLabel>
                    <Select
                        value={this.state.asrJuristicMethod}
                        onChange={this.handleChange}
                        inputProps={{
                            name: 'asrJuristicMethod',
                            id: 'asrJuristicMethod',
                        }} className={styles.selectEmpty}>
                        {allAsrJuristicMethods.map((asrJuristicMethod, index) => {
                            return <MenuItem key={index}
                                             value={asrJuristicMethod.id}>{asrJuristicMethod.name}</MenuItem>
                        })}
                    </Select>
                </FormControl>

                {this.createPrayerOffsetFields()}
            </div>
        );
    }

    createPrayerOffsetFields() {
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
                    key={index} className={styles.azanOffset}
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
                <div className={styles.azanOffsetContainer}>
                    {offsetFields}
                </div>
            </div>
        );
    }

    render() {
        return (
            <div>
                <Button variant="outlined" color="primary" onClick={this.handleOpen}>
                    Reset Prayers
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Reset Prayers</DialogTitle>
                    <DialogContent>
                        {this.state.step === 0 && this.step1()}
                        {this.state.step === 1 && this.step2()}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>

                        {this.state.step === 0 &&
                        <Button onClick={this.handleValidateLocation} color="primary">
                            Validate Location
                        </Button>}
                        {this.state.step === 1 &&
                        <Button onClick={this.handleFinish} color="primary">
                            Finish
                        </Button>}
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {login: state.login, prayerConfig: state.admin.prayerConfig}
};
const actions = {};

export default connect(mapStateToProps, actions)(ResetPrayerConfig);

/*
✅ Update Reset Dialog styles with SCSS

✅ Show Warning on the Dialog that only azan time will be changed

✅ Create location text box.

✅ If location is changed and blur the call google api to load Geocode and Timezone.
While Geocode and timezone are loading show loading in geocode and timezone fields.

✅ auto load prayer configs in Reset salah location dialog.

Show reset iqamah time checkbox

Auto generate iqamah time checkbox. Auto generate iqamah time will be done in the backend.

No save will be done on Reset. Show save button

Disable Finish button if location is invalid.

Once all reset salah location dialog values are complete the create a PrayerConfig object.

Call Create Prayer times API. POST it PrayerConfig and pass it "reset iqamah time" and
"auto generate iqamah times"  /api/prayer/{companyId}/config/time. API will return ServiceResponse<PrayerConfig>.
Returned PrayerConfig will contain 366 List<Prayer>

*/

