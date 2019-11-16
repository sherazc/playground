export const createRandomFunctionName = () => {
    const randomNumber = Math.round(100000 * Math.random());
    return `cb_${randomNumber}`;
};

const createScriptElement = (scriptId, scriptSrc) => {
    const scriptElement = document.createElement("script");
    scriptElement.src = scriptSrc;
    scriptElement.id = scriptId;
    return scriptElement;
};

export const jsonpMain = (callback, jsonpFunctionName, callbackFunctionScriptSrc) => {
    // Create JSONP function
    window[jsonpFunctionName] = (reminderDetail) => {
        callback(reminderDetail);
    };

    // Call JSONP function by adding script to body
    const bodyElement = document.getElementsByTagName("body")[0];
    const jsonpScriptElement = createScriptElement(jsonpFunctionName, callbackFunctionScriptSrc);
    bodyElement.appendChild(jsonpScriptElement);

    // Clean up. Remove JSONP script
    document.getElementById(jsonpFunctionName).remove();
};
