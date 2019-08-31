import React, {Component} from "react";
import PrayersMonth from "./PrayersMonth/PrayersMonth";
import ResetPrayerLocation from "./ResetPrayerConfig/ResetPrayerConfig";
import {Button} from "@material-ui/core";
import {connect} from "react-redux";
import axios from "axios";
import {
    setAdminPrayerConfig,
    setAdminPrayerConfigEdit,
    adminPrayerConfigReset,
} from "../../../../store/admin/adminActions"
import SaveCancel from "./SaveCancel/SaveCancel"

const baseUrl = process.env.REACT_APP_API_BASE_PATH;

class TabPrayer extends Component {

    constructor(props) {
        super(props);
        this.state = this.createInitialState();

    }

    createInitialState() {
        return {prayerConfig: {}, prayerConfigDirty: false}
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
                            key={index}
                            onValueChange={this.onValueChange.bind(this)}/>
                    }
                );
            }
        }
        return result;
    }

    componentDidMount() {
        const companyId = this.props.login.company.id;

        // Set prayers in state if prayers exists in edit prayer config
        let prayers;
        if (!this.prayersExistInPrayerConfig(this.state.prayerConfig)
            && this.prayersExistInPrayerConfig(this.props.prayerConfigEdit)) {
            prayers = this.props.prayerConfigEdit.prayers;
            this.setState({prayerConfig: this.props.prayerConfigEdit});

        }

        if (!prayers && this.prayersExistInPrayerConfig(this.props.prayerConfig)) {
            prayers = this.props.prayerConfig.prayers;
        }

        if (!prayers || prayers.length < 1 || companyId !== this.props.prayerConfig.companyId) {
            axios
                .get(`${baseUrl}/api/prayer/config/${companyId}`)
                .then(response => this.props.setAdminPrayerConfig(response.data))
                .catch(() => this.props.adminPrayerConfigReset());
        }
    }

    componentWillUnmount() {
        if (this.isEditMode()
            && (this.state.prayerConfigDirty || !this.prayersExistInPrayerConfig(this.props.prayerConfigEdit))) {
            this.props.setAdminPrayerConfigEdit(this.state.prayerConfig);
        }

        if (!this.isEditMode() && this.prayersExistInPrayerConfig(this.props.prayerConfigEdit)) {
            this.props.setAdminPrayerConfigEdit({});
        }
    }

    onEdit() {
        this.setState({prayerConfig: this.props.prayerConfig, prayerConfigDirty: false});
    }

    onCancel() {
        this.setState({prayerConfig: {}, prayerConfigDirty: false});
        this.props.setAdminPrayerConfigEdit({});
    }

    onSave() {
        const prayerConfig = this.state.prayerConfig;
        if (!prayerConfig) {
            return;
        }

        prayerConfig.id = this.props.prayerConfig.id;
        prayerConfig.companyId = this.props.login.company.id;
        axios
            .post(`${baseUrl}/api/prayer/config`, prayerConfig)
            .then(response => {
                const serviceResponse = response.data;
                if (serviceResponse && serviceResponse.successful && serviceResponse.target) {
                    this.props.setAdminPrayerConfig(prayerConfig);
                    this.props.setAdminPrayerConfigEdit({});
                    this.setState({prayerConfig: {}, prayerConfigDirty: false});
                }
            })
            .catch((error) => console.log("Error occurred", error));
    }

    onValueChange(event) {
        const dateMonthStringLength = 6;
        const fieldName = event.target.name;
        const fieldValue = event.target.value;

        const fieldNameMonthDate = fieldName.substring(fieldName.length - dateMonthStringLength, fieldName.length);
        const fieldNameSalahName = fieldName.substring(0, fieldName.length - dateMonthStringLength);
        // console.log(fieldName, fieldValue);
        console.log(fieldNameSalahName, fieldNameMonthDate);

        this.state.prayerConfig.prayers.forEach((prayer, index) => {
            // console.log(new Date(prayer.date));

        });

    }

    isEditMode() {
        const prayerConfig = this.state.prayerConfig;
        return prayerConfig && prayerConfig.prayers && prayerConfig.prayers.length > 0;
    }

    prayersExistInPrayerConfig(prayerConfig) {
        return prayerConfig && prayerConfig.prayers && prayerConfig.prayers.length > 0;
    }

    render() {
        const editMode = this.isEditMode();

        return (
            <div>
                <ResetPrayerLocation />
                {this.state.tt}
                <Button onClick={this.onEdit.bind(this)}
                    disabled={editMode}
                    variant="outlined" color="primary">
                    Edit
                </Button>
                {this.makePrayerMonths(editMode)}
                <SaveCancel
                    show={editMode}
                    onSave={this.onSave.bind(this)}
                    onCancel={this.onCancel.bind(this)}
                    saveLabel="Save"
                    cancelLabel="Cancel"/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        login: state.login,
        prayerConfig: state.admin.prayerConfig,
        prayerConfigEdit: state.admin.prayerConfigEdit
    }
};
const actions = {setAdminPrayerConfig, setAdminPrayerConfigEdit, adminPrayerConfigReset};

export default connect(mapStateToProps, actions)(TabPrayer);
/*

✅️ Edit.onClick will copy redux.admin.prayerConfig in TabPrayer.state.PrayerConfig

✅ if TabPrayer.state.PrayerConfig.prayers exist then editMode is On

✅️ On editMode show Save and Cancel button on always show hover bar at the bottom of the screen

✅ On Cancel set TabPrayer.state.PrayerConfig = {}

✅ Load prayers from TabPrayer.state.PrayerConfig.prayers else from redux.admin.prayerConfigEdit.prayers
else from redux.admin.prayerConfig.prayers

Have <ResetPrayerLocation /> pass PrayerConfig to TabPrayer.state.prayerConfig

✅ On TabPrayer.componentWillMount()
    - if redux.admin.prayerConfigEdit exists then set it in TabPrayer.state.PrayerConfig

✅ On TabPrayer.componentWillUnmount()
    - if TabPrayer.state.PrayerConfig exists
    then copy it in redux store as redux.admin.prayerConfigEdit

▶️ On Save
    ✅- set companyId and prayerConfig id in TabPrayer.state.PrayerConfig
    ⏸- if DST is on then remove DST from TabPrayer.state.PrayerConfig.prayers
    ✅- send TabPrayer.state.PrayerConfig to API
    ✅- On success response
        ✅- set TabPrayer.state.PrayerConfig as redux.admin.PrayerConfig
        ✅- remove TabPrayer.state.PrayerConfig and redux.admin.prayerConfigEdit



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