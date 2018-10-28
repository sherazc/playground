import axios from "axios";
import history from './app-browse-history';
import {showLoadingAction, hideLoadingAction} from '../store/common/loading'
import {ALERT_ERROR, SHOW_ALERT} from "../store/common/alert/actions";

const DEBUG_INTERCEPTOR = true;

const setupInterceptor = (store) => {
    axios.interceptors.request.use((configs) => {
        store.dispatch(showLoadingAction);
        if (DEBUG_INTERCEPTOR) {
            configs.headers['my_custom_header'] = 'Custom Header Value';
            console.log("Request interceptor headers", configs.headers);
            console.log("Request interceptor body", configs.data);
            console.log("Request interceptor URL", configs.url);
            console.log("Request interceptor method", configs.method);
        }

        // TODO: Use this technique to replace if authentication fails.
        if (configs.url.indexOf("/un-auth") > -1) {
            history.replace("/all-users");
        }
        return configs;
    });


    axios.interceptors.response.use(function (response) {
        if (DEBUG_INTERCEPTOR) {
            console.log("Success response", response);
        }

        store.dispatch(hideLoadingAction);
        return response;
    }, function (error) {
        if (DEBUG_INTERCEPTOR) {
            console.error("error request", error.request);
            console.error("error response", error.response);
        }
        // Do something with response error
        let errorMessage = "Error occurred!";
        if (error.response && error.response.data && error.response.data.message) {
           errorMessage =  error.response.data.message;
        }
        store.dispatch(hideLoadingAction);
        store.dispatch({
            type: SHOW_ALERT,
            payload: {
                show: true,
                type: ALERT_ERROR,
                message: errorMessage
            }
        });
        return Promise.reject(error);
    });

};

export default setupInterceptor;