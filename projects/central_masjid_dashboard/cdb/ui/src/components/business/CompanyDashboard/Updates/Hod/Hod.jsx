import React, {Component} from "react";
import axios from "axios";
import "./Hod.scss"

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
        return (
            <div>
                <div className="textRegular">
                    {text}
                </div>
                <div className="textSmall">
                    {reference}
                </div>
            </div>
        );
    }
}

export default Hod;
