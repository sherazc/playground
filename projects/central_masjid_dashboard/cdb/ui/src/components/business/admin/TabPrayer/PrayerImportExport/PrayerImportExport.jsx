import React, {Component} from "react";
import axios from "axios";

import {
    Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText,
    DialogTitle, FormControl, InputLabel, MenuItem, Select,
    FormControlLabel, Checkbox
} from "@material-ui/core";

class PrayerImportExport extends Component {
    constructor(props) {
        super(props);
        this.downloadPrayers = this.downloadPrayers.bind(this)
    }

    downloadPrayers() {
        axios({
            url: 'http://localhost:8085/bulk/prayer/export/1',
            method: 'GET',
            responseType: 'blob', // important
        }).then((response) => {
            console.log(JSON.stringify(response));
            const blob = new Blob([response.data], {type: response.data.type});
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            const contentDisposition = response.headers['content-disposition'];
            console.log(response.headers);
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
                console.log(errorResponse.message);
            } else {
                console.log("Prayer Download Error:", error);
            }
        });
    }

    render() {
        const {prayerConfig} = this.props;
        return (
            <div>
                Prayer Import Export
                <Button variant="outlined" color="primary">Import</Button>
                {prayerConfig.prayers && prayerConfig.prayers.length >= 366 && <>
                    <Button
                        onClick={this.downloadPrayers}
                        variant="outlined" color="primary">Export</Button>
                </>}
            </div>
        );}
}

export default PrayerImportExport;