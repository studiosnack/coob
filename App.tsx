import * as React from "react";
import {
  Text,
  View,
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Constants from "expo-constants";
import range from "lodash/range";

import { GridView } from "./components/grid";
import {
  AppProvider,
  useSelector,
  useDispatch,
  getState,
} from "./hooks/useApp";

import { Grid, randomGrid } from "./utils/coob";

const ROWS = 4;
const COLS = 4;

const gameGrid = randomGrid(ROWS, COLS);

export default function AppShell() {
  return (
    <AppProvider>
      <View style={styles.container}>
        <App />
      </View>
    </AppProvider>
  );
}

let renderGrid = (grid: Grid) => {
  let height = Math.max(...grid.map((col) => col.length));
  let out = `-=-=-=-=-=-=-=-=-=\n`;
  for(let i=0; i < height; i += 1) {
    out += `${grid.map(col => col[i].color).join(' ')}\n`
  }
  out += `-=-=-=-=-=-=-=-=-=\n`;
  console.log(out)
};

const App = () => {
  const grid = useSelector((state) => state.grid);
  // renderGrid(grid);
  return <GridView grid={grid} />;
};

const styles: { [k: string]: ViewStyle } = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#efefef",
    padding: 8,
  },
});
