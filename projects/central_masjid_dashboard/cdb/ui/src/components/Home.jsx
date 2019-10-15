import React, {Component} from "react";
import axios from "axios";
import {Redirect} from "react-router";
import AdminNavigation from "./common/navigation/AdminNavigation";

const baseUrl = process.env.REACT_APP_API_BASE_PATH;

class Home extends Component {

    state = this.createInitialState();

    constructor(props) {
        super(props);
        this.onSelectCompany = this.onSelectCompany.bind(this);
    }


    createInitialState() {
        return {
            companies: [],
            selectedCompanyUrl: ""
        };
    }

    componentDidMount() {
        axios.get(`${baseUrl}/api/auth/companies/url`).then(
            response => this.setState({companies: response.data})
        );
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

        return (
            <div>
                <h3>Home</h3>
                Select Dashboard
                <select className="form-control" onChange={this.onSelectCompany}>
                    <option value="">Please select</option>
                    {this.state.companies.map((company, index) => {
                        return (
                            <option key={index} value={company.url}>
                                {company.name}
                            </option>
                        );
                    })}
                </select>
                <br/>
                <a href="/static/rod-widget/index.html">ROD Widget</a>
                <br/>
                <AdminNavigation/>
            </div>
        );
    }
}

export default Home;
