import React, {Component} from "react";

class CompanyGrid extends Component {
    buildCompaniesGrid(companies) {
        return (
            <table border="1">
                <thead>
                <tr>
                    <th>
                        Index
                    </th>
                    <th>
                        Company ID
                    </th>
                    <th>
                        Name
                    </th>
                    <th>
                        URL
                    </th>
                    <th>
                        Address
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
                                {company.id}
                            </td>
                            <td>
                                {company.name}
                            </td>
                            <td>
                                {company.url}
                            </td>
                            <td>
                                {company.address.street},&nbsp;
                                {company.address.city}&nbsp;
                                {company.address.state}&nbsp;
                                {company.address.zip}
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
        let content = undefined;
        if (companies && companies.length > 0) {
            content = this.buildCompaniesGrid(companies);
        } else {
            content = <div>No companies found</div>
        }

        return content;
    }
};

export default CompanyGrid;