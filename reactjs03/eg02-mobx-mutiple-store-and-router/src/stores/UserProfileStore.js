import {observable, action, computed} from 'mobx';

class UserProfileStore {
    @observable user = {
        name: "Sheraz",
        age: 20
    };

    @computed get name() {
        return this.user.name;
    }

    @action updateName(name) {
        this.user.name = name;
    }
}
const userProfileStore = new UserProfileStore();

export default userProfileStore;