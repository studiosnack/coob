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

const ROWS = 6;
const COLS = 6;

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
  for (let i = 0; i < height; i += 1) {
    out += `${grid.map((col) => col[i].color).join(" ")}\n`;
  }
  out += `-=-=-=-=-=-=-=-=-=\n`;
  console.log(out);
};

const App = () => {
  const grid = useSelector((state) => state.grid);
  let dispatch = useDispatch();
  return (
    <React.Fragment>
      <GridView grid={grid} />
      
      <TouchableOpacity
        onPress={() => {
          dispatch({ type: "reset" });
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            // justifyContent: "flex-end",
            backgroundColor: "#85144b",
            width: 100,
            height: 20,
            borderRadius: 4,
            padding: 10,
            marginTop:60,
          }}
        >
          <Text style={{ color: "white" }}>reset</Text>
        </View>
      </TouchableOpacity>
    </React.Fragment>
  );
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
