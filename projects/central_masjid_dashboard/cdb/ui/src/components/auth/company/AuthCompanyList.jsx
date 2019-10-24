import React, {Component} from "react";
import {Redirect} from "react-router";
import {getAllCompanies} from "../../../services/auth/CompanyListService";
import CompanyGrid from "./CompanyGrid";
import {connect} from "react-redux";
import {prepareCompanyToEdit} from "../../../store/register-company/actions";
import Layout01 from "../../layout/Layout01/Layout01";

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
        this.setState({editCompanyPrepared: true});
    }

    deleteCompany(companyId) {
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
        if (this.state.editCompanyPrepared) {
            return <Redirect to={`${process.env.PUBLIC_URL}/auth/company/view`}/>;
        }

        return (
            <Layout01>
            <div>
                <h3>Company List</h3>
                <CompanyGrid
                    companies={this.state.companies}
                    editCompany={this.editCompany.bind(this)}
                    deleteCompany={this.deleteCompany.bind(this)}/>
            </div>
            </Layout01>
        );
    }
}

export default connect(undefined, {prepareCompanyToEdit})(AuthCompanyList);