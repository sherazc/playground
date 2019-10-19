import React, {Component} from "react";
import {Redirect} from "react-router";

class Welcome extends Component {

    constructor(props) {
        super(props);
        this.state = this.createInitialState();
        this.onSelectCompany = this.onSelectCompany.bind(this);
    }

    createInitialState() {
        return {
            selectedCompanyUrl: ""
        };
    }

    onSelectCompany(event) {
        this.setState({
            selectedCompanyUrl: event.target.value
        });
    }

    getRedirectUrl(url) {
        if (url) {
            if (url.startsWith('/')) {
                return `${process.env.PUBLIC_URL}${url.trim()}`;
            } else {
                return `${process.env.PUBLIC_URL}/${url.trim()}`;
            }
        }
    }

    render() {
        const redirectUrl = this.getRedirectUrl(this.state.selectedCompanyUrl);
        if (redirectUrl) {
            return <Redirect to={redirectUrl}/>;
        }

        const {companies} = this.props;

        return (
            <div>
                Select Dashboard
                <select className="form-control" onChange={this.onSelectCompany}>
                    <option value="">Please select</option>
                    {companies.map((company, index) => {
                        return (
                            <option key={index} value={company.url}>
                                {company.name}
                            </option>
                        );
                    })}
                </select>
                <br/>
                <a href="/static/rod-widget/index.html">ROD Widget</a>
            </div>
        );
    }
}

export default Welcome;