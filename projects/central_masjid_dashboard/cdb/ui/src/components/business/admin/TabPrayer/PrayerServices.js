import axios from "axios";

const baseUrl = process.env.REACT_APP_API_BASE_PATH;

export const geoCodeLocation = (location, handleGeoCode) => {

    const requestUrl = `${baseUrl}/api/prayer/location/geocode?location=${location}`;

    axios.get(requestUrl).then(response => {
            handleGeoCode(response.data.successful, response.data.target);
        },
        failResponse => {
            handleGeoCode(false);
            console.log(failResponse.response.data)
        })
        .catch(errorResponse => {
            handleGeoCode(false);
            console.log(errorResponse.response.data)
        });
};


export const updatePrayerLocation = (locationConfig, handlePrayerLocationUpdate) => {
    const requestUrl = `${baseUrl}/api/prayer/location`;

    axios.put(requestUrl).then(response => {
            handlePrayerLocationUpdate(response.data.successful, response.data.target);
        },
        failResponse => {
            handlePrayerLocationUpdate(false);
            console.log(failResponse.response.data)
        })
        .catch(errorResponse => {
            handlePrayerLocationUpdate(false);
            console.log(errorResponse.response.data)
        });
};