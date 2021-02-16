import React, {Component} from "react";
import axios from "axios";
import Login from "./Login/Login";
import styles from "./Home.module.scss";
import Welcome from "./Welcome/Welcome";
import {getQueryParam} from "../../services/utilities";
import Footer02 from "../layout/Footer02/Footer02";

const baseUrl = process.env.REACT_APP_API_BASE_PATH;

class Home extends Component {

    state = this.createInitialState();

    createInitialState() {
        return {
            companies: [],
            allCompanies: []
        };
    }

    componentDidMount() {
        axios.get(`${baseUrl}/api/auth/companies/url/active`).then(
            response => this.setState({companies: response.data})
        );
        if ("true" === getQueryParam("admin")) {
            axios.get(`${baseUrl}/api/auth/companies/url`).then(
                response => this.setState({allCompanies: response.data})
            );
        }
    }

    render() {
        const {companies, allCompanies} = this.state;

        return (
            <div className={styles.container}>
                <div className={styles.mainBox}>
                    <div className={styles.welcome}>
                        <div className={styles.content}>
                            <div className={styles.contentCenter}>
                                <Welcome companies={companies}/>
                            </div>
                        </div>
                    </div>
                    <div className={styles.login}>
                        <div className={styles.content}>
                            <div className={styles.contentCenter}>
                                <Login companies={allCompanies}/>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer02/>
            </div>
        );
    }
}

export default Home;
