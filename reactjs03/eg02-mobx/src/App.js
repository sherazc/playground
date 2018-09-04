import React, {Component} from 'react';
import './App.css';
import {inject, observer} from 'mobx-react';

@inject("BirdStore")
@observer
class App extends Component {
    state = {
        birdInput: ""
    };

    handleBirdInputChange(event) {
        this.setState({
            birdInput: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.addBird();
    }

    addBird() {
        this.props.BirdStore.birds.push(this.state.birdInput);
        this.setState({
            birdInput: ""
        })
    }


    render() {
        const {BirdStore} = this.props;
        return (
            <div className="App">
                <h2>{BirdStore.birdCount}</h2>
                <form onSubmit={e => this.handleSubmit(e)}>
                    <input value={this.state.birdInput} onChange={this.handleBirdInputChange.bind(this)}/>
                    <button type="button" onClick={() => this.addBird()}>Click</button>
                </form>
                <ul>
                    {BirdStore.birds.map((bird, index) => <li key={index}>{bird}</li>)}
                </ul>
            </div>
        );
    }
}

export default App;
