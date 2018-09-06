import React, { Component } from 'react';
import './App.css';
import { inject, observer } from 'mobx-react';

@inject('counterStore')
@observer
class App extends Component {
  render() {

    console.log(this.props.counterStore);
    return (
      <div className="App">
        <h1>{this.props.counterStore.count}</h1>
        <div>
          <button type="button" onClick={this.props.counterStore.add}>+</button>
        </div>
      </div>
    );
  }
}

export default App;
