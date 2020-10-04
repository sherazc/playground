
import { CompanyListData, ExpirableVersion, CompanyListVersion } from '../types/types';
import { createExpirableVersion } from './ExpirableVersionService';

const isValidCompanyListData = (companyListData: CompanyListData) => {
    return companyListData && companyListData.companies
        && companyListData.companies.length > 0;
}

const getCompanyListVersionNumber = (companyListData?: CompanyListData):(number | undefined) => {
    if (companyListData
        && companyListData.expirableVersion
        && companyListData.expirableVersion.version) {

        return companyListData.expirableVersion.version;
    }
}

const isCompanyListVersionSame = (c1: CompanyListData, clv: CompanyListVersion) => {
    return c1 && clv
    && c1.expirableVersion
    && c1.expirableVersion.version
    && clv.version
    && c1.expirableVersion.version === clv.version;
}

const createCompanyListData = (): CompanyListData => {
    return {
        companies: [],
        expirableVersion: createExpirableVersion()
    };
}

