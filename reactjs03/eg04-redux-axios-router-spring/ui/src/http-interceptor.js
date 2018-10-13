import axios from "axios";
import history from './app-browse-history';


const setupInterceptor = () => {
    axios.interceptors.request.use((configs) => {
        configs.headers['my_custom_header'] = 'Custom Header Value';
        console.log("Request interceptor headers", configs.headers);
        console.log("Request interceptor body", configs.data);
        console.log("Request interceptor URL", configs.url);
        console.log("Request interceptor method", configs.method);
        if (configs.url.indexOf("/un-auth")) {
            history.push("/all-users");
        }
        return configs;
    });
};

export default setupInterceptor;