export const shouldBeOnRegisterUser = (company, addUserFlow) => {
    return addUserFlow || (company && company.id);
};

export const canNotBeOnRegisterFinish = (finishRegister) => {
    return !finishRegister || !finishRegister.email || !finishRegister.companyName;
};
