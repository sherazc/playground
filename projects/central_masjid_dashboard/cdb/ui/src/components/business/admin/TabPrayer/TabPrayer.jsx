import React, {Component} from "react";
import PrayersMonth from "./PrayersMonth/PrayersMonth";
import ResetPrayerLocation from "./ResetPrayerConfig/ResetPrayerConfig";
import {Button} from "@material-ui/core";
import {connect} from "react-redux";
import axios from "axios";
import {
    adminPrayerConfigUpdate,
    adminPrayerConfigReset
} from "../../../../store/admin/adminActions"

const baseUrl = process.env.REACT_APP_API_BASE_PATH;

class TabPrayer extends Component {

    constructor(props) {
        super(props);
        this.handleUpdatedPrayerTime = this.handleUpdatedPrayerTime.bind(this);
        this.state = {prayersMonths: []};
    }

    handleUpdatedPrayerTime(yearPrayers) {
        const prayersMonths = yearPrayers.reduce(this.prayerReducer, []);
        this.setState({prayersMonths});
    }

    prayerReducer(prayersMonths, prayer) {
        const prayerDate = new Date(prayer.date);
        const monthIndex = prayerDate.getUTCMonth();
        if (!prayersMonths[monthIndex]) {
            prayersMonths[monthIndex] = [];
        }
        prayersMonths[monthIndex].push(prayer);
        return prayersMonths;
    };

    makePrayerMonths() {
        const {prayers} = this.props.prayerConfig;
        let result = (
            <div>
                Prayers not setup. Click on reset to generate new Prayer times.
            </div>
        );
        if (prayers && prayers.length > 0) {
            const prayersMonths = prayers.reduce(this.prayerReducer, []);
            if (prayersMonths && prayersMonths.length > 0) {
                result = prayersMonths.map(
                    (prayersMonth, index) => <PrayersMonth prayersMonth={prayersMonth} monthIndex={index} key={index}/>
                );
            }
        }
        return result;
    }

    componentDidMount() {
        const companyId = this.props.login.company.id;
        const prayers = this.getPrayers();

        if (!prayers || prayers.length < 1 || companyId !== this.props.prayerConfig.companyId) {
            axios
                .get(`${baseUrl}/api/prayer/${companyId}/config`)
                .then(response => this.props.adminPrayerConfigUpdate(response.data))
                .catch(() => this.props.adminPrayerConfigReset());
        }
    }

    getPrayers() {
        return this.props.prayerConfig.prayers;
    }

    render() {
        return (
            <div>
                <ResetPrayerLocation handleUpdatedPrayerTime={this.handleUpdatedPrayerTime}/>
                <Button variant="outlined" color="primary">
                    Save
                </Button>
                {this.makePrayerMonths()}

            </div>
        );
    }
}

const mapStateLoginToProps = state => {return {login: state.login, prayerConfig: state.admin.prayerConfig}};
const actions = {adminPrayerConfigUpdate, adminPrayerConfigReset};

export default connect(mapStateLoginToProps, actions)(TabPrayer);
