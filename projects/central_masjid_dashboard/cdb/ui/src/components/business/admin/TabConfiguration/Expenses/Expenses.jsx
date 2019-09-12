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
        if (newProps.expenses && newProps.expenses.length !== currentState.expenses.length) {
            const newState = {
                ...currentState,
                expenses: newProps.expenses
            };
            return newState;
        } else {
            return null;
        }
    }

    onChange(event) {
        const nameIndex = event.target.name.split("_");
        const newStateExpenses = {...this.state.expenses};
        newStateExpenses[nameIndex[1]].amount = event.target.value;
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
        console.log("Add")
    }

    createExpenseRow(expense, index) {
        return (
            <tr key={index}>
                <td>
                    {expense.lineItem}
                </td>
                <td>
                    <InputField
                        name={"lineItem_" + index}
                        onChange={this.onChange.bind(this)}
                        type="number"
                        value={expense.amount}
                    />
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
                    <table>
                        <thead>
                        <tr>
                            <th>Item</th>
                            <th>Amount</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.expenses.map((expense, index) => this.createExpenseRow(expense, index))}
                        </tbody>

                        <tfoot>
                        <tr>
                            <td colSpan="2">
                                <span
                                    style={{cursor: "pointer"}}
                                    onClick={this.onAdd.bind(this)}
                                    role="img"
                                    aria-label="Add"
                                    aria-hidden={true}>
                                    ➕
                                </span>

                            </td>
                        </tr>

                        <tr>
                            <th>
                                Total
                            </th>
                            <td>
                                {this.state.expenses.reduce((total, expense) => expense.amount + total, 0)}
                            </td>
                        </tr>
                        </tfoot>
                    </table>
                </CloseablePanel>
            </div>
        );
    }
}


export default Expenses;
