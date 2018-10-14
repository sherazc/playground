import React, {Component} from 'react';

import './App.scss';

class App extends Component {
    render() {
        return (
            <div>
                <div className="theme-1">
                    <div className="container">
                        <div className="left">
                            Left
                        </div>
                        <div className="right">
                            Right
                            <button className="button">Button</button>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="theme-2">
                    <div className="container">
                        <div className="left">
                            Left
                        </div>
                        <div className="right">
                            Right
                            <button className="button">Button</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
