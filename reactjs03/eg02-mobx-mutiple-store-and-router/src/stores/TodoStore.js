import {observable} from 'mobx';

class TodoStore {
    @observable allTodo = [];
}

export default new TodoStore();