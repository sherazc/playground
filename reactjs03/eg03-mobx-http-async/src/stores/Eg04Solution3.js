import constants from "./Constants";
import {observable, configure, runInAction} from "mobx";

configure({enforceActions: "observed"});
export default class Eg04Solution3 {

    @observable
    users = [];

    async loadUsers() {
        const response = await fetch(constants.usersEndpoint);
        const userData = await response.json();
        runInAction(() => this.users = userData);
    }
}