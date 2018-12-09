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
                        Name
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
                                {index}, &nbsp;
                                {company.id}
                            </td>
                            <td>
                                {company.name}
                            </td>
                            <td>
                                {company.address.street},&nbsp;
                                {company.address.city}&nbsp;
                                {company.address.state}&nbsp;
                                {company.address.zip}
                            </td>
                            <td>
                                <a href="#/" onClick={(e) => e.preventDefault()}>
                                    Edit
                                </a>
                                &nbsp;
                                <a href="#/" onClick={(e) => e.preventDefault()}>
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