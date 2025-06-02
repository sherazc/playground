
export type CountStateType = { count: number };

export type CountActionType = { type: "increment" } | { type: "decrement" }

export const countReducer = (countState: CountStateType, action: CountActionType): CountStateType => {
  switch (action.type) {
    case "increment": return { count: countState.count + 1 }
    case "decrement": return { count: countState.count - 1 }
    default: return countState;
  }
}