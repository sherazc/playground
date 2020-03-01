import React, {Component} from "react";
import {connect} from "react-redux";
import axios from "axios";

import {
    Button, Input
} from "@material-ui/core";
import {isBlank} from "../../../../../services/utilities";

const baseUrl = process.env.REACT_APP_API_BASE_PATH;
class PrayerImportExport extends Component {
    constructor(props) {
        super(props);
        this.downloadPrayers = this.downloadPrayers.bind(this);
        this.onChangeFile = this.onChangeFile.bind(this);
    }

    onChangeFile(event) {
        if (!event.target.files || event.target.files.length < 1) {
            console.log("No file selected");
            return;
        }

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
        if (serviceResponse.successful) {
            console.log("Load prayer in redux", serviceResponse.target);
        } else {
            console.log("Show field errors in dialog", serviceResponse.fieldErrors);
        }
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
                    <Button variant="outlined" color="primary" component="label">
                        Upload Prayer Times
                        <input
                            accept="text/csv"
                            type="file"
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
            </div>
        );}
}

const mapStateToProps = state => {
    return {
        login: state.login,
        prayerConfig: state.admin.prayerConfig,
        prayerConfigEdit: state.admin.prayerConfigEdit
    }
};

export default connect(mapStateToProps)(PrayerImportExport);