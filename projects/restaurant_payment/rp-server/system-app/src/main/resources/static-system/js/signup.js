const validateAccount = () => {
    const bankAccount = document.getElementById("bankAccount").value;
    const submitSignupButton = document.getElementById("submitSignupButton");
};


const onEnterAccountNumber = () => {

    const validateAccountButton = document.getElementById("validateAccountButton");
    const bankAccount = document.getElementById("bankAccount").value;
    if (bankAccount.length > 0) {
        validateAccountButton.disabled = false;
    } else {
        validateAccountButton.disabled = true;
    }
};
