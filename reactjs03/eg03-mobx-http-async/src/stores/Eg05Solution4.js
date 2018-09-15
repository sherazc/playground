import constant from "./Constants"
import {
    configure,
    observable,
    flow,
    decorate
} from "mobx";

configure({enforceActions: "observed"});
class Eg05Solution4 {
    users = [];

    loadUsers = flow(function*() {
        const response = yield fetch(constant.usersEndpoint);
        const userData = yield response.json();
        this.users = userData;
    });
}


decorate(Eg05Solution4, {
    users: observable
});

export default Eg05Solution4;