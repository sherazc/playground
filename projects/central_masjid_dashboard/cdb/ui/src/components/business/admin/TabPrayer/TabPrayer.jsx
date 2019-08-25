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

    makePrayerMonths(editMode) {

        // TODO: Change this logic to update component state instead of redux store
        const prayers = editMode ? this.props.editPrayerConfig.prayers : this.props.prayerConfig.prayers;

        let result = (
            <div>
                Prayers not setup. Click on reset to generate new Prayer times.
            </div>
        );

        if (prayers && prayers.length > 0) {
            const prayersMonths = prayers.reduce(this.prayerReducer, []);
            if (prayersMonths && prayersMonths.length > 0) {
                result = prayersMonths.map(
                    (prayersMonth, index) => {
                        return <PrayersMonth
                            editMode={editMode}
                            prayersMonth={prayersMonth}
                            monthIndex={index}
                            key={index}/>
                    }
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
                .get(`${baseUrl}/api/prayer/config/${companyId}`)
                .then(response => this.props.adminPrayerConfigUpdate(response.data))
                .catch(() => this.props.adminPrayerConfigReset());
        }
    }

    getPrayers() {
        return this.props.prayerConfig.prayers;
    }

    render() {
        const editMode = this.props.editPrayerConfig
            && this.props.editPrayerConfig.prayers
            && this.props.editPrayerConfig.prayers.length > 0;

        return (
            <div>
                <ResetPrayerLocation />

                {editMode &&
                <Button variant="outlined" color="primary">
                    Save
                </Button>
                }
                {!editMode &&
                <Button variant="outlined" color="primary">
                    Edit
                </Button>
                }
                {this.makePrayerMonths(editMode)}

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        login: state.login,
        prayerConfig: state.admin.prayerConfig,
        editPrayerConfig: state.admin.editPrayerConfig
    }
};
const actions = {adminPrayerConfigUpdate, adminPrayerConfigReset};

export default connect(mapStateToProps, actions)(TabPrayer);
/*

add DST in PrayerConfig
    {
        auto: boolean,
        start: date,
        end: date
    }

Load prayers from state.admin.prayerConfig.prayers

Have <ResetPrayerLocation /> pass PrayerConfig to <TabPrayer/>. TabPrayer
will PrayerConfig in its state

if Prayers[] exist in TabPrayer.state then edit mode is On


On TabPrayer.componentWillUnmount()
    - if TabPrayer.state.PrayerConfig exists
    then copy it in redux store as redux.admin.editPrayerConfig


On Edit


On Save
    - set companyId and prayerConfig id in TabPrayer.state.PrayerConfig
    - if DST is on then remove DST from TabPrayer.state.PrayerConfig.prayers
    - send TabPrayer.state.PrayerConfig to API
    - On success response
        - set TabPrayer.state.PrayerConfig as redux.admin.PrayerConfig
        - remove TabPrayer.state.PrayerConfig and redux.admin.editPrayerConfig

On DST

 */