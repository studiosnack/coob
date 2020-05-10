import React, { Reducer } from "react";
import { Grid, randomGrid, randomColumn } from "../utils/coob";
import produce from "immer";
import { breakable } from "../utils/grid";

type AppState = { grid: Grid; rows: number; cols: number };
type InitPayload = { rows: number; cols: number };
type AppActions =
  | { type: "init"; payload: InitPayload }
  | { type: "reset" }
  | { type: "tap"; payload: { x: number; y: number } }
  | { type: "removeSet"; payload: string[] };
type AppReducer = (state: AppState, action: AppActions) => AppState;

const appReducer = (state: AppState, action: AppActions): AppState => {
  switch (action.type) {
    case "init":
      return initState(action.payload);
    case "reset":
      return initState({rows: state.rows, cols: state.cols});
    case "tap":
      let { x, y } = action.payload;
      let nullable = breakable(state.grid, x, y);
      if (nullable.length > 1) {
        let nextGrid = produce(state.grid, (draft) => {
          nullable.forEach((point) => {
            let [px, py] = point.split(',').map(Number)
            draft[px][py].state = 'broken';
          });
          for (let i = 0; i < draft.length; i += 1){
            let col = draft[i]
            let filtered = col.filter((block) => block.state !== "broken");
            let newRowCount = state.rows - filtered.length;
            let extras = randomColumn(newRowCount);

            draft[i] = [...extras, ...filtered];
          }
        });
        // console.log(nextGrid)
        return {...state, grid: nextGrid}
      }
      return state;
    case "removeSet":
      return state;
  }
  return state;
};
const initState = ({ cols, rows }: InitPayload): AppState => ({
  grid: randomGrid(rows, cols),
  rows,
  cols,
});
const initial = { rows: 6, cols: 6 };
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
  return selector(state);
  // return React.useMemo(() => selector(state), [state, selector]);
}

export const AppProvider = ({
  reducer = appReducer,
  initialValue = initial,
  children,
}: {
  initialValue?: InitPayload;
  reducer?: AppReducer;
  children?: React.ReactNode;
}) => {
  const appContextReducer = React.useReducer(reducer, initialValue, initState);
  return (
    <AppContext.Provider value={appContextReducer}>
      {children}
    </AppContext.Provider>
  );
};
