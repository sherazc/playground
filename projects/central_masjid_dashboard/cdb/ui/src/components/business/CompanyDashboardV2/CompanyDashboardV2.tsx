import React from "react";

interface Props {
    companyUrl: String;
}

export const CompanyDashboardV2: React.FC<Props> = ({companyUrl}) => {


    return (<div>CompanyDashboardV2{companyUrl}</div>);
}