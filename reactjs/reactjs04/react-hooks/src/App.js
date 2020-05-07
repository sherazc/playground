import React, {useState} from 'react';
import './App.css';
import Age from './components/Eg00_StateHook/Age';


function App() {
  const [egNum, setEgNum] = useState(0);

  const examples = [
    {name: "State Hook a", component: <Age/>},
    {name: "State Hook b", component: <div>abc</div>}
  ];

  return (
    <div style={{backgroundColor: "gray", padding: "20px"}}>
      <label htmlFor="examples">Examples: </label>
      <select id="examples" onChange={(e) => setEgNum(e.target.value)}>
        {examples.map((example, i) => <option key={i} value={i}>{i} {example.name}</option>)}
      </select>

      <div style={{backgroundColor: "white",
          border: "1px solid black", padding: "20px",
          marginTop: "20px"}}>
      {examples[egNum].component}
      </div>
    </div>
  );
}

export default App;
