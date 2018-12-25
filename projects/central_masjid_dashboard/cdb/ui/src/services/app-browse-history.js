import {createBrowserHistory} from 'history';
import {
    REGISTER_COMPANY_PREPARE_FOR_CREATE,
    REGISTER_COMPANY_USER_PREPARE_FOR_CREATE
} from "../store/register-company/actions";
import store from "../store";

const history = createBrowserHistory();

history.listen((location, action) => {
    if (action !== "PUSH") {
        return;
    }

    if (location.pathname === "/auth/company/create") {
        store.dispatch({type: REGISTER_COMPANY_PREPARE_FOR_CREATE});
    }
    if (location.pathname === "/auth/company/user/create") {
        store.dispatch({type: REGISTER_COMPANY_USER_PREPARE_FOR_CREATE});
    }
});

export default history;