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
import SaveCancel from "./SaveCancel/SaveCancel"

const baseUrl = process.env.REACT_APP_API_BASE_PATH;

class TabPrayer extends Component {

    constructor(props) {
        super(props);
        this.state = this.createInitialState();
    }

    createInitialState() {
        return {prayerConfig: {}}
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
        const prayers = editMode ? this.state.prayerConfig.prayers : this.props.prayerConfig.prayers;

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
        const prayers = this.props.prayerConfig.prayers;

        if (!prayers || prayers.length < 1 || companyId !== this.props.prayerConfig.companyId) {
            axios
                .get(`${baseUrl}/api/prayer/config/${companyId}`)
                .then(response => this.props.adminPrayerConfigUpdate(response.data))
                .catch(() => this.props.adminPrayerConfigReset());
        }
    }

    onEdit() {
        this.setState({prayerConfig: this.props.prayerConfig});
    }

    isEditMode() {
        const prayerConfig = this.state.prayerConfig;
        return prayerConfig && prayerConfig.prayers && prayerConfig.prayers.length > 0;
    }

    render() {
        const editMode = this.isEditMode();

        return (
            <div>
                <ResetPrayerLocation />
                <Button onClick={this.onEdit.bind(this)}
                    disabled={editMode}
                    variant="outlined" color="primary">
                    Edit
                </Button>

                {this.makePrayerMonths(editMode)}

                {editMode &&
                    <SaveCancel
                        saveLabel="Save"
                        cancelLabel="Cancel"/>
                }
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

✅️ Edit.onClick will copy redux.admin.prayerConfig in TabPrayer.state.PrayerConfig

✅ if TabPrayer.state.PrayerConfig.prayers exist then editMode is On

▶️ On editMode show Save and Cancel button on always show hover bar at the bottom of the screen

Load prayers from TabPrayer.state.PrayerConfig.prayers else from redux.admin.prayerConfig.prayers

Have <ResetPrayerLocation /> pass PrayerConfig to TabPrayer.state.prayerConfig

On TabPrayer.componentWillMount()
    - if redux.admin.editPrayerConfig exists then set it in TabPrayer.state.PrayerConfig

On TabPrayer.componentWillUnmount()
    - if TabPrayer.state.PrayerConfig exists
    then copy it in redux store as redux.admin.editPrayerConfig

On Save
    - set companyId and prayerConfig id in TabPrayer.state.PrayerConfig
    ⏸ - if DST is on then remove DST from TabPrayer.state.PrayerConfig.prayers
    - send TabPrayer.state.PrayerConfig to API
    - On success response
        - set TabPrayer.state.PrayerConfig as redux.admin.PrayerConfig
        - remove TabPrayer.state.PrayerConfig and redux.admin.editPrayerConfig



-----------------
On DST

add DST in PrayerConfig.java
    {
        auto: boolean,
        start: date,
        end: date
    }

Redefine DST logic

Add DST to toggle (on/off) button in prayer tab

Add auto and custom DST logic



 */