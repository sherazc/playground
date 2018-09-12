import constants from "./Constants";
import {observable, configure} from "mobx";

configure({enforceActions: true});
export default class Eg01StoreWrongImplementation {

    @observable
    users = [];

    loadUsers = () => {
        fetch(constants.usersEndpoint)
            .then(response => response.json())
            .then(userData => this.users = userData);
    }
}