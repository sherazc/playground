import constants from "./Constants";
import {observable, configure, runInAction} from "mobx";

configure({enforceActions: "observed"});
export default class Eg03Solution2 {

    @observable
    users = [];

    loadUsers = () => {
        fetch(constants.usersEndpoint)
            .then(response => response.json())
            .then(userData => runInAction(() => this.users = userData));
    };
}