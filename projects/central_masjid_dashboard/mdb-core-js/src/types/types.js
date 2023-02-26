"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadingStatus = exports.createDefaultSettingData = exports.createEmptyCompanyListData = exports.createEmptyCompanyData = void 0;
const createEmptyCompanyData = () => {
    return {
        company: undefined,
        prayer: undefined,
        configurations: [],
        tracker: {},
        prayersYear: undefined
    };
};
exports.createEmptyCompanyData = createEmptyCompanyData;
const createEmptyCompanyListData = () => {
    return {
        companies: [],
        tracker: {}
    };
};
exports.createEmptyCompanyListData = createEmptyCompanyListData;
const createDefaultSettingData = () => {
    return {
        azanAlert: false,
        iqamaAlert: false,
        beforeIqamaAlert: false,
        companyNotification: {
            companyId: "",
            expirationMilliseconds: -1
        }
    };
};
exports.createDefaultSettingData = createDefaultSettingData;
var LoadingStatus;
(function (LoadingStatus) {
    LoadingStatus[LoadingStatus["INIT"] = 0] = "INIT";
    LoadingStatus[LoadingStatus["LOADING"] = 1] = "LOADING";
    LoadingStatus[LoadingStatus["COMPLETE"] = 2] = "COMPLETE";
    LoadingStatus[LoadingStatus["FAILED"] = 3] = "FAILED";
})(LoadingStatus = exports.LoadingStatus || (exports.LoadingStatus = {}));
