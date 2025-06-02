import { useReducer } from "react";

/**
 * useReducer() works just like useState()
 * 
 * The difference is that 
 * - useState()'s set...() function replaces the previous value.
 * - useReducer()'s dispatch() function replaces the previous value based on some action.
 * - useReducer()'s dispatch() function could have several actions based on which
 *   state could be modified into different shape.
 * 
 * 
 * Step 1.
 * create reducer function that takes state and action parameters.
 * 
 * Step 2. 
 * In component that needs state use the useReducer hook
 * const [state, dispatch] = useReducer(myReducer, initialState);
 * 
 * Step 3. 
 * Use the state object where needed.
 * 
 * Step 4.
 * When state needs to be updated use dispatch() function. e.g.
 * dispatch({type:"reset", payload: 333})}
 * 
 */

type MyStateType = {
  count: number;
}

type MyActionType = { type: "increment" }
  | { type: "decrement" }
  | { type: "reset", payload: number };


const myReducer = (state: MyStateType, action: MyActionType): MyStateType => {
  switch(action.type) {
    case "increment": 
      return {...state, count: state.count + 1}
    case "decrement": 
      return {...state, count: state.count - 1}
    case "reset": 
      return {...state, count: action.payload}
    default: return state;
  }
}

const initialState: MyStateType = {count: 222};

export const Home = () => {
  const [state, dispatch] = useReducer(myReducer, initialState);

  return (
    <div style={{ textAlign: "center" }}>
      Count: {state.count}
      <br />
      <button onClick={() => dispatch({type:"increment"})}>Increment</button>
      <button onClick={() => dispatch({type:"decrement"})}>Decrement</button>
      <button onClick={() => dispatch({type:"reset", payload: 333})}>Reset</button>
    </div>
  )
}