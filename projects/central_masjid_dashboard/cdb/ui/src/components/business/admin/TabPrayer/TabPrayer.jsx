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
import TabPrayerService from "./TabPrayerService";

/**
 * TabPrayer.state.prayerConfig exist only in edit mode.
 * In none editMode prayer grid is built from this.props.prayerConfig.prayers
 *
 * On Save complete
 *
 */

const baseUrl = process.env.REACT_APP_API_BASE_PATH;
const tabPrayerService = new TabPrayerService();

class TabPrayer extends Component {

    constructor(props) {
        super(props);
        this.state = tabPrayerService.createInitialState();
        this.setPrayerConfigInState = this.setPrayerConfigInState.bind(this);
    }

    setPrayerConfigInState(prayerConfig, dirty) {
        this.setState({prayerConfig: prayerConfig, prayerConfigDirty: dirty});
    }

    makePrayerMonths(editMode) {
        const prayers = editMode ? this.state.prayerConfig.prayers : this.props.prayerConfig.prayers;

        let result = (
            <div>
                Prayers not setup. Click on reset to generate new Prayer times.
            </div>
        );

        if (prayers && prayers.length > 0) {
            const prayersMonths = prayers.reduce(tabPrayerService.prayerReducer, []);
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
            this.setPrayerConfigInState(this.props.prayerConfigEdit, true)
        }

        if (!prayers && this.prayersExistInPrayerConfig(this.props.prayerConfig)) {
            prayers = this.props.prayerConfig.prayers;
        }

        if (!prayers || prayers.length < 1 || companyId !== this.props.prayerConfig.companyId) {
            this.apiGetPrayerConfig(companyId);
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
        this.setPrayerConfigInState(this.props.prayerConfig, false);
    }

    onCancel() {
        if (this.state.prayerConfigDirty) {
            this.apiGetPrayerConfig(this.props.login.company.id);
        }

        this.setPrayerConfigInState({}, false);
        this.props.setAdminPrayerConfigEdit({});
    }

    onSave() {
        const prayerConfig = this.state.prayerConfig;
        if (!prayerConfig) {
            return;
        }

        const prayers = tabPrayerService.collectPrayersFromDom();
        console.log(prayers);

        prayerConfig.id = this.props.prayerConfig.id;
        prayerConfig.companyId = this.props.login.company.id;
        axios
            .post(`${baseUrl}/api/prayer/config`, prayerConfig)
            .then(response => {
                const serviceResponse = response.data;
                if (serviceResponse && serviceResponse.successful && serviceResponse.target) {
                    this.props.setAdminPrayerConfig(prayerConfig);
                    this.props.setAdminPrayerConfigEdit({});
                    this.setPrayerConfigInState({}, false);
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

        this.state.prayerConfig.prayers.forEach((prayer) => {
            if (prayer.date.includes(fieldNameMonthDate)) {
                prayer[fieldNameSalahName] = fieldValue;
            }
        });
        this.setPrayerConfigInState(this.state.prayerConfig, true);
    }

    isEditMode() {
        const prayerConfig = this.state.prayerConfig;
        return prayerConfig && prayerConfig.prayers && prayerConfig.prayers.length > 0;
    }

    prayersExistInPrayerConfig(prayerConfig) {
        return prayerConfig && prayerConfig.prayers && prayerConfig.prayers.length > 0;
    }

    apiGetPrayerConfig(companyId) {
        axios
            .get(`${baseUrl}/api/prayer/config/${companyId}`)
            .then(response => this.props.setAdminPrayerConfig(response.data))
            .catch(() => this.props.adminPrayerConfigReset());
    }

    render() {
        const editMode = this.isEditMode();

        return (
            <div>
                <ResetPrayerLocation onFinish={this.setPrayerConfigInState}/>
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
-----------------
DST
===

DST Rules
begins at 2:00 a.m. on the second Sunday of March and
ends at 2:00 a.m. on the first Sunday of November
https://www.nist.gov/pml/time-and-frequency-division/popular-links/daylight-saving-time-dst




add DST in PrayerConfig.java and PrayerConfig.json
    prayerConfig: {
        dst: {
            enable: boolean
            auto: boolean,
            start: date,
            end: date
        }
    }


Create business/admin/TabPrayer/Dst/Dst.jsx

Pass TabPrayer.state.PrayerConfig.dst to Dst.props

Load Dst's setting form from Dst.props.dst

On change Dst.props.dst call TabPrayer.setDstInState()

TabPrayer.setDstInState() will update TabPrayer.state.PrayerConfig.dst
by calling TabPrayer.setPrayerConfigInState(prayerConfig, true)




load Dst.props.prayerConfig.dst in Dst.state
*/

