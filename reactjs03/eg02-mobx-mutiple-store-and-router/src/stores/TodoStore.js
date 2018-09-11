import {observable} from 'mobx';

class TodoStore {
    @observable allTodo = ["one", "two", "three"];
}

export default new TodoStore();