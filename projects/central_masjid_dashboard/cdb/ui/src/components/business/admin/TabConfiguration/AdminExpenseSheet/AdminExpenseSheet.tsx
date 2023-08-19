import React, {CSSProperties, ReactElement, useEffect, useState} from 'react';
import CloseablePanel from "../../../../common/CloseablePanel/CloseablePanel";
import {Sheet} from "mdb-core-js";
import styles from "./AdminExpenseSheet.module.scss";
import {SheetRow} from "mdb-core-js/dist/types/types";

interface Props {
    expenseSheets: Sheet[],
    onCancel: Function,
    onSave: Function,
    defaultExpanded: boolean
}

// AdminExpenseSheet

export const AdminExpenseSheet: React.FC<Props> = ({expenseSheets, onCancel, onSave, defaultExpanded}) => {
    const [expSheets, setExpSheets] = useState<Sheet[]>([])

    useEffect(() => {
        if (expenseSheets) {
            setExpSheets(expenseSheets);
        } else {
            setExpSheets([]);
        }
    }, [expenseSheets]);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const nameIndex = event.target.name.split("_")
        const fieldName = nameIndex[0];
        const sheetIndex = +nameIndex[1];
        const newExpSheets = expSheets.slice(0); // clone array
        newExpSheets[sheetIndex][fieldName] = event.target.value;
        setExpSheets(newExpSheets);
    }


    const onChangeRowValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        const nameSheetRowIndex = event.target.name.split("_")
        const fieldName = nameSheetRowIndex[0];
        const sheetIndex = +nameSheetRowIndex[1];
        const rowIndex = +nameSheetRowIndex[2];
        const newExpSheets = expSheets.slice(0); // clone array
        newExpSheets[sheetIndex].rows[rowIndex][fieldName] = event.target.value;
        setExpSheets(newExpSheets);
    }


    return (
        <div>
            <CloseablePanel
                title="Expense Sheets"
                editMode={true}
                defaultExpanded
                onSave={onSave}
                onCancel={onCancel}>

                {expSheets.map((es, sheetIndex) => createExpenseSheet(es, sheetIndex, onChange, onChangeRowValue))}

            </CloseablePanel>
        </div>
    );
}


const createExpenseSheet = (sheet: Sheet,
                            sheetIndex: number,
                            onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
                            onChangeRowValue: (event: React.ChangeEvent<HTMLInputElement>) => void) => {
    return (
        <div key={sheetIndex}>
            <div>
                <h3>Expense sheet 1</h3>
            </div>
            <div>
                Title: <input name={"name_" + sheetIndex} value={sheet.name} onChange={onChange}/>
            </div>
            <div>
                Description: <input name={"description_" + sheetIndex} value={sheet.description} onChange={onChange}/>
            </div>
            <div>
                Enable: <input name={"enabled_" + sheetIndex} type="checkbox" checked={sheet.enabled}/>
            </div>
            <div>
                <table>
                    <tbody>
                    <tr>
                        <td>Order</td>
                        <td>Item</td>
                        <td>Value</td>
                        <td>
                        <span
                            style={{cursor: "pointer"}}
                            onClick={() => {
                            }}
                            role="img"
                            aria-label="Add"
                            aria-hidden={true}>
                            ➕
                        </span>
                        </td>
                    </tr>
                    {sheet.rows && sheet.rows.map((sheet, rowIndex) => createRows(
                        sheet, sheetIndex, rowIndex, onChangeRowValue))}
                    </tbody>
                </table>
            </div>
            <hr/>
        </div>
    );
}

const createRows = (row: SheetRow,
                    sheetIndex: number,
                    rowIndex: number,
                    onChangeRowValue: (event: React.ChangeEvent<HTMLInputElement>) => void) => {
    return (
        <tr key={rowIndex}>
            <td><input name={"order_" + sheetIndex + "_" + rowIndex} value={row.order} onChange={onChangeRowValue} type="number" /></td>
            <td><input name={"label_" + sheetIndex + "_" + rowIndex} value={row.label} onChange={onChangeRowValue} /></td>
            <td><input name={"value_" + sheetIndex + "_" + rowIndex} value={row.value} onChange={onChangeRowValue} /></td>
            <td>
                <span
                    style={{cursor: "pointer"}}
                    onClick={() => {
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