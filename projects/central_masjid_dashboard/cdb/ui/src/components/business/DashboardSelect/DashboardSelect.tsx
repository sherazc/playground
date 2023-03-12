import React, {useEffect} from "react";
import {CompanyDashboardV2} from "../CompanyDashboardV2/CompanyDashboardV2";
import CompanyDashboard from "../CompanyDashboard/CompanyDashboard";

interface Props {

}

export const DashboardSelect: React.FC<Props> = (props) => {

    useEffect(() => {
        console.log(props)
    }, [])


    return (
        <div>

            Dashboard Select
            <CompanyDashboard {...props}/>
            <CompanyDashboardV2/>
        </div>
    );
}