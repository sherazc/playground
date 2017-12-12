let now = () => {
    return new Date(Date.now());
}

let fromISO = (isoDateString) => {
    if(!isoDateString) {
        return;
    }
    return new Date(Date.parse(isoDateString));
}

module.exports = {
    now, fromISO
};