import React, {CSSProperties, ReactElement} from 'react';
import {Sheet} from 'mdb-core-js';
import styles from "./ExpenseSheet.module.scss";
import {SheetRow} from "mdb-core-js/dist/types/types";

interface Props {
    expenseSheet: Sheet;
    style: CSSProperties | undefined;
    className?: string | undefined;
}

export const ExpenseSheet: React.FC<Props> = ({expenseSheet, className, style}) => {
    const sortedRows = expenseSheet.rows.sort((s1, s2) => {
        if (s1.order > s2.order) {
            return 1
        } else if (s1.order < s2.order) {
            return -1
        } else {
            return 0;
        }
    })

    return (
        <div className={className} style={style}>
            <div className={styles.container}>
                <div className={`${styles.heading5} ${styles.header}`}>
                    {expenseSheet.name}
                </div>
                <div className={styles.content}>
                    <table className={styles.grid} style={{margin: "0 auto"}}>
                        {makeExpenseHeader(sortedRows)}
                        {makeExpenseRow(sortedRows)}
                        {makeExpenseFooter(sortedRows)}
                    </table>
                </div>
                <div className={styles.footer}>
                    {expenseSheet.description}
                </div>
            </div>
        </div>
    );
}

const makeExpenseHeader = (rows: SheetRow[]) => {
    if (rows.length < 1) {
        return;
    }
    return (
        <thead>
        <tr>
            <th>
                {rows[0].label}
            </th>
            <th>
                {rows[0].value}
            </th>
        </tr>
        </thead>
    );
}

const makeExpenseRow = (rows: SheetRow[]) => {
    if (rows.length < 2) {
        return;
    }
    const rowElements: ReactElement[] = [];
    for (let i = 1; i < rows.length - 1; i++) {
        rowElements.push((
            <tr key={i}>
                <td>
                    {rows[i].label}
                </td>
                <td>
                    {rows[i].value}
                </td>
            </tr>
        ));
    }

    return (
        <tbody>{rowElements}</tbody>
    );
}

const makeExpenseFooter = (rows: SheetRow[]) => {
    if (rows.length < 2) {
        return;
    }
    return (
        <tfoot>
        <tr>
            <td>
                {rows[rows.length - 1].label}
            </td>
            <td>
                {rows[rows.length - 1].value}
            </td>
        </tr>
        </tfoot>
    );
}
