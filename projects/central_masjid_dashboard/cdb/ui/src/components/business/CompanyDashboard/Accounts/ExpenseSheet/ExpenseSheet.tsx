import React from 'react';
import {Sheet} from 'mdb-core-js';
import styles from "./ExpenseSheet.module.scss";


interface Props {
    expenseSheet: Sheet;
}

export const ExpenseSheet: React.FC<Props> = ({expenseSheet}) => {


    return (
        <div>
            <table className={styles.grid} style={{margin: "0 auto"}}>
                <thead>
                {makeExpenseHeader()}
                </thead>
                <tbody>
                {makeExpenseRow()}
                </tbody>
                <tfoot>
                {makeExpenseFooter()}
                </tfoot>
            </table>

        </div>
    );
}


const makeExpenseHeader = () => {
    return (
        <tr>
            <th>
                Header column 1
            </th>
            <th>
                Header column 2
            </th>
        </tr>
    );
}

const makeExpenseRow = () => {
    return (
        <tr>
            <td>
                Lable 1
            </td>
            <td>
                100
            </td>
        </tr>
    );
}

const makeExpenseFooter = () => {
    return (
        <tr>
            <th>
                footer col 1
            </th>
            <th>
                footer col 2
            </th>
        </tr>
    );
}

