import { useMemo, useState } from "react";

export const Home = () => {

  const [itemCount, setItemCount] = useState<number>(10);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const expensiveOperation = (count: number) => {
    console.log("Performing expensive operation");
    
    const items: string[] = [];

    for (let i = 0; i < itemCount; i++) {
      items.push(`Item number ${i + 1}`);
    }
    return items;
  }

  /**
   * because of useMeme() expensiveValue is calculated only
   * when itemCount state is updated. 
   * 
   * expensiveValue will not be calculated when currentDate
   * state is updated.
   */

  const expensiveValue = useMemo(() => expensiveOperation(itemCount), [itemCount]);

  return (
    <div style={{ textAlign: "center" }}>
      Item Count: {itemCount} created on {currentDate.toISOString()}
      <br />
      <button onClick={() => setItemCount(itemCount + 1)}>Increment</button>
      <button onClick={() => setItemCount(itemCount - 1)}>Decrement</button>
      <button onClick={() => setCurrentDate(new Date())}>Update Date</button>
      <hr />
      {expensiveValue.map(s => (<>
        {s}
        <br/>
      </>))}
    </div>
  );
};
