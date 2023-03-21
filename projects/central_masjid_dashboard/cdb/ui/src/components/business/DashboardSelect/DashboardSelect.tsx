import React, {useEffect, useState} from "react";
import {CompanyDashboardV2} from "../CompanyDashboardV2/CompanyDashboardV2";
import CompanyDashboard from "../CompanyDashboard/CompanyDashboard";
import {getReactRouterPathParamFromUrl} from "../../../services/utilities";

interface Props {
    // figure out react router types
}

export const DashboardSelect: React.FC<Props> = (props) => {

    const [companyUrl, setCompanyUrl] = useState<String>("");


    useEffect(() => {
        console.log(props)
        const companyDashboardUrl = getReactRouterPathParamFromUrl(props, "companyDashboardUrl");
        setCompanyUrl(companyDashboardUrl);
    }, []);


    return (
        <div>

            Dashboard Select
            <CompanyDashboard companyUrl={companyUrl}/>
            <CompanyDashboardV2 companyUrl={companyUrl}/>
        </div>
    );
}
