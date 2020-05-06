import React, {useState} from 'react';
import './App.css';
import Age from './components/Eg02_StateHook/Age';


function App() {
  const [egNum, setEgNum] = useState(0);

  const examples = [
    {name: "State Hook a", component: <Age/>},
    {name: "State Hook b", component: <div>abc</div>}
  ];

  return (
    <div>
      <label htmlFor="examples">Examples: </label>
      <select id="examples" onChange={(e) => setEgNum(e.target.value)}>
        {examples.map((example, i) => <option key={i} value={i}>{i} {example.name}</option>)}
      </select>
      <hr/>
      {examples[egNum].component}
    </div>
  );
}

export default App;
