import React, {Component} from "react";
import {getAllCompanies} from "../../../services/auth/CompanyListService";

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
                Auth Company List {this.state.companies.length}
            </div>
        );
    }
}

export default AuthCompanyList;