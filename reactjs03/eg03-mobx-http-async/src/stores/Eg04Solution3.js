import {observable, configure} from "mobx";

configure({enforceActions: "observed"});
export default class Eg04Solution3 {

    @observable
    users = [];
}