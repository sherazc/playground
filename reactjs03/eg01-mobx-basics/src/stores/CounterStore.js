import {observable, action, computed} from "mobx"

class CounterStore {
    @observable countData = 0;

    @action add() {
        this.countData++;
    }

    @action subtract() {
        this.countData--;
    }

    @computed get count() {
        return this.countData;
    }
}

export default new CounterStore();