export interface ConfirmDialogType {
    open: boolean;
    title: string;
    description: string;
    onCancel: Function;
    onConfirm: Function;
}