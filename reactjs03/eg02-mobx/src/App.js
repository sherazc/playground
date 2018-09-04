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

    handleSubmit(event) {
        event.preventDefault();
        console.log("Form submitted", this.birdInput);
    }


    render() {
        const {BirdStore} = this.props;
        return (
            <div className="App">
                <h2>{BirdStore.birdCount}</h2>
                <form onSubmit={e => this.handleSubmit(e)}>
                    <input value={this.birdInput} onChange={this.handleBirdInputChange.bind(this)}/>
                    <button type="button" onClick={() => console.log("Button clicked", this.birdInput)}>Click</button>
                </form>
            </div>
        );
    }
}

export default App;
