import constants from "./Constants";
import {observable, configure, action} from "mobx";

configure({enforceActions: "observed"});

export default class Eg01StoreWrongImplementation {

    @observable
    users = [];

    @action
    loadUsers = () => {
        fetch(constants.usersEndpoint)
            .then(response => response.json())
            .then(userData => this.users = userData);
    }
}