import React, {CSSProperties, ReactElement} from 'react';
import CloseablePanel from "../../../../common/CloseablePanel/CloseablePanel";
import {Sheet} from "mdb-core-js";

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
                <div>AdminExpenseSheet</div>
            </CloseablePanel>

        </div>
    );
}