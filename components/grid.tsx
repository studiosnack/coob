import React from 'react'
import {
  Text,
  View,
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { Grid } from "../utils/coob";
import {Color} from '../utils/colors'
import {breakable, getBlockColor} from '../utils/grid'

import {blocksByColor} from '../styles';
// a grid is basically left to right and then bottom to top
// going bottom to top makes it easy to splice a bunch of blocks from 'the bottom'
const Tile = ({
  color,
  x,
  y,
  grid,
}: {
  color: Color;
  x: number;
  y: number;
  grid: Grid;
}) => (
  <TouchableOpacity
    onPress={() => {
      breakable(grid, x, y);
    }}
  >
    <View style={blocksByColor[color]} />
  </TouchableOpacity>
);

export const GridView = ({ grid }: { grid: Grid }) => {
  return (
    <View style={{ flexDirection: "row" }}>
      {grid.map((column, rowIdx) => (
        <View key={rowIdx} style={{ flexDirection: "column", margin: 2 }}>
          {column.map((cube, colIdx) => (
            <Tile
              key={`${rowIdx}${colIdx}`}
              color={getBlockColor(cube)}
              grid={grid}
              x={rowIdx}
              y={colIdx}
            />
          ))}
        </View>
      ))}
    </View>
  );
};
