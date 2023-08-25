import React, {useEffect, useState} from 'react';
import CloseablePanel from "../../../../common/CloseablePanel/CloseablePanel";
import {Sheet} from "mdb-core-js";
// import styles from "./AdminExpenseSheet.module.scss";
import {SheetRow} from "mdb-core-js/dist/types/types";
import {ConfirmDialogType} from "../../../../common/UiTypes";
import ConfirmDialog, {createBlankConfirmDialogState}
    from "../../../../common/ConfirmDialog/ConfirmDialog"

interface Props {
    expenseSheets: Sheet[],
    onCancel: Function,
    onSaveCentralControl: (objectName:string, object:any) => void,
    defaultExpanded: boolean
}

// AdminExpenseSheet

export const AdminExpenseSheet: React.FC<Props> = ({expenseSheets, onCancel, onSaveCentralControl, defaultExpanded}) => {
    const [expSheets, setExpSheets]
        = useState<Sheet[]>([]);
    const [confirmDialog, setConfirmDialog]
        = useState<ConfirmDialogType>(createBlankConfirmDialogState());

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

    const onChangeTextArea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const nameIndex = event.target.name.split("_")
        const fieldName = nameIndex[0];
        const sheetIndex = +nameIndex[1];
        const newExpSheets = expSheets.slice(0); // clone array
        newExpSheets[sheetIndex][fieldName] = event.target.value;
        setExpSheets(newExpSheets);
    }

    const onChangeChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
        const nameIndex = event.target.name.split("_")
        const fieldName = nameIndex[0];
        const sheetIndex = +nameIndex[1];
        const newExpSheets = expSheets.slice(0); // clone array
        newExpSheets[sheetIndex][fieldName] = event.target.checked;
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

    const onAddExpenseSheet = () => {
        const newExpSheets = expSheets.slice(0); // clone array
        const newSheet: Sheet = {rows: [], name: "", description: "", enabled: false}
        newExpSheets.push(newSheet);
        setExpSheets(newExpSheets);
    }

    const onDeleteExpenseSheet = (sheetIndex: number) => {
        const selectedSheet = expSheets[sheetIndex];
        const newConfirmDialog: ConfirmDialogType = {
            open: true,
            onCancel: resetConfirmDialog,
            onConfirm: () => onDeleteExpenseSheetConfirm(sheetIndex),
            title: "Delete Expense Sheet " + (sheetIndex + 1),
            description: `Are you sure you want to delete expense sheet ${selectedSheet.name}.`

        }
        setConfirmDialog(newConfirmDialog);
    }

    const onDeleteExpenseSheetConfirm = (sheetIndex: number) => {
        const newExpenseSheet = expSheets.slice(0); // clone array
        newExpenseSheet.splice(sheetIndex, 1); // remove element by index
        setExpSheets(newExpenseSheet);
        resetConfirmDialog();
    }

    const onAddSheetRow = (sheetIndex: number) => {
        const sheetRow: SheetRow = {
            value: "", label: "", order: 0
        }
        const newExpenseSheet = expSheets.slice(0); // clone array
        newExpenseSheet[sheetIndex].rows.push(sheetRow);
        setExpSheets(newExpenseSheet);
    }

    const onDeleteSheetRow = (sheetIndex: number, rowIndex: number) => {
        const newExpenseSheet = expSheets.slice(0); // clone array
        newExpenseSheet[sheetIndex].rows.splice(rowIndex, 1);
        setExpSheets(newExpenseSheet);
    }

    const resetConfirmDialog = () => {
        setConfirmDialog(createBlankConfirmDialogState());
    }


    const createExpenseSheet = (sheet: Sheet, sheetIndex: number) => {
        return (
            <div key={sheetIndex}>
                <div>
                    <h3>Expense sheet {sheetIndex + 1}</h3>
                    <button onClick={() => onDeleteExpenseSheet(sheetIndex)}>
                        ❌ Delete Expense sheet {sheetIndex + 1}
                    </button>
                </div>
                <div>
                    Title: <input name={"name_" + sheetIndex} value={sheet.name} onChange={onChange}/>
                </div>
                <div>
                    Description: <textarea name={"description_" + sheetIndex} value={sheet.description}
                                        onChange={onChangeTextArea}/>
                </div>
                <div>
                    Enable: <input name={"enabled_" + sheetIndex} type="checkbox" checked={sheet.enabled}
                                   onChange={onChangeChecked}/>
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
                            onClick={() => onAddSheetRow(sheetIndex)}
                            role="img"
                            aria-label="Add"
                            aria-hidden={true}>
                            ➕
                        </span>
                            </td>
                        </tr>
                        {sheet.rows && sheet.rows.map((sheet, rowIndex) => createRows(
                            sheet, sheetIndex, rowIndex))}
                        </tbody>
                    </table>
                </div>
                <hr/>
            </div>
        );
    }

    const createRows = (row: SheetRow, sheetIndex: number, rowIndex: number) => {
        return (
            <tr key={rowIndex}>
                <td><input name={"order_" + sheetIndex + "_" + rowIndex} value={row.order} onChange={onChangeRowValue}
                           type="number"/></td>
                <td><input name={"label_" + sheetIndex + "_" + rowIndex} value={row.label} onChange={onChangeRowValue}/>
                </td>
                <td><input name={"value_" + sheetIndex + "_" + rowIndex} value={row.value} onChange={onChangeRowValue}/>
                </td>
                <td>
                <span
                    style={{cursor: "pointer"}}
                    onClick={() => onDeleteSheetRow(sheetIndex, rowIndex)}
                    role="img"
                    aria-label="Delete"
                    aria-hidden={true}>
                ❌
                </span>
                </td>
            </tr>
        );
    }

    return (
        <div>
            <CloseablePanel
                title="Expense Sheets"
                editMode={true}
                defaultExpanded
                onSave={() => onSaveCentralControl("expenseSheets", expSheets)}
                onCancel={onCancel}>
                <div>
                    <div>
                        {expSheets.map((es, sheetIndex) => createExpenseSheet(es, sheetIndex))}
                    </div>
                    <div>
                        <button onClick={onAddExpenseSheet}>
                            ➕ Add Expense Sheet
                        </button>
                    </div>
                </div>
            </CloseablePanel>
            {confirmDialog && <ConfirmDialog dialog={confirmDialog}/>}
        </div>
    );
}
