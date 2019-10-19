import React, {Component} from "react";
import axios from "axios";
import Login from "./Login/Login";
import styles from "./Home.module.scss";
import Welcome from "./Welcome/Welcome";


const baseUrl = process.env.REACT_APP_API_BASE_PATH;

class Home extends Component {

    state = this.createInitialState();

    constructor(props) {
        super(props);
    }

    createInitialState() {
        return {
            companies: []
        };
    }

    componentDidMount() {
        axios.get(`${baseUrl}/api/auth/companies/url`).then(
            response => this.setState({companies: response.data})
        );
    }

    render() {
        const {companies} = this.state;

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
                                <Login companies={companies}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
