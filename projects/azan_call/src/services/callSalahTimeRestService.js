let callSalahTimeRestService = (serviceUrl, successCallBack, errorCallBack) => {
    let errorHandler = (error) => {
        errorCallBack(error);
        console.log(error);
    };
    fetch(serviceUrl)
        .then((response) => response.json(), errorHandler)
        .then((salatTimeObject) => {
            console.log(salatTimeObject)
            successCallBack(salatTimeObject);
        }, errorHandler)
        .catch(errorHandler);
}

module.exports = callSalahTimeRestService;