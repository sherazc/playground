import React, {CSSProperties, ReactElement, useEffect, useState} from 'react';
import CloseablePanel from "../../../../common/CloseablePanel/CloseablePanel";
import {Sheet} from "mdb-core-js";
import styles from "./AdminExpenseSheet.module.scss";

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
        const newExpSheets = expSheets.slice(0); // clone array
        newExpSheets[nameIndex[1]][nameIndex[0]] = event.target.value;
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

                {expSheets.map((es, index) => createExpenseSheet(es, index, onChange))}


            </CloseablePanel>

        </div>
    );
}


const createExpenseSheet = (sheet: Sheet, index: number, onChange: (event: React.ChangeEvent<HTMLInputElement>) => void) => {
    return (
        <div>
            <div>
                <h3>Expense sheet 1</h3>
            </div>
            <div>
                Title: <input name={"name_" + index} value={sheet.name} onChange={onChange}/>
            </div>
            <div>
                Description: <input name={"description_" + index} value={sheet.description} onChange={onChange}/>
            </div>
            <div>
                Enable: <input name={"enabled_" + index} type="checkbox" checked={sheet.enabled} />
            </div>
            <div>
                <table>
                    <tbody>
                    <tr>
                        <td>Header</td>
                        <td><input/></td>
                        <td><input/></td>
                        <td><input/></td>
                        <td><input type="checkbox"/></td>
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
                    </tbody>
                </table>
            </div>
            <hr/>
        </div>
    );
}