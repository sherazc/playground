import React, {Component} from 'react';
import './App.css';
import {inject, observer} from 'mobx-react';

@inject("BirdStore")
@observer
class App extends Component {
    birdInput;

    handleBirdInputChange(event) {
        this.birdInput = event.target.value;
    }

    render() {
        const {BirdStore} = this.props;
        return (
            <div className="App">
                <h2>{BirdStore.birdCount}</h2>
                <input value={this.birdInput} onChange={this.handleBirdInputChange.bind(this)}/>
                <button onClick={() => console.log(this.birdInput)}>Click</button>
            </div>
        );
    }
}

export default App;
