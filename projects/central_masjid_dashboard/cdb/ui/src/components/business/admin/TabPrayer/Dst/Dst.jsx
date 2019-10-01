import React, {Component} from "react";
import {
    Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText,
    DialogTitle, FormControl, InputLabel, MenuItem, Select,
    FormControlLabel, Checkbox, FormGroup, Switch
} from "@material-ui/core";
import styles from "../ResetPrayerConfig/ResetPrayerConfig.module.scss";


class Dst extends Component {

    render() {
        return (
            <div>
                <h3>DST</h3>
                <FormControl>
                    <FormGroup aria-label="position" row>
                        <FormControlLabel
                            control={<Switch color="primary"/>}
                            label="Enable"
                            labelPlacement="start"
                        />
                        <FormControlLabel
                            control={<Switch color="primary"/>}
                            label="Automatic Calculate"
                            labelPlacement="start"
                        />
                    </FormGroup>


                        <TextField
                            margin="dense" name="start"
                            label="Start" type="text"
                            value=""
                            onChange={() => {}}/>

                        <TextField
                            margin="dense" name="start"
                            label="End" type="text"
                            value=""
                            onChange={() => {}}/>


                </FormControl>

                <Button variant="outlined" color="primary">
                    Apply
                </Button>
            </div>
        );
    }
}

export default Dst;

/*

dst: {
    enable: boolean
    automaticCalculate: boolean,
    start: date,
    end: date
}
 */