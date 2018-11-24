export const canNotBeOnRegisterUser = (company) => {
    return !company || !company.id;
};

export const canNotBeOnRegisterFinish = (finishRegister) => {
    return !finishRegister || !finishRegister.email || !finishRegister.companyName;
};