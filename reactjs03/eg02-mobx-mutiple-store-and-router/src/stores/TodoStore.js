import {observable} from 'mobx';

class TodoStore {
    @observable allTodo = ["one", "two", "three"];
}

const todoStore = new TodoStore();

export default todoStore;