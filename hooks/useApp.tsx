import React, { Reducer } from "react";
import { Grid } from "../utils/coob";
import {produce} from 'immer';

type AppState = { grid: Grid; rows: number; cols: number };
type InitPayload = { rows: number; cols: number };
type AppActions =
  | { type: "init"; payload: InitPayload }
  | { type: "tap"; payload: { x: number; y: number } }
  | {type: 'removeSet'; payload: string[]};
type AppReducer = (state: AppState, action: AppActions) => AppState;

const appReducer = (state: AppState, action: AppActions): AppState => {
  switch (action.type) {
    case "init":
      return initState(action.payload);
    case "tap":
      return state;
    case "removeSet":
      return state;
  }
  return state;
};
const initState = ({
  rows,
  cols,
}: {
  rows: number;
  cols: number;
}): AppState => ({ grid: [], rows, cols });
const initial = { rows: 4, cols: 4 };
const initialState = initState(initial);

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
  reducer = appReducer,
  initialValue = initial,
  children,
}: {
  initialValue: InitPayload;
  reducer: AppReducer;
  children: React.ReactNode;
}) => {
  const appContextReducer = React.useReducer(
    reducer,
    initialValue,
    initState
  );
  return (
    <AppContext.Provider value={appContextReducer}>
      {children}
    </AppContext.Provider>
  );
};
