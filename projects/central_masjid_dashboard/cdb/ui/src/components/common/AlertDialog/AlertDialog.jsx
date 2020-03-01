import React, {Component} from 'react';

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@material-ui/core';

class AlertDialog extends Component {
    constructor(props) {
        super(props);
    }

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
                        <DialogContentText id="alert-dialog-description">
                            {dialog.description}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={dialog.onConfirm} color="primary" autoFocus>
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}


const createBlankActivateAlertDialogState = () => {
    return createActivateAlertDialogState(
        false, "", "",
        () => {
        });
};

const createActivateAlertDialogState = (open, title, description, onConfirm) => {
    return {
        open: open,
        title: title,
        description: description,
        onConfirm: onConfirm
    }
};

export {createBlankActivateAlertDialogState, createActivateAlertDialogState};
export default AlertDialog;
