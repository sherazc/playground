import React, {Component} from "react";
import axios from "axios";

const baseUrl = process.env.REACT_APP_API_BASE_PATH;

class Home extends Component {

    state = this.createInitialState();

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

    render() {
        return (
            <div>
                <h3>Home</h3>
                Select Dashboard
                <select className="form-control">
                    {this.state.companyUrls.map((companyUrl, index) => {
                        return (<option key={index}>{companyUrl.name}</option>);
                    })}
                </select>


            </div>
        );
    }
}


export default Home;
