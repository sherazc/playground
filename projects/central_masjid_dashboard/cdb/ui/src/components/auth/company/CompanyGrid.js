import React from "react";

const buildCompaniesGrid = (companies) => {
    return (
        <table border="1">
            <thead>
            <tr>
                <th>
                    Name
                </th>
            </tr>
            </thead>
            <tbody>
            {companies.map((company, index) => {
                return (
                    <tr key={index}>
                        <td>
                            {company.name}
                        </td>
                    </tr>
                );
            })}
            </tbody>

        </table>
    );
};

const CompanyGrid = (props) => {
    let content = undefined;
    if (props.companies && props.companies.length > 0) {
        content = buildCompaniesGrid(props.companies);
    } else {
        content = <div>No companies found</div>
    }

    return content;
};

export default CompanyGrid;