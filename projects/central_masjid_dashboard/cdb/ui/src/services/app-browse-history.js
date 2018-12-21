import { createBrowserHistory } from 'history';
import {REGISTER_COMPANY_PREPARE_FOR_CREATE} from "../store/register-company/actions";
import store from "../store";

const history = createBrowserHistory();

history.listen((location, action) => {
    if (action === "PUSH" && location.pathname === "/auth/company/create") {
        // console.log("Dispatch REGISTER_COMPANY_PREPARE_FOR_CREATE called");
        store.dispatch({type: REGISTER_COMPANY_PREPARE_FOR_CREATE});
    }

    //console.log(location, action);
});

export default history;