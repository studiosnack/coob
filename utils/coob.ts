import range from "lodash/range";
import uniqueId from "lodash/uniqueId";

import { Color } from "./colors";

const colors = [Color.Red, Color.Blue, Color.Yellow, Color.Green];

const randomColor = () => colors[Math.floor(Math.random() * colors.length)];
export const randomBlock = (): Block => ({ color: randomColor(), id: uniqueId("block"), state: undefined })
export const randomColumn = (rows: number) =>
  range(rows).map((x) => (randomBlock()));
export const randomGrid = (rows: number, cols: number) =>
  range(cols).map((col) => randomColumn(rows));

export type Block = { color: Color; id: string; state: undefined | "broken" };
export type GridColumn = Block[];
export type Grid = GridColumn[];
