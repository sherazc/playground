import constant from "./Constants"
import {observable, configure} from "mobx";

configure({enforceActions: "observed"});
export default class Eg05Solution4 {

    @observable
    users = [];

    loadUser = function*() {
        const response = yield fetch(constant.usersEndpoint);
        const userData = yield response.json();
        //this.users =
    }
}