import React, {Component} from "react";

import {
    TextField, FormControl, FormHelperText,
    FormControlLabel, FormGroup, Switch
} from "@material-ui/core";
import CloseablePanel from "../../../../common/CloseablePanel/CloseablePanel";
import {equalObjects, MONTH_DATE_REGEX} from "../../../../../services/utilities";


class Dst extends Component {

    constructor(props) {
        super(props);
        this.state = this.createInitialState();

        this.onCheckChange = this.onCheckChange.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    createInitialState() {
        return {
            dst: {
                enable: false,
                automaticCalculate: false,
                beginMonthDate: "",
                endMonthDate: ""
            },
            dstDirty: false
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.dst.enable !== undefined
            && !equalObjects(this.props.dst, this.state.dst)
            && !equalObjects(this.props.dst, prevProps.dst)) {
            this.setState({dst: this.props.dst});
        }
    }

    onCheckChange(event) {
        const dst = {...this.state.dst};
        dst[event.target.name] = event.target.checked;
        this.setState({dst: dst, dstDirty: true});
    }

    onChange(event) {
        const {dst} = this.state;
        dst[event.target.name] = event.target.value;
        this.setState({dst: dst, dstDirty: true});
    }

    onSave() {
        this.setState({dstDirty: false});
        this.props.onSaveDst(this.state.dst);
    }

    onCancel() {
        this.setState({dst: this.props.dst, dstDirty: false});
        this.props.onCancel();
    }

    isValidDateMonth(monthDate) {
        if(!monthDate || monthDate.length < 1) {
            return true;
        } else {
            return MONTH_DATE_REGEX.test(monthDate);
        }
    }

    render() {
        const validBeginMonthDate = this.isValidDateMonth(this.state.dst.beginMonthDate);
        const validEndMonthDate = this.isValidDateMonth(this.state.dst.endMonthDate);

        const allowEdit = this.state.dstDirty
            && ((this.state.dst.beginMonthDate && this.state.dst.endMonthDate)
                || (!this.state.dst.beginMonthDate && !this.state.dst.endMonthDate))
            && validBeginMonthDate && validEndMonthDate;

        return (
            <div>
                <CloseablePanel
                    title="DST Settings"
                    editMode={allowEdit}
                    defaultExpanded={false}
                    onSave={this.onSave}
                    onCancel={this.onCancel}>
                    <div>
                        <div style={{marginBottom: 20}}>
                            DST changes will be applied to already saved prayers.
                        </div>

                        <FormGroup aria-label="position" row>
                            <FormControlLabel
                                control={
                                    <Switch color="primary"
                                            checked={this.state.dst.enable}
                                            onChange={this.onCheckChange}
                                            name="enable"/>}
                                label="Enable"
                                labelPlacement="start"/>
                            <FormControlLabel
                                control={
                                    <Switch color="primary"
                                            checked={this.state.dst.automaticCalculate}
                                            onChange={this.onCheckChange}
                                            name="automaticCalculate"/>}
                                label="Automatic Calculate"
                                labelPlacement="start"/>
                        </FormGroup>

                        <FormControl style={{display: "block"}}>
                            <TextField error={!validBeginMonthDate}
                                margin="dense" name="beginMonthDate"
                                label="Begin" type="text"
                                value={this.state.dst.beginMonthDate}
                                onChange={this.onChange}/>
                            <FormHelperText error={!validBeginMonthDate}>
                                MM/DD. Manual DST begin date.
                            </FormHelperText>
                        </FormControl>

                        <FormControl style={{display: "block"}}>
                            <TextField error={!validEndMonthDate}
                                margin="dense" name="endMonthDate"
                                label="End" type="text"
                                value={this.state.dst.endMonthDate}
                                onChange={this.onChange}/>
                            <FormHelperText error={!validEndMonthDate}>
                                MM/DD. Manual DST end date.
                            </FormHelperText>
                        </FormControl>

                    </div>
                </CloseablePanel>
            </div>
        );
    }
}

export default Dst;

/*

-----------------
DST
===

DST Rules
begins at 2:00 a.m. on the second Sunday of March and
ends at 2:00 a.m. on the first Sunday of November
https://www.nist.gov/pml/time-and-frequency-division/popular-links/daylight-saving-time-dst




add DST in PrayerConfig.java and PrayerConfig.json
    prayerConfig: {
        dst: {
            enable: boolean
            automaticCalculate: boolean,
            start: date,
            end: date
        }
    }


Create business/admin/TabPrayer/Dst/Dst.jsx

Pass TabPrayer.state.PrayerConfig.dst to Dst.props

Load Dst's setting form from Dst.props.dst

On change Dst.props.dst call TabPrayer.setDstInState()

TabPrayer.setDstInState() will update TabPrayer.state.PrayerConfig.dst
by calling TabPrayer.setPrayerConfigInState(prayerConfig, true)


load Dst.props.prayerConfig.dst in Dst.state
*/