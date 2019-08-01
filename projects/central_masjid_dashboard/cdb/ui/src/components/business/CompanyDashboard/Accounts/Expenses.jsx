import React, {Component} from "react";

class Expenses extends Component {
    renderTable() {
        const {expenses} = this.props;
        if(expenses && expenses.length > 0) {
            const totalAmount = expenses.reduce(
                (previousExpense, currentExpense) => previousExpense.amount + currentExpense.amount
            );

            return (
                <table border="1" style={{margin: "0 auto"}}>
                    <thead>
                    <tr>
                        <th>
                            Item
                        </th>
                        <th>
                            Amount
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderTableRow()}
                    <tr>
                        <td>Total</td>
                        <td>{totalAmount}</td>
                    </tr>
                    </tbody>
                </table>
            );
        } else {
            return "No Expenses Found";
        }
    }

    renderTableRow() {
        const {expenses} = this.props;
        return expenses.map((expense, index) => {
            return (
                <tr key={index}>
                    <td>
                        {expense.lineItem}
                    </td>
                    <td>
                        {expense.amount}
                    </td>
                </tr>
            );
        });
    };

    render() {
        return (
            <div>
                <div>
                    Monthly Operating Expenses
                </div>
                {this.renderTable()}
            </div>
        );
    }
}

export default Expenses;
