import React, {Component} from "react";
import {
    Checkbox, Link
} from "@material-ui/core";
import ConfirmDialog, {
    createConfirmDialogState,
    createBlankConfirmDialogState
} from "../../common/ConfirmDialog/ConfirmDialog";
import {connect} from "react-redux";
import {mapStateLoginToProps} from "../../../store/lib/utils";

class CompanyGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activateConfirmDialog: createBlankConfirmDialogState(),
            deleteConfirmDialog: createBlankConfirmDialogState()
        };

        this.onChangeActivateCompany = this.onChangeActivateCompany.bind(this);
        this.closeActivateConfirmDialog = this.closeActivateConfirmDialog.bind(this);
        this.onActivateCompany = this.onActivateCompany.bind(this);

        this.onClickDeleteCompany = this.onClickDeleteCompany.bind(this);
        this.closeDeleteConfirmDialog = this.closeDeleteConfirmDialog.bind(this);
        this.onDeleteCompany = this.onDeleteCompany.bind(this);
    }


    onChangeActivateCompany(companyId, companyName, active) {
        const activateConfirmDialog = createConfirmDialogState(
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

    closeActivateConfirmDialog() {
        this.setState({activateConfirmDialog: createBlankConfirmDialogState()});
    }

    onClickDeleteCompany(companyId, companyName) {
        const deleteConfirmDialog = createConfirmDialogState(
            true,
            "Confirm Delete",
            `Are you sure, you want to delete "${companyName}". You will not be able to recover it.`,
            this.closeDeleteConfirmDialog,
            () => this.onDeleteCompany(companyId)
        );
        this.setState({deleteConfirmDialog});
    }

    onDeleteCompany(companyId) {
        this.props.onDeleteCompany(companyId);
        this.closeDeleteConfirmDialog();
    }

    closeDeleteConfirmDialog() {
        this.setState({deleteConfirmDialog: createBlankConfirmDialogState()});
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
                    const selfRow = this.props.login.company.id !== company.id;
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
                                {company.address && (<>
                                    {company.address.street},&nbsp;
                                    <br/>
                                    {company.address.city}&nbsp;
                                    {company.address.state}&nbsp;
                                    {company.address.zip}
                                </>)}
                            </td>
                            <td>
                                <Checkbox color="primary" disabled={!selfRow}
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
                                {selfRow && (<>
                                    &nbsp;|&nbsp;
                                    <a href="#/" onClick={(e) => {
                                        e.preventDefault();
                                        this.onClickDeleteCompany(company.id, company.name);
                                    }}>
                                        Delete
                                    </a>

                                </>)}

                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        );
    }

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
            <ConfirmDialog dialog={this.state.deleteConfirmDialog}/>
            {content}
        </>);
    }
}

export default connect(mapStateLoginToProps)(CompanyGrid);