import axios from "axios";

const baseUrl = process.env.REACT_APP_API_BASE_PATH;

export const geoCodeLocation = (location, handleGeoCode) => {

    const requestUrl = `${baseUrl}/api/prayer/location/geocode?location=${location}`;

    axios.get(requestUrl).then(response => {
            handleGeoCode(response.data.successful, response.data.target);
        },
        failResponse => {
            handleGeoCode(false);
            console.log(failResponse.response)
        })
        .catch(errorResponse => {
            handleGeoCode(false);
            console.log(errorResponse.response)
        });
};


export const callCreatePrayerTimeApi = (companyId, locationConfig, generateIqamah, handleUpdatedPrayerTime) => {
    const requestUrl = `${baseUrl}/api/prayer/config/create?generateIqamah=${generateIqamah}`;

    axios.post(requestUrl, locationConfig).then(response => {
            handleUpdatedPrayerTime(response.data);
        },
        failResponse => {
            handleUpdatedPrayerTime(failResponse.response);
        })
        .catch(errorResponse => {
            handleUpdatedPrayerTime(errorResponse.response);
        });
};