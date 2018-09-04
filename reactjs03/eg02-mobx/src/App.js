import React, { Component } from 'react';
import './App.css';
import { inject } from 'mobx-react';

@inject("BirdStore")
class App extends Component {
  render() {
    const {BirdStore} = this.props; 
    return (
      <div className="App">
        <h2>You have {BirdStore.birdCount}</h2>
      </div>
    );
  }
}

export default App;
