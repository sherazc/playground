import React, {Component} from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {geoCodeLocation} from "../../../../services/business/PrayerServices";


class ResetSalahLocation extends Component {
    constructor(props) {
        super(props);
        this.state = this.createInitState();
        this.onChange = this.onChange.bind(this);
        this.handleLatitudeLongitude = this.handleLatitudeLongitude.bind(this)
        this.validateLocation = this.validateLocation.bind(this)
    }

    createInitState() {
        return {
            open: false,
            location: "",
            latitude: undefined,
            longitude: undefined,
            step: 0,
            timezone: -5,
            calculationMethod: 1,
            asrJuristic: 0,
            prayerOffsetMinutes: [0, 0, 0, 0, 0, 0, 0]
        };
    }

    handleOpen = () => {
        this.setState({...this.createInitState(), open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    onChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleLatitudeLongitude(latitude, longitude) {
        this.setState({latitude, longitude});
        if (latitude !== 0 && longitude !== 0) {
            this.setState({step: 1});
        }
    }

    validateLocation() {
        geoCodeLocation(this.state.location, this.handleLatitudeLongitude);
    }


    step1_selectPrayerLocationDialogContent(invalidLocation) {
        const locationHelperMessage = "Enter zip-code or city and state or full address";
        const locationMessage = invalidLocation ? `Invalid Location. ${locationHelperMessage}` : locationHelperMessage;
        return (
            <div>
                <DialogContentText>
                    Are you sure, you want to reset location?
                    <br/>
                    All Azan time will get reset. Even manually entered Azan times.
                    <br/>
                </DialogContentText>
                <TextField
                    error={invalidLocation}
                    helperText={locationMessage}
                    autoFocus
                    margin="dense"
                    name="location"
                    label="Location/Address"
                    type="text"
                    fullWidth
                    value={this.state.location}
                    onChange={this.onChange}/>
            </div>
        );
    }

    step2() {
        return (
            <div>
                <DialogContentText>
                    Advance Prayer configuration
                </DialogContentText>
            </div>
        );
    }


    render() {
        const invalidLocation = this.state.latitude === 0 && this.state.longitude === 0;
        const validLocation = !!(this.state.latitude && this.state.longitude);

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
                        {this.state.step === 0 && this.step1_selectPrayerLocationDialogContent(invalidLocation)}
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

export default ResetSalahLocation;