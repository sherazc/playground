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
import PrayerImportExport from "./PrayerImportExport/PrayerImportExport";
import
    AlertDialog, {
    createBlankAlertDialogState
} from "../../../common/AlertDialog/AlertDialog";
import {makeFieldFieldErrorsUl} from "../../../../services/utilities-react";


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
        this.onEdit = this.onEdit.bind(this);
        this.onSavePrayerConfigResponse = this.onSavePrayerConfigResponse.bind(this)
    }

    setPrayerConfigInState(prayerConfig, dirty) {
        this.props.setAdminPrayerConfigEdit(prayerConfig);
        this.setState({prayerConfigDirty: dirty});
    }

    makePrayerMonths(editMode) {
        const prayers = editMode ? this.props.prayerConfigEdit.prayers : this.props.prayerConfig.prayers;

        let result = (
            <div style={{"fontSize": "18px", "color": "#be6926"}}>
                Prayer times not setup yet. Click RESET PRAYER button to generate new Prayer times.
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
        const prayerConfig = this.props.prayerConfigEdit;
        if (!prayerConfig || !this.props.prayerConfig || !this.props.prayerConfig.id) {
            console.error("Can not save. Invalid PrayerConfig.");
            return;
        }
        prayerConfig.id = this.props.prayerConfig.id;

        prayerConfig.prayers = tabPrayerService.collectPrayersFromDom();

        axios
            .post(`${baseUrl}/api/prayer/config`, prayerConfig)
            .then(response => {
                this.onSavePrayerConfigResponse(prayerConfig, response.data);
                /*
                const serviceResponse = response.data;


                if (serviceResponse) {
                    if (serviceResponse.successful && serviceResponse.target) {
                        this.props.setAdminPrayerConfig(prayerConfig);
                        this.props.setAdminPrayerConfigEdit({});
                    } else if (!serviceResponse.successful
                        && serviceResponse.fieldErrors && serviceResponse.fieldErrors.length) {
                        // TODO: show field errors
                    } else {
                        // TODO: show generic save error message
                    }
                } else {
                    // TODO: No server response error message
                }

                 */
            })
            .catch((error) => console.log("Error occurred", error));
    }

    onSavePrayerConfigResponse(prayerConfig, serviceResponse) {
        let dialog;
        if (!serviceResponse) {
            dialog = this.createErrorMessageDialog("Failed to save", "No server response. Contact support.");
        } else if (serviceResponse.successful && serviceResponse.target) {
            this.props.setAdminPrayerConfig(prayerConfig);
            this.props.setAdminPrayerConfigEdit({});
            dialog = createBlankAlertDialogState();
        } else {
            dialog = this.createErrorMessageDialog("Failed to save", "Invalid prayers.", serviceResponse.fieldErrors);
        }

        this.setState({dialog})
    }

    createErrorMessageDialog(title, descriptionText, fieldErrors) {
        const dialog = {open: true};
        dialog.title = title;
        dialog.onConfirm = () => this.setState({dialog: createBlankAlertDialogState()});
        dialog.description = (<div>
            <p>{descriptionText}</p>
            {makeFieldFieldErrorsUl(fieldErrors)}
        </div>);
        return dialog;
    }

    onSaveDst(dst) {
        const prayerConfig = this.props.prayerConfig;
        if (!prayerConfig) {
            return;
        }

        const companyId = prayerConfig.companyId;
        if (dst.automaticCalculate) {
            dst.beginMonthDate = "";
            dst.endMonthDate = "";
        }

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

    setPrayerConfigDirty(dirty, forceSet) {
        if (forceSet) {
            this.setState({prayerConfigDirty: dirty});
        } else if (this.state.prayerConfigDirty !== dirty) {
            this.setState({prayerConfigDirty: dirty});
        }
    }

    render() {
        const editMode = this.isEditMode();
        return (
            <div>
                <ResetPrayerLocation
                    disabled={editMode}
                    onFinish={this.setPrayerConfigInState}/>
                <Button onClick={this.onEdit}
                        disabled={editMode}
                        variant="outlined" color="primary">
                    Edit
                </Button>
                <PrayerImportExport prayerConfig={this.props.prayerConfig}/>
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
                <AlertDialog dialog={this.state.dialog}/>
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
