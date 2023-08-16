import React, {CSSProperties, ReactElement} from 'react';
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
    return (
        <div>
            <CloseablePanel
                title="Expense Sheets"
                editMode={true}
                defaultExpanded
                onSave={onSave}
                onCancel={onCancel}>


                <div>
                    <div>
                        <h3>Expense sheet 1</h3>
                    </div>
                    <div>
                        Title: <input/>
                    </div>
                    <div>
                        Description: <input/>
                    </div>
                    <div>
                        Enable: <input type="checkbox"/>
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
                                        onClick={() => {}}
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


            </CloseablePanel>

        </div>
    );
}