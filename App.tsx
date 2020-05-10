import * as React from "react";
import { Text, View, ViewStyle, StyleSheet, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import range from "lodash/range";

import {GridView} from './components/grid'
import {Color} from './utils/colors'

import {randomGrid} from './utils/coob'

const ROWS = 4;
const COLS = 4;

const gameGrid = randomGrid(ROWS, COLS);


const colorMap = {
  blue: "#0074D9",
  red: "#FF4136",
  green: "#2ECC40",
  yellow: "#FFDC00",
};


export default function App() {
  const [grid, setGrid] = React.useState(gameGrid);

  return (
    <View style={styles.container}>
      <GridView grid={grid} />
    </View>
  );
}


const styles: {[k: string]: ViewStyle} = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#efefef",
    padding: 8,
  },
  block: {
    width: 30,
    height: 30,
    borderRadius: 4,
    margin: 4,
    flex: 1,
    flexGrow: 1,
    flexBasis: 30,
  },
});

