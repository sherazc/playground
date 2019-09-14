import React, {Component} from "react";
import CloseablePanel from "../../../../common/CloseablePanel/CloseablePanel";
import InputField from "../../../../partials/InputField";

class Expenses extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            expenses: props.expenses ? props.expenses : []
        };
        this.onChange = this.onChange.bind(this);
    }

    static getDerivedStateFromProps(newProps, currentState) {
        // TODO: Bug: onCancel() if the length is same then not loading refreshed expenses
        if (newProps.expenses && newProps.expenses.length !== currentState.expenses.length) {
            return {
                ...currentState,
                expenses: newProps.expenses
            };
        } else {
            return null;
        }
    }

    onChange(event) {
        const nameIndex = event.target.name.split("_");
        const newStateExpenses = this.state.expenses.slice(0);
        newStateExpenses[nameIndex[1]][nameIndex[0]] = event.target.value;
        this.setState({expenses: newStateExpenses, editMode: true});
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
        this.state.expenses.splice(index, 1);
        this.setState({expenses: this.state.expenses, editMode: true});
    }

    onAdd() {
        this.state.expenses.push({lineItem: "", amount: 0});
        this.setState({expenses: this.state.expenses, editMode: true});
    }

    createRow(expense, index) {
        return (
            <tr key={index}>
                <td>
                    <InputField
                        name={"lineItem_" + index}
                        onChange={this.onChange.bind(this)}
                        type="text"
                        value={expense.lineItem}/>
                </td>
                <td>
                    <InputField
                        name={"amount_" + index}
                        onChange={this.onChange.bind(this)}
                        type="number"
                        value={expense.amount}/>
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
                        {this.state.expenses.map((expense, index) => this.createRow(expense, index))}
                        </tbody>
                        <tfoot>
                        <tr>
                            <th>
                                Total
                            </th>
                            <td>
                                {this.state.expenses.reduce((total, expense) => expense.amount - 0 + total, 0)}
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

export default Expenses;
