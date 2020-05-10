import range from 'lodash/range';
import {Color} from './colors'

const colors = [Color.Red, Color.Blue, Color.Yellow, Color.Green];

const randomColor = () => colors[Math.floor(Math.random() * colors.length)];
export const randomColumn = (rows: number) => range(rows).map((x) => ({ color: randomColor() }));
export const randomGrid = (rows: number, cols: number) => range(cols).map((col) => randomColumn(rows));

export type Block = { color: Color };
export type GridColumn = Block[];
export type Grid = GridColumn[];

