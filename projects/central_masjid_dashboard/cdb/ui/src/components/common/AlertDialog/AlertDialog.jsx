import React, {Component} from 'react';

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from '@material-ui/core';

class AlertDialog extends Component {

    render() {
        const {dialog} = this.props;
        return (
            <div>
                <Dialog
                    open={dialog.open}
                    // onClose={dialog.onCancel}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">{dialog.title}</DialogTitle>
                    <DialogContent>
                        {dialog.description}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={dialog.onConfirm} color="primary" autoFocus>
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}


const createBlankAlertDialogState = () => {
    return createAlertDialogState(
        false, "", "",
        () => {
        });
};

const createAlertDialogState = (open, title, description, onConfirm) => {
    return {
        open: open,
        title: title,
        description: description,
        onConfirm: onConfirm
    }
};

export {createBlankAlertDialogState, createAlertDialogState};
export default AlertDialog;
