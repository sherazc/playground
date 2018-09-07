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
        if (this.countData) {
            return this.countData;
        } else {
            return "Zero";
        }
    }
}

export default new CounterStore();