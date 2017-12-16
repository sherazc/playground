let callSalahTimeRestService = (serviceUrl, successCallBack, errorCallBack) => {
    let errorHandler = (error) => {
        errorCallBack(error);
        console.log(error);
    };

    fetch(serviceUrl)
        .then((response) => response.json(), errorHandler)
        .then((responseJsonBody) => successCallBack(responseJsonBody))
        .catch(errorHandler);
    /*
    fetch(serviceUrl)
        .then((response) => response.json(), errorHandler)
        .then((salatTimeObject) => {
            successCallBack(salatTimeObject);
        }, errorHandler)
        .catch(errorHandler);
        */
}

module.exports = callSalahTimeRestService;