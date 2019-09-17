import React, {Component} from "react";
import axios from "axios";
import styles from "./Hod.module.scss"

const baseUrl = process.env.REACT_APP_API_BASE_PATH;

class Hod extends Component {
    state = this.createInitialState();

    createInitialState() {
        return {
            hadeesDetail: {}
        };
    }

    componentDidMount() {
        axios.get(`${baseUrl}/api/hod`).then(
            response => this.setState({
                hadeesDetail: response.data
            })
        );
    }

    render() {
        const {text, reference} = this.state.hadeesDetail;
        if (!text) {
            return <div>Loading...</div>
        }

        return (
            <div>
                <div className={styles.textRegular}>
                    {text}
                </div>
                <div className={styles.textSmall}>
                    {reference}
                </div>
            </div>
        );
    }
}

export default Hod;
