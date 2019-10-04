import React, {Component} from "react";

import {
    TextField, FormControl,
    FormControlLabel, FormGroup, Switch
} from "@material-ui/core";
import CloseablePanel from "../../../../common/CloseablePanel/CloseablePanel";
import {equalObjects} from "../../../../../services/utilities";


class Dst extends Component {

    constructor(props) {
        super(props);
        this.state = this.createInitialState();

        this.onCheckChange = this.onCheckChange.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    createInitialState() {
        return {
            dst: {
                enable: false,
                automaticCalculate: false,
                start: null,
                end: null
            },
            dstDirty: false
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.dst.enable !== undefined
            && !equalObjects(this.props.dst, this.state.dst)
            && !equalObjects(this.props.dst, prevProps.dst)) {
            console.log("Setting states");
            this.setState({dst: this.props.dst});
        }
    }

    onCheckChange(event) {
        const dst = {...this.state.dst};
        dst[event.target.name] = event.target.checked;
        this.setState({dst: dst, dstDirty: true});
    }

    onSave() {
        this.setState({dstDirty: false});
    }

    onCancel() {
        this.setState({dst: this.props.dst, dstDirty: false});
    }

    render() {
        return (
            <div>
                <CloseablePanel
                    title="DST Settings"
                    editMode={this.state.dstDirty}
                    defaultExpanded={false}
                    onSave={this.onSave}
                    onCancel={this.onCancel}>
                    <div>
                        <div style={{marginBottom: 20}}>
                            DST changes will be applied to already saved prayers.
                        </div>
                        <FormControl>
                            <FormGroup aria-label="position" row>
                                <FormControlLabel
                                    control={<Switch color="primary"
                                                     checked={this.state.dst.enable}
                                                     onChange={this.onCheckChange}
                                                     name="enable"
                                    />}
                                    label="Enable"
                                    labelPlacement="start"
                                />
                                <FormControlLabel disabled
                                                  control={<Switch color="primary"
                                                                   checked={this.state.dst.automaticCalculate}
                                                                   onChange={this.onCheckChange}
                                                                   name="automaticCalculate"/>}
                                                  label="Automatic Calculate"
                                                  labelPlacement="start"
                                />
                            </FormGroup>


                            <TextField
                                margin="dense" name="start"
                                label="Start" type="text"
                                value=""
                                disabled
                                onChange={() => {
                                }}/>

                            <TextField
                                margin="dense" name="start"
                                label="End" type="text"
                                value=""
                                disabled
                                onChange={() => {
                                }}/>


                        </FormControl>
                    </div>
                </CloseablePanel>
            </div>
        );
    }
}

export default Dst;
