import React, {Component} from "react";
import CloseablePanel from "../../../../common/CloseablePanel/CloseablePanel";
import InputField from "../../../../partials/InputField";
import {
    Checkbox
} from "@material-ui/core";

class Funds extends Component {

    constructor(props) {
        super(props);
        this.state = this.createInitialState();
        this.onChange = this.onChange.bind(this);
        this.onChangeChecked = this.onChangeChecked.bind(this);
    }

    createInitialState() {
        return {
            editMode: false,
            funds: this.props.funds ? this.props.funds : []
        };
    }

    static getDerivedStateFromProps(newProps, currentState) {
        if (newProps.funds && newProps.funds.length !== currentState.funds.length) {
            const newState =  {
                ...currentState,
                funds: newProps.funds
            };
            return newState;
        } else {
            return null;
        }
    }

    onChange(event) {
        const nameIndex = event.target.name.split("_");
        const newStateFunds = {...this.state.funds};
        newStateFunds[nameIndex[1]][nameIndex[0]] = event.target.value;
        this.setState({funds: newStateFunds, editMode: true});
    }

    onChangeChecked(event) {
        const nameIndex = event.target.name.split("_");
        const newStateFunds = {...this.state.funds};
        newStateFunds[nameIndex[1]][nameIndex[0]] = event.target.checked;
        this.setState({funds: newStateFunds, editMode: true});
    }

    onCancel() {
        this.props.onCancel();
        this.setState({editMode: false});
    }

    onSave() {
        this.props.onSave();
        this.setState({editMode: false});
    }

    makeFundUi(fund, index) {

        const endDate = fund.endDate ? fund.endDate : "";
        return (
            <div key={index}>
                <table border="1" style={{marginBottom: "20px"}}>
                    <thead>
                    <tr>
                        <th colSpan="2">
                            <InputField
                                name={"name_" + index}
                                onChange={this.onChange}
                                type="text"
                                value={fund.name}/>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Goal</td>
                        <td>
                            <InputField
                                name={"goal_" + index}
                                onChange={this.onChange}
                                type="number"
                                value={fund.goal}/>
                        </td>
                    </tr>
                    <tr>
                        <td>Current</td>
                        <td>
                            <InputField
                                name={"current_" + index}
                                onChange={this.onChange}
                                type="number"
                                value={fund.current}/>
                        </td>
                    </tr>
                    <tr>
                        <td>Pledges</td>
                        <td>
                            <InputField
                                name={"pledge_" + index}
                                onChange={this.onChange}
                                type="number"
                                value={fund.pledge}/>
                        </td>
                    </tr>
                    <tr>
                        <td>End Date</td>
                        <td>
                            <InputField
                                name={"endDate_" + index}
                                onChange={this.onChange}
                                type="date"
                                value={endDate.substr(0,10)}/>
                        </td>
                    </tr>
                    <tr>
                        <td>Enabled</td>
                        <td>
                            <Checkbox color="primary"
                                  name={"enabled_" + index}
                                  checked={fund.enabled}
                                  onChange={this.onChangeChecked} />
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }

    render() {
        return (
            <div>
                <CloseablePanel
                    title="Funds"
                    editMode={this.state.editMode}
                    defaultExpanded={this.props.defaultExpanded}
                    onSave={this.onSave.bind(this)}
                    onCancel={this.onCancel.bind(this)}>
                    <div>
                        {this.state.funds.map((fund, index) => this.makeFundUi(fund, index))}
                    </div>

                </CloseablePanel>
            </div>
        );
    }
}

export default Funds;
