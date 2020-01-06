import React, {Component} from "react";
import {geoCodeLocation, callCreatePrayerTimeApi} from "./PrayerServices";
import {
    Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText,
    DialogTitle, FormControl, InputLabel, MenuItem, Select,
    FormControlLabel, Checkbox
} from "@material-ui/core";
import {allCalculationMethods, allAsrJuristicMethods} from "./prayerCollections";
import styles from "./ResetPrayerConfig.module.scss";
import {connect} from "react-redux";
import {setAdminPrayerConfigEdit} from "../../../../../store/admin/adminActions";
import {createEmptyIfUndefined, equalObjects} from "../../../../../services/utilities";


class ResetPrayerConfig extends Component {
    constructor(props) {
        super(props);
        this.state = this.createInitState(props.prayerConfig);
        this.onChange = this.onChange.bind(this);
        this.onChangeChecked = this.onChangeChecked.bind(this);
        this.onValidateLocation = this.onValidateLocation.bind(this);
        this.onGeocode = this.onGeocode.bind(this);
        this.onFinish = this.onFinish.bind(this);
        this.handleResetPrayerConfigApiResponse = this.handleResetPrayerConfigApiResponse.bind(this);
    }

    createInitState(prayerConfig) {
        return {
            open: false,
            location: prayerConfig.location,
            locationValid: undefined,
            step: 0,
            geoCode: this.createInitGeoCode(prayerConfig.geoCode),
            calculationMethod: createEmptyIfUndefined(prayerConfig.calculationMethod),
            asrJuristicMethod: createEmptyIfUndefined(prayerConfig.asrJuristicMethod),
            prayerOffsetMinutes: prayerConfig.prayerOffsetMinutes,
            generateIqamah: true,
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!equalObjects(prevProps.prayerConfig, this.props.prayerConfig)) {
            const newState = this.createInitState(this.props.prayerConfig);
            if (!newState.location && this.props.login) {
                newState.location = this.createCompanyLocation(this.props.login.company);
            }
            this.setState(newState)
        }
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

    onChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    onChangeChecked(event) {
        this.setState({[event.target.name]: event.target.checked});
    }

    onOpen = () => {
        this.setState({open: true});
    };

    onClose = () => {
        this.setState({open: false});
    };

    onGeocode(locationValid, geoCode) {
        if (locationValid) {
            this.setState({step: 1, locationValid, geoCode});
        } else {
            this.setState({step: 0, locationValid: false, geoCode: this.createInitGeoCode()});
        }
    }

    onValidateLocation() {
        geoCodeLocation(this.state.location, this.onGeocode);
    }

    onFinish() {
        const companyId = this.props.login.company.id;

        const prayerConfig = {
            companyId: companyId,
            location: this.state.location,
            calculationMethod: this.state.calculationMethod,
            asrJuristicMethod: this.state.asrJuristicMethod,
            prayerOffsetMinutes: this.state.prayerOffsetMinutes,
            geoCode: this.state.geoCode,
            dst: this.props.prayerConfig.dst
        };

        callCreatePrayerTimeApi(companyId, prayerConfig, this.state.generateIqamah, this.handleResetPrayerConfigApiResponse);
    }

    handleResetPrayerConfigApiResponse(serviceResponse) {
        console.log(serviceResponse);
        if (serviceResponse
            && serviceResponse.successful
            && serviceResponse.target
            && serviceResponse.target.prayers
            && serviceResponse.target.prayers.length > 0) {

            this.props.onFinish(serviceResponse.target, true);
            this.onClose();
        } else {
            // TODO: show error message
            console.error("Error getting updated prayer time, or parsing updated prayer times.");
        }
    }

    createCompanyLocation(company) {
        if (!company || !company.address) {
            return "";
        }
        const address = company.address;
        let companyLocation = "";

        if (address.city) {
            companyLocation = `${address.city}, `;
        }
        if (address.state) {
            companyLocation = `${companyLocation}${address.state} `;
        }
        if (address.zip) {
            companyLocation = `${companyLocation}${address.zip}`;
        }
        return companyLocation
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
                    // value={this.state.location ? this.state.location : this.createCompanyLocation(this.props.login.company)}
                    value={createEmptyIfUndefined(this.state.location)}
                    onChange={this.onChange}/>
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

                <FormControl className={styles.formControl} style={{display: "block"}}>
                    <FormControlLabel
                        control={<Checkbox color="primary"
                            name="generateIqamah"
                            checked={this.state.generateIqamah}
                            onChange={this.onChangeChecked} />}
                        label="Auto generate iqamah time"
                        labelPlacement="end"/>
                </FormControl>

                <FormControl className={styles.formControl}>
                    <InputLabel htmlFor="calculationMethod">Calculation Method</InputLabel>
                    <Select
                        value={this.state.calculationMethod}
                        onChange={this.onChange}
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
                        onChange={this.onChange}
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
                    value={this.state.prayerOffsetMinutes[index] === undefined ? "" : this.state.prayerOffsetMinutes[index]}
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
                <Button disabled={this.props.disabled} variant="outlined" color="primary" onClick={this.onOpen}>
                    Reset Prayers
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.onClose}
                    aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Reset Prayers</DialogTitle>
                    <DialogContent>
                        {this.state.step === 0 && this.step1()}
                        {this.state.step === 1 && this.step2()}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.onClose} color="primary">
                            Cancel
                        </Button>

                        {this.state.step === 0 &&
                        <Button onClick={this.onValidateLocation} color="primary">
                            Validate Location
                        </Button>}
                        {this.state.step === 1 &&
                        <Button onClick={this.onFinish} color="primary">
                            Finish
                        </Button>}
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        login: state.login,
        prayerConfig: state.admin.prayerConfig,
        editPrayerConfig: state.admin.editPrayerConfig
    }
};
const actions = {setAdminPrayerConfigEdit};

export default connect(mapStateToProps, actions)(ResetPrayerConfig);
