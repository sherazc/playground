import React, {Component} from 'react';

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@material-ui/core';

class ConfirmDialog extends Component {

    render() {
        const {dialog} = this.props;
        return (
            <div>
                <Dialog
                    open={dialog.open}
                    onClose={dialog.onCancel}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">{dialog.title}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {dialog.description}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={dialog.onCancel} color="primary">
                            No
                        </Button>
                        <Button onClick={dialog.onConfirm} color="primary" autoFocus>
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}


const createBlankConfirmDialogState = () => {
    return createConfirmDialogState(
        false, "", "",
        () => {
        },
        () => {
        });
};

const createConfirmDialogState = (open, title, description, onCancel, onConfirm) => {
    return {
        open: open,
        title: title,
        description: description,
        onCancel: onCancel,
        onConfirm: onConfirm
    }
};

export {createBlankConfirmDialogState, createConfirmDialogState};
export default ConfirmDialog;
