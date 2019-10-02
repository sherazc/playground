import React, {Component} from "react";
import {
    Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText,
    DialogTitle, FormControl, InputLabel, MenuItem, Select,
    FormControlLabel, Checkbox, FormGroup, Switch
} from "@material-ui/core";
import styles from "../ResetPrayerConfig/ResetPrayerConfig.module.scss";
import CloseablePanel from "../../../../common/CloseablePanel/CloseablePanel";


class Dst extends Component {

    render() {
        return (
            <div>
                <CloseablePanel
                    title="DST Settings"
                    // editMode={this.state.editMode}
                    // defaultExpanded={this.props.defaultExpanded}
                    // onSave={this.props.onSave}
                    //onCancel={this.onCancel.bind(this)}
                >

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
                </CloseablePanel>
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