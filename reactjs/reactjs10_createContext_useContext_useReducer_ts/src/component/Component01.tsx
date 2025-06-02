import React, { useContext } from "react";

interface Props { }

export const Component01: React.FC<Props> = (): React.JSX.Element => {

  return (
    <div>
      Component 01
      <br />
      <button onClick={() => {}}>Add Count</button>
    </div>
  );
};
