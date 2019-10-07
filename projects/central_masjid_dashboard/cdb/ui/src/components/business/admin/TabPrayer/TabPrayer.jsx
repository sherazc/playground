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
import Dst from "./Dst/Dst";

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
        this.onSave = this.onSave.bind(this);
        this.onSaveDst = this.onSaveDst.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onEdit = this.onEdit.bind(this)
    }

    setPrayerConfigInState(prayerConfig, dirty) {
        this.props.setAdminPrayerConfigEdit(prayerConfig);
        this.setState({prayerConfigDirty: dirty});
    }

    makePrayerMonths(editMode) {
        const prayers = editMode ? this.props.prayerConfigEdit.prayers : this.props.prayerConfig.prayers;

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

        if (this.prayersExistInPrayerConfig(this.props.prayerConfigEdit)) {
            prayers = this.props.prayerConfigEdit.prayers;
            this.setPrayerConfigDirty(true);
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
            this.props.prayerConfig.prayers = tabPrayerService.collectPrayersFromDom();
            this.props.setAdminPrayerConfigEdit(this.props.prayerConfig);
        }

        if (!this.isEditMode() && this.prayersExistInPrayerConfig(this.props.prayerConfigEdit)) {
            this.props.setAdminPrayerConfigEdit({});
        }
    }

    onEdit() {
        this.props.setAdminPrayerConfigEdit(this.props.prayerConfig);
    }

    onCancel() {
        if (this.state.prayerConfigDirty) {
            this.apiGetPrayerConfig(this.props.login.company.id);
        }
        this.props.setAdminPrayerConfigEdit({});
    }

    onSave() {
        const prayerConfig = this.props.prayerConfig;
        if (!prayerConfig) {
            return;
        }

        prayerConfig.prayers = tabPrayerService.collectPrayersFromDom();

        axios
            .post(`${baseUrl}/api/prayer/config`, prayerConfig)
            .then(response => {
                const serviceResponse = response.data;
                if (serviceResponse && serviceResponse.successful && serviceResponse.target) {
                    this.props.setAdminPrayerConfig(prayerConfig);
                    this.props.setAdminPrayerConfigEdit({});
                }
            })
            .catch((error) => console.log("Error occurred", error));
    }

    onSaveDst(dst) {
        const prayerConfig = this.props.prayerConfig;
        if (!prayerConfig) {
            return;
        }

        const companyId = prayerConfig.companyId;

        axios
            .post(`${baseUrl}/api/prayer/config/${companyId}/dst`, dst)
            .then(response => {
                const serviceResponse = response.data;
                if (serviceResponse && serviceResponse.successful && serviceResponse.target) {
                    this.apiGetPrayerConfig(companyId);
                }
            })
            .catch((error) => console.log("Error occurred", error));

    }

    onValueChange(event) {
        /*
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
        */
        this.setPrayerConfigDirty(true);
    }

    isEditMode() {
        const prayerConfig = this.props.prayerConfigEdit;
        return prayerConfig && prayerConfig.prayers && prayerConfig.prayers.length > 0;
    }

    prayersExistInPrayerConfig(prayerConfig) {
        return prayerConfig && prayerConfig.prayers && prayerConfig.prayers.length > 0;
    }

    apiGetPrayerConfig(companyId) {
        axios
            .get(`${baseUrl}/api/prayer/config/${companyId}`)
            .then(response => {
                this.props.setAdminPrayerConfig(response.data);
                this.props.setAdminPrayerConfigEdit({});
                this.setPrayerConfigDirty(false, true);
            })
            .catch(() => this.props.adminPrayerConfigReset());
    }

    setPrayerConfigDirty(dirty, fourceSet) {
        if (fourceSet) {
            this.setState({prayerConfigDirty: dirty});
        } else if (this.state.prayerConfigDirty !== dirty) {
            this.setState({prayerConfigDirty: dirty});
        }
    }

    render() {
        const editMode = this.isEditMode();
        return (
            <div>
                <ResetPrayerLocation onFinish={this.setPrayerConfigInState}/>
                <Button onClick={this.onEdit}
                        disabled={editMode}
                        variant="outlined" color="primary">
                    Edit
                </Button>
                <Dst dst={this.props.prayerConfig.dst}
                     onSaveDst={this.onSaveDst}
                     onCancel={this.onCancel} />
                {this.makePrayerMonths(editMode)}
                <SaveCancel
                    show={editMode}
                    onSave={this.onSave}
                    onCancel={this.onCancel}
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

Testing after removing TabPrayer.state.prayerConfig
===================================================

✅ Edit -> Cancel
✅ Edit -> Switch Tab
✅ Edit -> Change Value -> Cancel
✅ Edit -> Switch Tab -> Cancel
❌ Edit -> Change Value -> Switch Tab -> Cancel

✅ Edit -> Save
✅ Edit -> Change Value -> Save
✅ Edit -> Switch Tab -> Save
✅ Edit -> Change Value -> Switch Tab -> Save

✅ Reset -> Cancel
✅ Reset -> Switch Tab
✅ Reset -> Change Value -> Cancel
❌ Reset -> Switch Tab -> Cancel
❌ Reset -> Change Value -> Switch Tab -> Cancel

✅ Reset -> Change Value -> Save
✅ Reset -> Switch Tab -> Save
✅ Reset -> Change Value -> Switch Tab -> Save

*/

