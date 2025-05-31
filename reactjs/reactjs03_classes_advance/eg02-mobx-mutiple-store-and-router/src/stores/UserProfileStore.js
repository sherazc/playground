import {observable} from 'mobx';

class UserProfileStore {
    @observable user = {
        name: "Sheraz",
        age: 20
    };
}

export default new UserProfileStore();