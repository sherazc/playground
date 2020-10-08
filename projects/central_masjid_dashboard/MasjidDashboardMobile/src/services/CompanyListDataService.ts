import { Company, CompanyListData, CompanyListVersion } from '../types/types';
import { createOrRefreshExpirableVersion, isExpired } from './ExpirableVersionService';
import store from '../store/rootReducer';
import { END_POINT_COMPANY_LIST_VERSION, END_POINT_COMPANIES_ACTIVE } from './Constants';

const isValidCompanyListData = (companyListData: CompanyListData) => {
    return companyListData && companyListData.companies
        && companyListData.companies.length > 0;
}

const getCompanyListVersionNumber = (companyListData?: CompanyListData): (number | undefined) => {
    if (companyListData
        && companyListData.expirableVersion
        && companyListData.expirableVersion.version) {

        return companyListData.expirableVersion.version;
    }
}

const isCompanyListVersionSame = (cld: CompanyListData, clv: CompanyListVersion) => {
    return cld && clv
        && cld.expirableVersion
        && cld.expirableVersion.version
        && clv.version
        && cld.expirableVersion.version === clv.version;
}

export const isCompanyListDataVersionSame = (c1?: CompanyListData, c2?: CompanyListData) => {
    let c1Version = getCompanyListVersionNumber(c1);
    let c2Version = getCompanyListVersionNumber(c2);
    return c1Version && c2Version && c1Version === c2Version;
}

const createCompanyListData = (): CompanyListData => {
    return {
        companies: [],
        expirableVersion: createOrRefreshExpirableVersion()
    };
}

const refeashCompanyListDataExpirableVersion = (companyListData: CompanyListData) => {
    if (!companyListData) {
        return;
    }
    companyListData.expirableVersion = createOrRefreshExpirableVersion(companyListData.expirableVersion);
}

const updateCompanyListDataState = (companyListData: CompanyListData) => {
    store.dispatch({
        type: "COMPANY_LIST_SET",
        payload: companyListData
    });
}

const apiCompanyListVersion = (): Promise<CompanyListVersion> => {
    console.log("Calling API ", END_POINT_COMPANY_LIST_VERSION);
    return fetch(END_POINT_COMPANY_LIST_VERSION).then(response => response.json());
}

const apiCompaniesActive = (): Promise<Company[]> => {
    console.log("Calling API ", END_POINT_COMPANIES_ACTIVE);
    return fetch(END_POINT_COMPANIES_ACTIVE).then(response => response.json());
}

const refeashCompanyListData = () => {
    const companyListData = createCompanyListData();
    apiCompanyListVersion().then(companyListVersion => {
        if (companyListVersion && companyListVersion.version != null && companyListVersion.version != undefined) {
            if (companyListData.expirableVersion) {
                companyListData.expirableVersion.version = companyListVersion.version;
            }

            apiCompaniesActive().then(companies => {
                companyListData.companies = companies;
                updateCompanyListDataState(companyListData)
            }).catch(e => console.log("Error Getting Company", e));
        }
    }).catch(e => console.log("Error Getting Version", e));
}

export const updateCompanyListData = (companyListData: CompanyListData) => {
    console.log("Attempting update CompanyListData ", companyListData);
    if (isValidCompanyListData(companyListData)) {
        if (isExpired(companyListData.expirableVersion)) {
            apiCompanyListVersion().then(companyListVersion => {
                if (isCompanyListVersionSame(companyListData, companyListVersion)) {
                    refeashCompanyListDataExpirableVersion(companyListData)
                    updateCompanyListDataState(companyListData)
                } else {
                    refeashCompanyListData();
                }
            })
        }
    } else {
        refeashCompanyListData();
    }
}
