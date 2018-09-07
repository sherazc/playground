import React, { Component } from 'react';
import './App.css';
import { inject, observer } from 'mobx-react';

@inject('counterStore')
@observer
class App extends Component {
  render() {
    let counterStore = this.props.counterStore;
    return (
      <div className="App">
        <h1>@computed = {counterStore.count}</h1>
        <div>
          <button
            type="button"
            onClick={() => {counterStore.add()}}>
            @action add()
          </button>
          <br/>

          <button
            type="button"
            onClick={() => counterStore.subtract()}>
            @action subtract()
          </button>
          <br/>

          <button
            type="button"
            onClick={() => {counterStore.countData = 5}}>
            @observable countData = 5
          </button>
        </div>
      </div>
    );
  }
}

export default App;
