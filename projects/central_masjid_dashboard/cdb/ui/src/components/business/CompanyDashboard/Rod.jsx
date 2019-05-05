import React, {Component} from "react";
import axios from "axios";

const baseUrl = process.env.REACT_APP_API_BASE_PATH;

class Rod extends Component {
    state = this.createInitialState();

    constructor(props) {
        super(props);
    }

    createInitialState() {
        return {
            reminderDetail: {}
        };
    }

    componentDidMount() {
        axios.get(`${baseUrl}/api/rod`).then(
            response => this.setState({
                reminderDetail: response.data
            })
        );
    }

    render() {
        return (
            <div>
            </div>
        );
    }
}

export default Rod;