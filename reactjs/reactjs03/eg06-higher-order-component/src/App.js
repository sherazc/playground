// https://reactjs.org/docs/higher-order-components.html
import React from 'react';
import './App.css';

const ComponentA = (props) => {
  return (
    <div style={{color: props.fontColor}}>
      Component A
    </div>
  );
};

const ComponentB = (props) => {
  return (
    <div style={{color: props.fontColor}}>
      Component B
    </div>
  );
};

const HigherOrderBoxedComponent = (WrappedComponent) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return(
        <div className="box">
          <WrappedComponent {...this.props}/>
        </div>
      );
    }
  }
};

const ComponentABoxed = HigherOrderBoxedComponent(ComponentA);
const ComponentBBoxed = HigherOrderBoxedComponent(ComponentB);

function App() {
  return (
    <div className="App">
      <ComponentABoxed fontColor="orange"/>
      <ComponentBBoxed fontColor="white"/>
    </div>
  );
}

export default App;
