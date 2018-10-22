import axios from "axios";
import history from './app-browse-history';
import {showLoadingState, hideLoadingState} from '../store/common/loading'
import {SHOW_ALERT} from "../store/common/alert/actions";

const setupInterceptor = (store) => {
    axios.interceptors.request.use((configs) => {
        store.dispatch(showLoadingState);
        configs.headers['my_custom_header'] = 'Custom Header Value';
        console.log("Request interceptor headers", configs.headers);
        console.log("Request interceptor body", configs.data);
        console.log("Request interceptor URL", configs.url);
        console.log("Request interceptor method", configs.method);

        // TODO: Use this technique to replace if authentication fails.
        // if (configs.url.indexOf("/un-auth")) {
        //    history.replace("/all-users");
        // }
        return configs;
    });


    axios.interceptors.response.use(function (response) {
        console.log("response", response);
        store.dispatch(hideLoadingState);
        return response;
    }, function (error) {
        // Do something with response error
        console.log("response error", error);
        store.dispatch(hideLoadingState);
        store.dispatch({
            type: SHOW_ALERT,
                payload: {show: true, type, message}
        });
        return Promise.reject(error);
    });

};

export default setupInterceptor;