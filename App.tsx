import * as React from "react";
import {
  Text,
  View,
  Switch,
  Image,
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Constants from "expo-constants";
import range from "lodash/range";
import BlastCubeImage from "./assets/blastcube.png";

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
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Image
            source={BlastCubeImage}
            width={300}
            height={72}
            style={{
              width: 300,
              height: 72,
            }}
          />
        </View>
        <View style={{ flex: 2 }}>
          <App />
        </View>
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
  let dangerModeEnabled = useSelector(
    (state) => state?.config?.dangerMode
  ) as boolean;

  return (
    <React.Fragment>
      {dangerModeEnabled ? null : <GridView grid={grid} />}

      <View style={{ flexDirection: "row", marginTop: 60 }}>
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
              flexBasis: 40,
              height: 20,
              borderRadius: 4,
              padding: 10,
            }}
          >
            <Text style={{ color: "white" }}>reset</Text>
          </View>
        </TouchableOpacity>
        <View>
          <Switch
            value={dangerModeEnabled}
            onValueChange={(newValue) =>
              dispatch({
                type: "setConfig",
                payload: { key: "dangerMode", value: newValue },
              })
            }
          />
        </View>
      </View>
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
