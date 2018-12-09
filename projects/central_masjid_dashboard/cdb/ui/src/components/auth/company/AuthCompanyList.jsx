import React, {Component} from "react";
import {getAllCompanies} from "../../../services/auth/CompanyListService";
import CompanyGrid from "./CompanyGrid";

class AuthCompanyList extends Component {
    constructor(props) {
        super(props);
        this.state = {companies: []};
    }

    componentDidMount() {
        getAllCompanies(this.updateCompaniesList.bind(this));
    }

    updateCompaniesList(companies) {
        this.setState({companies});
    }

    editCompany(companyId) {
        console.log("Edit Company ID", companyId);
    }

    deleteCompany(companyId) {
        console.log("Delete Company ID", companyId);
    }

    render() {
        return(
            <div>
                <h3>Company List</h3>
                <CompanyGrid
                    companies={this.state.companies}
                    editCompany={this.editCompany.bind(this)}
                    deleteCompany={this.deleteCompany.bind(this)}
                />
            </div>
        );
    }
}

export default AuthCompanyList;