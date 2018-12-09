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

    render() {
        return(
            <div>
                <h3>Company List</h3>
                <CompanyGrid companies={this.state.companies}/>
            </div>
        );
    }
}

export default AuthCompanyList;