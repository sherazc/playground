import React, {Component} from "react";
import {
    Checkbox, Link
} from "@material-ui/core";
import ConfirmDialog, {
    createActivateConfirmDialogState,
    createBlankActivateConfirmDialogState
} from "../../common/ConfirmDialog/ConfirmDialog";

const baseLinkUrl = process.env.PUBLIC_URL;

class CompanyGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activateConfirmDialog: createBlankActivateConfirmDialogState()
        };
        this.onChangeActivateCompany = this.onChangeActivateCompany.bind(this);
        this.closeActivateConfirmDialog = this.closeActivateConfirmDialog.bind(this);
        this.onChangeActivateCompany = this.onChangeActivateCompany.bind(this);
        this.onActivateCompany = this.onActivateCompany.bind(this);
    }

    closeActivateConfirmDialog() {
        const activateConfirmDialog = createBlankActivateConfirmDialogState();
        this.setState({activateConfirmDialog});
    }

    onChangeActivateCompany(companyId, companyName, active) {
        const activateConfirmDialog = createActivateConfirmDialogState(
            true,
            active ? "Confirm Deactivate" : "Confirm Activate",
            `Are you sure, you want to ${active ? "disable" : "enable"} ${companyName}.`,
            this.closeActivateConfirmDialog,
            () => this.onActivateCompany(companyId, !active)
        );
        this.setState({activateConfirmDialog});
    }

    onActivateCompany(companyId, active) {
        this.props.onActivateCompany(companyId, active);
        this.closeActivateConfirmDialog();
    }

    buildCompaniesGrid(companies) {
        return (
            <table border="1">
                <thead>
                <tr>
                    <th>
                        Index
                    </th>
                    <th>
                        Name
                    </th>
                    <th>
                        Dashboard URL
                    </th>
                    <th>
                        Address
                    </th>
                    <th>
                        Active
                    </th>
                    <th>
                        Action
                    </th>
                </tr>
                </thead>
                <tbody>
                {companies.map((company, index) => {
                    return (
                        <tr key={index}>
                            <td>
                                {index + 1}
                            </td>
                            <td>
                                {company.name}
                            </td>
                            <td>
                                <Link href={`${window.location.origin}/${company.url}`} target="_blank">
                                    {`${window.location.origin}/${company.url}`}
                                </Link>
                            </td>
                            <td>
                                {company.address.street},&nbsp;
                                {company.address.city}&nbsp;
                                {company.address.state}&nbsp;
                                {company.address.zip}
                            </td>
                            <td>
                                <Checkbox color="primary"
                                          onChange={() => this.onChangeActivateCompany(company.id, company.name, company.active)}
                                          checked={company.active}/>
                            </td>
                            <td>
                                <a href="#/" onClick={(e) => {
                                    e.preventDefault();
                                    this.props.editCompany(company.id);
                                }}>
                                    View
                                </a>
                                &nbsp;
                                <a href="#/" onClick={(e) => {
                                    e.preventDefault();
                                    this.props.deleteCompany(company.id);
                                }}>
                                    Delete
                                </a>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        );
    };

    render() {
        const companies = this.props.companies;
        let content;
        if (companies && companies.length > 0) {
            content = this.buildCompaniesGrid(companies);
        } else {
            content = <div>No companies found</div>
        }

        return (<>
            <ConfirmDialog dialog={this.state.activateConfirmDialog}/>
            {content}
        </>);
    }
}

export default CompanyGrid;