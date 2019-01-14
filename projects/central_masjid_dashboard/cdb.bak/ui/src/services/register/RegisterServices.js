export const canNotBeOnRegisterFinish = (finishRegister) => {
    return !finishRegister || !finishRegister.email || !finishRegister.companyName;
};
