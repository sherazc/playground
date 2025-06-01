import React, { useContext } from "react";
import { CountContext } from "../hook/CountContext";

interface Props { }

export const Component02: React.FC<Props> = (): React.JSX.Element => {
  const { count, setCount } = useContext(CountContext)

  return (
    <div>
      Component 02
      <br />
      {count}
      <br />
      <button onClick={() => setCount(count + 1)}>Add Count</button>
    </div>
  );
};