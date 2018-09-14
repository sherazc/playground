import {observable, configure} from "mobx";

configure({enforceActions: "observed"});
export default class Eg05Solution4 {

    @observable
    users = [];
}