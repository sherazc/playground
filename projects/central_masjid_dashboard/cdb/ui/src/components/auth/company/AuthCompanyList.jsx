import React, {Component} from "react";
import {getAllCompanies} from "../../../services/auth/CompanyListService";
import CompanyGrid from "./CompanyGrid";
import {connect} from "react-redux";
import {prepareCompanyToEdit} from "../../../store/register-company/actions";

class AuthCompanyList extends Component {
    constructor(props) {
        super(props);
        this.state = {editCompanyPrepared: false, companies: []};
    }

    componentDidMount() {
        getAllCompanies(this.updateCompaniesList.bind(this));
    }

    updateCompaniesList(companies) {
        this.setState({companies});
    }

    editCompany(companyId) {
        let company = this.findCompanyById(this.state.companies, companyId);
        this.props.prepareCompanyToEdit(company);
        // console.log("Edit Company ID", company);
        this.setState({editCompanyPrepared: true});
    }

    deleteCompany(companyId) {
        console.log("Delete Company ID", companyId);
    }

    findCompanyById(companies, id) {
        let result = null;

        companies.some((element) => {
            if (id === element.id) {
                result = element;
                return true;
            } else {
                return false;
            }
        });
        return result;
    };

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



export default connect(undefined, {prepareCompanyToEdit})(AuthCompanyList);