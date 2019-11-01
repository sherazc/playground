import React, {Component} from "react";
import styles from "./Expenses.module.scss"
import {filterEnabledItems} from "../../../../../services/utilities";

class Expenses extends Component {
    renderTable() {
        const expensesAll = this.props.expenses;
        const expenses = filterEnabledItems(expensesAll);

        if(expenses && expenses.length > 0) {
            const totalAmount = expenses.reduce((total, expense) => expense.amount - 0 + total, 0);

            return (

                <table className={styles.grid} style={{margin: "0 auto"}}>
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
                    {this.renderTableRow(expenses)}
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

    renderTableRow(expenses) {
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
            <div className={this.props.className} style={this.props.style}>
                <div className={styles.container}>
                    <div className={`${styles.heading5} ${styles.header}`}>
                        Monthly Operating Expenses
                    </div>
                    <div className={styles.content}>
                        {this.renderTable()}
                    </div>
                </div>
            </div>
        );
    }
}

export default Expenses;
