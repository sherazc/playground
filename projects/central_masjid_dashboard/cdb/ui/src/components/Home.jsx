import React, {Component} from "react";
import axios from "axios";
import {Redirect} from "react-router";
import AdminNavigation from "./common/navigation/AdminNavigation";

const baseUrl = process.env.REACT_APP_API_BASE_PATH;

class Home extends Component {

    state = this.createInitialState();

    constructor(props) {
        super(props);
        this.selectDashboard = this.selectDashboard.bind(this);
    }


    createInitialState() {
        return {
            companyUrls: [],
            selectedCompanyUrl: ""
        };
    }

    componentDidMount() {
        axios.get(`${baseUrl}/api/auth/companies/url`).then(
            response => this.setState({companyUrls: response.data})
        );
    }

    selectDashboard(event) {
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
                <select className="form-control" onChange={this.selectDashboard}>
                    <option value="">Please select</option>
                    {this.state.companyUrls.map((companyUrl, index) => {
                        return (
                            <option key={index} value={companyUrl.url}>
                                {companyUrl.name}
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
