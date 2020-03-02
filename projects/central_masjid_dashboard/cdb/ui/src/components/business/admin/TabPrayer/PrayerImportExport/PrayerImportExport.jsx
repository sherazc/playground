import React, {Component} from "react";
import {connect} from "react-redux";
import axios from "axios";

import {
    Button
} from "@material-ui/core";
import {isBlank} from "../../../../../services/utilities";
import
    AlertDialog, {
    createBlankAlertDialogState
} from "../../../../common/AlertDialog/AlertDialog";
import {
    setAdminPrayerConfigEdit
} from "../../../../../store/admin/adminActions";

const baseUrl = process.env.REACT_APP_API_BASE_PATH;
class PrayerImportExport extends Component {
    constructor(props) {
        super(props);
        this.downloadPrayers = this.downloadPrayers.bind(this);
        this.onChangeFile = this.onChangeFile.bind(this);
        this.state = this.createInitialState();
    }

    createInitialState() {
        return {
            dialog: createBlankAlertDialogState(),
            uploadFileText: "",
            uploadFile: ""
        }
    }

    onChangeFile(event) {
        if (!event.target.files || event.target.files.length < 1) {
            console.log("No file selected");
            return;
        }
        this.setState({uploadFile: event.target.files[0]});

        let formData = new FormData();

        formData.append("file", event.target.files[0]);

        axios.post(`${baseUrl}/bulk/prayer/validateImport`, formData,
            {headers: {'Content-Type': 'multipart/form-data'}})
            .then(response => {
                if (response.data) {
                    this.onValidateImport(response.data);
                } else {
                    console.log("Invalid response received.", response);
                }
            }, error => {
                console.log("Failure:", error);
            }).catch(error => {
            console.log("Exception:",error);
        });
    }

    onValidateImport(serviceResponse) {
        let dialog;
        if (serviceResponse.successful) {
            dialog = this.handleImportSuccess(serviceResponse.target);
        } else {
            dialog = this.handleImportError(serviceResponse.fieldErrors);

        }
        this.setState({dialog});
    }

    handleImportSuccess(prayers) {
        const dialog = {open: true};
        dialog.title = "Successfully Imported";
        dialog.onConfirm = () => this.setState({dialog: createBlankAlertDialogState()});
        dialog.description = <>Successfully imported <b>{this.state.uploadFile.name}</b></>;
        const prayerConfigEdit = {...this.props.prayerConfig, prayers: prayers};
        this.props.setAdminPrayerConfigEdit(prayerConfigEdit);
        return dialog;
    }

    handleImportError(fieldErrors) {
        const dialog = {open: true};
        dialog.title = "Import Failed";
        dialog.onConfirm = () => this.setState({dialog: createBlankAlertDialogState()});
        if (fieldErrors) {
            const errorsKvList = this.fieldErrorsToKvList(fieldErrors);
            dialog.description = (<>
                Failed to import <b>{this.state.uploadFile.name}</b>
                <ul>
                {errorsKvList.map((errorKv, index) => <li key={index}><b>{errorKv.key}</b>: {errorKv.value} </li>)}
                </ul>
            </>);
        } else {
            dialog.description = "Failed to import file.";
        }
        return dialog;
    }

    fieldErrorsToKvList(fieldErrors) {
        const kvList = [];
        for(let fieldErrorsKey in fieldErrors) {
            kvList.push({key: fieldErrorsKey, value: fieldErrors[fieldErrorsKey]});
        }
        return kvList;
    }

    downloadPrayers(companyId) {
        if (isBlank(companyId)) {
            console.error("Can not download prayer times. CompanyId is blank");
            return;
        }
        axios({
            url: `${baseUrl}/bulk/prayer/export/${companyId}`,
            method: 'GET',
            responseType: 'blob',
        }).then((response) => {
            const blob = new Blob([response.data], {type: response.data.type});
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            const contentDisposition = response.headers['content-disposition'];
            let fileName = 'unknown';
            if (contentDisposition) {
                const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
                if (fileNameMatch.length === 2)
                    fileName = fileNameMatch[1];
            }
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);

        }, (error) => {
            this.handleDownloadError(error)
        }).catch((exception) => {
            console.log("Exception", exception)
        });
    }

    handleDownloadError(error) {
        if (!error || !error.response || !error.response.data) {
            console.log("Download Error:", error);
            return;
        }
        error.response.data.text().then(text => {
            if (text && text.length > 0) {
                const errorResponse = JSON.parse(text);
                console.log("Failed Response", errorResponse);
            } else {
                console.log("Prayer Download Error", error);
            }
        });
    }

    render() {
        const {prayerConfig} = this.props;
        return (
            <div>
                <hr/>
                <div>
                    <Button onClick={() => {this.setState({uploadFileText: ""})}} variant="outlined" color="primary" component="label">
                        Upload Prayer Times
                        <input
                            accept="text/csv"
                            type="file"
                            value={this.state.uploadFileText}
                            onChange={this.onChangeFile}
                            style={{ display: "none" }}
                        />
                    </Button>
                </div>
                {prayerConfig.prayers && prayerConfig.prayers.length >= 366 && <div>
                    <Button
                        onClick={() => this.downloadPrayers(this.props.prayerConfig.companyId)}
                        variant="outlined" color="primary">Download Prayer Times</Button>
                </div>}
                <hr/>
                <AlertDialog dialog={this.state.dialog}/>
            </div>
        );}
}

const mapStateToProps = state => {
    return {
        prayerConfig: state.admin.prayerConfig
    }
};

const actions = {setAdminPrayerConfigEdit};

export default connect(mapStateToProps, actions)(PrayerImportExport);