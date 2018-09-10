import {observable} from 'mobx';

class UserProfileStore {
    @observable user = {
        name: "Sheraz",
        age: 20
    };
}
const userProfileStore = new UserProfileStore();

export default userProfileStore;