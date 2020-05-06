import constants from "./Constants";
import {observable, configure, action} from "mobx";

configure({enforceActions: "observed"});

export default class Eg02Solution1 {
    @observable
    users = [];


    loadUsers = () => {
        fetch(constants.usersEndpoint)
            .then(response => response.json())
            .then(userData => this.setUsers(userData))
    };

    @action
    setUsers = (users) => {
        this.users = users;
    }
}