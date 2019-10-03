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
        this.state = {
            dst: {}
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!equalObjects(this.props.dst, this.state.dst)) {
            this.setState({dst: this.props.dst});
        }
    }

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