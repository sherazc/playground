import React, {Component} from "react";
import states from "./states"

class StateSelect extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <select className="form-control" value={this.props.selectedStateAbv}>
                {this.buildStateOptions(states)}
            </select>
        );
    }

    buildStateOptions(states) {
        return states.map((stateObject, index) => {
            return (<option value={stateObject.abbreviation} key={index}>{stateObject.name}</option>);
        })
    }
}

export default StateSelect;