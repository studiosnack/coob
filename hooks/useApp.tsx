import React, { Reducer } from "react";
import { Grid } from "../utils/coob";

type AppState = { grid: Grid };
type AppActions = { type: "init" };
type AppReducer = (state: AppState, action: AppActions) => AppState;

const reducer = (state: AppState, action: AppActions): AppState => {
  return state;
};
const AppContext = React.createContext<
  null | [AppState, React.Dispatch<AppActions>]
>(null);

export const useDispatch = (): React.Dispatch<AppActions> => {
  let ctx = React.useContext(AppContext);
  if (!ctx) {
    throw new Error(":(");
  }
  return ctx[1];
};

export const getState = (): AppState => {
  let ctx = React.useContext(AppContext);
  if (!ctx) {
    throw new Error(":(");
  }
  return ctx[0];
};

export function useSelector<T>(selector: (state: AppState) => T): T {
  let state = getState();
  return React.useMemo(() => selector(state), [state, selector]);
}

export const AppProvider = ({
  reducer,
  initialValue,
  children,
}: {
  initialValue: AppState;
  reducer: AppReducer;
  children: React.ReactNode;
}) => {
  const appReducer = React.useReducer(reducer, initialValue);
  return (
    <AppContext.Provider value={appReducer}>{children}</AppContext.Provider>
  );
};
