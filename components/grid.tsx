import React from "react";
import {
  Text,
  View,
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";

import { animated, useSpring } from "react-spring/native";

import { Grid, Block } from "../utils/coob";
import { Color } from "../utils/colors";
import { breakable, getBlockColor } from "../utils/grid";

import { blocksByColor } from "./grid.styles";
import { useDispatch } from "../hooks/useApp";
// a grid is basically left to right and then bottom to top
// going bottom to top makes it easy to splice a bunch of blocks from 'the bottom'
const Tile = ({
  color,
  x,
  y,
  grid,
  onTap,
}: {
  color: Color;
  x: number;
  y: number;
  grid: Grid;
  onTap: (x: number, y: number) => any;
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onTap(x, y);
      }}
    >
      <View style={blocksByColor[color]} />
    </TouchableOpacity>
  );
};

export const GridView = ({ grid }: { grid: Grid }) => {
  let dispatch = useDispatch();
  let handleTap = (x: number, y: number) =>
    dispatch({ type: "tap", payload: { x, y } });
  return (
    <View style={{ flexDirection: "row" }}>
      {grid.map((column, rowIdx) => (
        <View key={rowIdx} style={{ flexDirection: "column", margin: 2 }}>
          {column.map((cube, colIdx) => (
            <Tile
              key={cube.id}
              color={getBlockColor(cube)}
              grid={grid}
              x={rowIdx}
              y={colIdx}
              onTap={() => {
                handleTap(rowIdx, colIdx);
              }}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

const AnimatedView = animated(View);

export const PositionedGridView = ({ grid }: { grid: Grid }) => {
  let dispatch = useDispatch();
  let handleTap = (x: number, y: number) =>
    dispatch({ type: "tap", payload: { x, y } });

  let posFor = (x: number, y: number) => {
    let size = 30;
    let padding = 20;
    return [size * x + x * padding, size * y + y * padding];
  };
  return (
    <View style={{ height: 300, overflow: 'hidden' }}>
      {grid.map((column, colIdx) =>
        column.map((cube, rowIdx) => {
          let [xp, yp] = posFor(colIdx, rowIdx);
          return (
            <MovableCube
              key={cube.id}
              xp={xp}
              yp={yp}
              x={colIdx}
              y={rowIdx}
              grid={grid}
              cube={cube}
              onTap={() => {
                handleTap(colIdx, rowIdx);
              }}
            />
          );
        })
      )}
    </View>
  );
};

const MovableCube = ({
  x,
  y,
  xp,
  yp,
  grid,
  cube,
  onTap,
}: {
  x: number;
  y: number;
  xp: number;
  yp: number;
  grid: Grid;
  cube: Block;
  onTap: (x: number, y: number) => any;
}) => {
  let styleProps = useSpring({ xp, yp, from: {yp: -40}});
  return (
    <AnimatedView
      style={{ position: "absolute", top: styleProps.yp, left: styleProps.xp }}
    >
      <Tile color={getBlockColor(cube)} grid={grid} x={x} y={y} onTap={onTap} />
    </AnimatedView>
  );
};
