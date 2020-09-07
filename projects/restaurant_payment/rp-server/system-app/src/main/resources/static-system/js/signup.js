const validateAccount = () => {
    const bankAccount = document.getElementById("bankAccount").value;

    const endpoint = `${window.location.origin}/bank/validate`;
    const bank = {
        company: {},
        active: false,
        stripeAccount: bankAccount
    };

    fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bank),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            handleValidationResponse(data)
        })
        .catch((error) => {
            console.error('Error:', error);
        });
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

const handleValidationResponse = (response) => {
    const submitSignupButton = document.getElementById("submitSignupButton");
    const bankValidStatus = document.getElementById("bankValidStatus");
    if (response && response.successful) {
        submitSignupButton.disabled = false;
        bankValidStatus.innerHTML = "Successfully Validated";
    } else {
        submitSignupButton.disabled = true;
        bankValidStatus.innerHTML = "Validation Failed";
    }
};
