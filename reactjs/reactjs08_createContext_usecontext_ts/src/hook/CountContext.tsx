import { createContext, useState } from "react";

/**
 * Step 1.
 * This works like creating a container called MyContext
 * const MyContext = createContext()
 * 
 * 
 * Step 2. 
 * This makes the object passed in value available in all of its children. value could be any object.
 * 
 * <MyContext.Provider value={{key: "value"}}>
 *  <MyChildComponent/>
 * </MyContext.Provider>
 * 
 * 
 * Step 3. 
 * In any of the children components, use below line to get access object passed in <MyContext.Provider value={}>
 * const providerObject = useContext(MyContext)
 */

type CountContextStateType = {
  count: number;
  setCount: (num: number) => void
}

// {count: 0, setCount: () => {}} is passed in instead of undefined so that we
// don't have to do createContext<CountContextStateType|undefined>().
export const CountContext = createContext<CountContextStateType>({
  count: 0, setCount: () => {}});

interface Props {
  children: React.JSX.Element
}

export const CountContextProvider: React.FC<Props> = ({children}): React.JSX.Element => {

  // We will make these 2 values available in the children
  // without passing props
  const [count, setCount] = useState<number>(0); 

  return (
    <CountContext.Provider value={{count: count, setCount: setCount}}>
      {children}
    </CountContext.Provider>
  );
}