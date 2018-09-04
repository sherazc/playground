import {observable, action, computed} from "mobx"
class BirdStore {
    @observable birds = [];


    @action addBird = (bird) => {
        this.birds.push(bird);
    }

    @computed get birdCount() {
        console.log(this.birds);
        return this.birds.lenght;
    }
}

const store = new BirdStore();
export default store;
