import React, {Component} from "react";
import CloseablePanel from "../../../../common/CloseablePanel/CloseablePanel";
import InputField from "../../../../partials/InputField";

class Jummah extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            jummahs: props.jummahs ? props.jummahs : []
        };
        this.onChange = this.onChange.bind(this);
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
        const newStateExpenses = {...this.state.jummahs};
        newStateExpenses[nameIndex[1]][nameIndex[0]] = event.target.value;
        this.setState({jummahs: newStateExpenses, editMode: true});
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
        this.state.jummahs.push({lineItem: "", amount: 0});
        this.setState({jummahs: this.state.jummahs, editMode: true});
    }

    createExpenseRow(jummah, index) {
        return (
            <tr key={index}>
                <td>


                    <InputField
                        name={"lineItem_" + index}
                        onChange={this.onChange.bind(this)}
                        type="text"
                        value={jummah.lineItem}/>
                </td>
                <td>
                    <InputField
                        name={"amount_" + index}
                        onChange={this.onChange.bind(this)}
                        type="number"
                        value={jummah.amount}/>
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
                    title="Expenses"
                    editMode={this.state.editMode}
                    defaultExpanded={this.props.defaultExpanded}
                    onSave={this.onSave.bind(this)}
                    onCancel={this.onCancel.bind(this)}>
                    <table border="1">
                        <thead>
                        <tr>
                            <th>Item</th>
                            <th>Amount</th>
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
                        {this.state.jummahs.map((jummah, index) => this.createExpenseRow(jummah, index))}
                        </tbody>

                        <tfoot>
                        <tr>
                            <th>
                                Total
                            </th>
                            <td>
                                {this.state.jummahs.reduce((total, jummah) => jummah.amount - 0 + total, 0)}
                            </td>
                            <td></td>
                        </tr>
                        </tfoot>
                    </table>
                </CloseablePanel>
            </div>
        );
    }
}


export default Jummah;
