import React, {Component} from "react";
import {Redirect} from "react-router";
import {activateCompany, deleteCompany, getAllCompanies} from "../../../services/auth/CompanyListService";
import CompanyGrid from "./CompanyGrid";
import {connect} from "react-redux";
import {prepareCompanyToEdit} from "../../../store/register-company/actions";
import Layout01 from "../../layout/Layout01/Layout01";
import {isBlank} from "../../../services/utilities";

class AuthCompanyList extends Component {
    constructor(props) {
        super(props);
        this.state = {editCompanyPrepared: false, companies: []};
        this.onActivateCompany = this.onActivateCompany.bind(this);
        this.activateCompanyCallback = this.activateCompanyCallback.bind(this);
        this.updateCompaniesList = this.updateCompaniesList.bind(this);
        this.onDeleteCompany = this.onDeleteCompany.bind(this);
        this.onDeleteCompanyResponse = this.onDeleteCompanyResponse.bind(this);
    }

    componentDidMount() {
        getAllCompanies(this.updateCompaniesList);
    }

    updateCompaniesList(companies) {
        this.setState({companies});
    }

    editCompany(companyId) {
        let company = this.findCompanyById(this.state.companies, companyId);
        this.props.prepareCompanyToEdit(company);
        this.setState({editCompanyPrepared: true});
    }

    onDeleteCompany(companyId) {
        deleteCompany(this.onDeleteCompanyResponse, companyId);
    }

    onDeleteCompanyResponse(serviceResponse) {
        if (serviceResponse && serviceResponse.successful) {
            getAllCompanies(this.updateCompaniesList);
            // TODO show success banner
        } else {
            // TODO show delete banner
        }
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
    }


    onActivateCompany(companyId, active) {
        activateCompany(this.activateCompanyCallback, companyId, active);
    }

    activateCompanyCallback(serviceResponse) {
        if (!serviceResponse.target || isBlank(serviceResponse.target.id)) {
            return;
        }
        const updatedCompany = serviceResponse.target;
        const companies = this.state.companies;
        let foundIndex = -1;
        companies.filter((company, index) => {
            if (company.id === updatedCompany.id) {
                foundIndex = index;
                return true;
            }
            return false;
        });
        if (foundIndex > -1 && foundIndex < companies.length) {
            companies[foundIndex].active = updatedCompany.active;
            this.setState({companies});
        }
    }

    render() {
        if (this.state.editCompanyPrepared) {
            return <Redirect to={`${process.env.PUBLIC_URL}/auth/company/view`}/>;
        }

        return (
            <Layout01>
            <div>
                <h1>Masjid List</h1>
                <CompanyGrid
                    companies={this.state.companies}
                    onActivateCompany={this.onActivateCompany}
                    onDeleteCompany={this.onDeleteCompany.bind(this)}
                    editCompany={this.editCompany.bind(this)}/>
            </div>
            </Layout01>
        );
    }
}

export default connect(undefined, {prepareCompanyToEdit})(AuthCompanyList);