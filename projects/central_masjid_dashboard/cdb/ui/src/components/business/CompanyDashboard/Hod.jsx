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
    render() {
        return (
            <div>
                Hadees
            </div>
        );
    }
}

export default Hod;