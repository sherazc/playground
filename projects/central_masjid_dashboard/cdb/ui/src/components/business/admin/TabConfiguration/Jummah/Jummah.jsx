import React, {Component} from "react";
import CloseablePanel from "../../../../common/CloseablePanel/CloseablePanel";
import InputField from "../../../../partials/InputField";
import {
    Checkbox
} from "@material-ui/core";

class Jummah extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            jummahs: props.jummahs ? props.jummahs : []
        };
        this.onChange = this.onChange.bind(this);
        this.onChangeChecked = this.onChangeChecked.bind(this);
    }

    createNewJummah() {
        return {khateeb: "", date: "", enabled: false};
    }

    static getDerivedStateFromProps(newProps, currentState) {
        // TODO: Bug: onCancel() if the length is same then not loading refreshed jummahs
        if (newProps.jummahs && newProps.jummahs.length !== currentState.jummahs.length) {
            return {
                ...currentState,
                jummahs: newProps.jummahs
            };
        } else {
            return null;
        }
    }

    onChange(event) {
        const nameIndex = event.target.name.split("_");
        const newStateJummahs = this.state.jummahs.slice(0);
        newStateJummahs[nameIndex[1]][nameIndex[0]] = event.target.value;
        this.setState({jummahs: newStateJummahs, editMode: true});
    }

    onChangeChecked(event) {
        const nameIndex = event.target.name.split("_");
        const newStateJummahs = this.state.jummahs.slice(0);
        newStateJummahs[nameIndex[1]][nameIndex[0]] = event.target.checked;
        this.setState({jummahs: newStateJummahs, editMode: true});
    }

    onCancel() {
        this.props.onCancel();
        this.setState({editMode: false});
    }

    onSave() {
        this.props.onSave();
        this.setState({editMode: false});
    }

    onDelete(index) {
        this.state.jummahs.splice(index, 1);
        this.setState({jummahs: this.state.jummahs, editMode: true});
    }

    onAdd() {
        this.state.jummahs.push(this.createNewJummah());
        this.setState({jummahs: this.state.jummahs, editMode: true});
    }

    createRow(jummah, index) {
        return (
            <tr key={index}>
                <td>
                    <InputField
                        name={"khateeb_" + index}
                        onChange={this.onChange}
                        type="text"
                        value={jummah.khateeb}/>
                </td>
                <td>
                    <InputField
                        name={"date_" + index}
                        onChange={this.onChange}
                        type="date"
                        value={jummah.date && jummah.date.substr(0,10)}/>
                </td>
                <td>
                    <Checkbox color="primary"
                        name={"enabled_" + index}
                        checked={jummah.enabled}
                        onChange={this.onChangeChecked} />
                </td>
                <td>
                    <span
                        style={{cursor: "pointer"}}
                        onClick={() => {
                            this.onDelete(index)
                        }}
                        role="img"
                        aria-label="Delete"
                        aria-hidden={true}>
                        ❌
                    </span>
                </td>
            </tr>
        );
    }

    render() {
        return (
            <div>
                <CloseablePanel
                    title="Jummah"
                    editMode={this.state.editMode}
                    defaultExpanded={this.props.defaultExpanded}
                    onSave={this.onSave.bind(this)}
                    onCancel={this.onCancel.bind(this)}>
                    <table border="1">
                        <thead>
                        <tr>
                            <th>Khateeb</th>
                            <th>Date</th>
                            <th>Enabled</th>
                            <th>
                                <span
                                    style={{cursor: "pointer"}}
                                    onClick={this.onAdd.bind(this)}
                                    role="img"
                                    aria-label="Add"
                                    aria-hidden={true}>
                                    ➕
                                </span>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.jummahs.map((jummah, index) => this.createRow(jummah, index))}
                        </tbody>
                    </table>
                </CloseablePanel>
            </div>
        );
    }
}

export default Jummah;
