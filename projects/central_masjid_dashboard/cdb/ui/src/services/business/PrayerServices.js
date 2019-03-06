import axios from "axios";

const baseUrl = process.env.REACT_APP_API_BASE_PATH;

export const geoCodeLocation = (location, handleLatitudeLongitude) => {

    const requestUrl = `${baseUrl}/api/prayer/location/geocode?location=${location}`;

    axios.get(requestUrl).then(response => {
            const geoCode = response.data.target;
            if (response.data.successful && geoCode && geoCode.latitude && geoCode.longitude) {
                handleLatitudeLongitude(geoCode.latitude, geoCode.longitude);
            } else {
                handleLatitudeLongitude(0, 0);
            }
        },
        failResponse => {
            handleLatitudeLongitude(0, 0);
            console.log(failResponse.response.data)
        })
        .catch(errorResponse => {
            handleLatitudeLongitude(0, 0);
            console.log(errorResponse.response.data)
        });
};