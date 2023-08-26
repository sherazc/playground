import React, {useState, useEffect} from "react";

import {RouteComponentProps} from "react-router-dom";
import {
    cdbApis,
    CentralControlCompany,
    createEmptyCentralControlCompany, Expense, Sheet
} from "mdb-core-js";
import {ExpenseSheet} from "../CompanyDashboard/Accounts/ExpenseSheet/ExpenseSheet";
import {filterEnabledItems} from "../../../services/utilities";
import Expenses from "../CompanyDashboard/Accounts/Expenses/Expenses";

const baseUrl = process.env.REACT_APP_API_BASE_PATH;
// @ts-ignore
const api = cdbApis(baseUrl);

interface RouterProps {
    companyUrl: string
}

interface Props {
}

export const ExpenseFrame: React.FC<Props & RouteComponentProps<RouterProps>> = ({match}) => {
    const [centralControl, setCentralControl] = useState<CentralControlCompany>(createEmptyCentralControlCompany());


    useEffect(() => {
        api.apiCentralControl(match.params.companyUrl)
            .then((cc) => setCentralControl(cc),
                e => console.log("API Error", e))
    }, []);


    const createLegacyExpensesComponent = (expenses: Expense[]) => {
        if (!expenses || expenses.length < 1) {
            return
        }
        return <Expenses expenses={expenses}/>
    }


    const createExpensesComponent = (sheets: Sheet[]) => {
        if (!sheets || sheets.length < 1) {
            return
        }
        return sheets.map(s => <ExpenseSheet style={{}} expenseSheet={s}/>)
    }


    return (
        <div>
            {createLegacyExpensesComponent(filterEnabledItems(centralControl.expenses))}
            {createExpensesComponent(filterEnabledItems(centralControl.expenseSheets))}


            {/*{centralControl.expenseSheets && centralControl.expenseSheets.map((s) => <ExpenseSheet expenseSheet={s} style={{}} />)}*/}
        </div>
    );
}