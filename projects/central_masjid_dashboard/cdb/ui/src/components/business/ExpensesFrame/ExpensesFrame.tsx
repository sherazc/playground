import React, {useState, useEffect} from "react";

import {RouteComponentProps} from "react-router-dom";
import {
    cdbApis,
    CentralControlCompany,
    createEmptyCentralControlCompany, Expense, Fund, Sheet
} from "mdb-core-js";
import {ExpenseSheet} from "../CompanyDashboard/Accounts/ExpenseSheet/ExpenseSheet";
import {filterEnabledItems} from "../../../services/utilities";
import Expenses from "../CompanyDashboard/Accounts/Expenses/Expenses.jsx";
import Funds from "../CompanyDashboard/Accounts/Funds/Funds.jsx";
import styles from "./ExpensesFrame.module.scss"

const baseUrl = process.env.REACT_APP_API_BASE_PATH;
// @ts-ignore
const api = cdbApis(baseUrl);

interface RouterProps {
    companyUrl: string
}

interface Props {
}

export const ExpenseFrame: React.FC<Props & RouteComponentProps<RouterProps>> = ({match}) => {
    const [centralControl, setCentralControl]
        = useState<CentralControlCompany>(createEmptyCentralControlCompany());


    useEffect(() => {
        api.apiCentralControl(match.params.companyUrl)
            .then((cc) => setCentralControl(cc),
                e => console.log("API Error", e))
    }, []);

    useEffect(() => {
        // Send dimension message to parent
        const rootContainer = document.getElementById("expensesRoot");
        if (rootContainer) {
            const width = rootContainer.scrollWidth;
            const height = rootContainer.scrollHeight;
            window.parent.postMessage({"dimensions": {width, height}}, "*");
        }
        // setView(getQueryParam("view"));
    });

    const createLegacyExpensesComponent = (expenses: Expense[]) => {
        if (!expenses || expenses.length < 1) {
            return
        }
        return <div className={styles.box}><Expenses expenses={expenses}/></div>
    }


    const createFundsComponent = (funds: Fund[]) => {
        if (!funds || funds.length < 1) {
            return
        }
        return <Funds funds={funds} fundClassName={styles.box}/>
    }


    const createExpensesComponent = (sheets: Sheet[]) => {
        if (!sheets || sheets.length < 1) {
            return
        }
        return sheets.map((s, i) =>
            <div key={i} className={styles.box}>
                <ExpenseSheet style={{}} expenseSheet={s}/>
            </div>)
    }


    return (
        <div id="expensesRoot" className={styles.container}>
            {createFundsComponent(filterEnabledItems(centralControl.funds))}
            {createLegacyExpensesComponent(filterEnabledItems(centralControl.expenses))}
            {createExpensesComponent(filterEnabledItems(centralControl.expenseSheets))}
        </div>
    );
}
