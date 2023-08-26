import React, {useState, useEffect} from "react";

import {RouteComponentProps} from "react-router-dom";
import {
    CentralControlCompany,
    createEmptyCentralControlCompany
} from "mdb-core-js";

interface RouterProps {
    companyUrl: string
}

interface Props {
}

export const ExpenseFrame: React.FC<Props & RouteComponentProps<RouterProps>> = ({match}) => {
    const [centralControl] = useState<CentralControlCompany>(createEmptyCentralControlCompany());

    return (
        <div>
            Expense Frame {match.params.companyUrl}
        </div>
    );
}