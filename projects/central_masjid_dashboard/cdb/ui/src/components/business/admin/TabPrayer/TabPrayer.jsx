import React, {Component} from "react";
import PrayersMonth from "./PrayersMonth/PrayersMonth";
import ResetPrayerLocation from "./ResetPrayerLocation";
import {Button} from "@material-ui/core";
import {connect} from "react-redux";

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
        const {prayersMonths} = this.state;
        if (prayersMonths && prayersMonths.length > 0) {
            return prayersMonths.map(
                    (prayersMonth, index) => <PrayersMonth prayersMonth={prayersMonth} monthIndex={index} key={index}/>
                );
        } else {
            return <div>Prayers not setup</div>;
        }
    }

    /*
    ✅ Get companyId of logged in user

    Check if existing PrayerConfig exists in Redux store. Load PrayerConfig from redux store if exists

    If PrayerConfig do not exist in redux store then Call Load existing PrayerConfig for a company API.
    GET /api/prayer/{companyId}/config return PrayerConfig

    If found PrayerConfig after API call then update redux store with PrayerConfig.
    Load PrayerConfig from redux store and show on the page

    If existing PrayerConfig are blank then show blank page
     */

    componentDidMount() {
        const companyId = this.props.login.company.id;
        const prayers = this.props.prayerConfig.prayers;


        if (!prayers || prayers.length < 1) {
            console.log("Calling api ", companyId);
        }


    }

    render() {
        console.log(this.props);
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

export default connect(mapStateLoginToProps)(TabPrayer);