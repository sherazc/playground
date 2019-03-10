export const styles = theme => {
    const formControl = {
        margin: theme.spacing.unit,
            minWidth: 220,
    };
    const selectEmpty = {
        marginTop: theme.spacing.unit * 2,
    };
    const azanOffsetContainer = {
        display: "flex"
    };
    const azanOffset = {
        width: "20%",
        padding: "5px"
    };


    return ({
        azanOffsetContainer, azanOffset,
        formControl, selectEmpty
    });
};