import {Block, Grid} from './coob'
import {Color} from './colors'

export const getBlockColor = (block: Block) => block.color;

export const gridSiblings = (grid: Grid, x: number, y: number): string[] => {
  const nullFilter = (val: string | null): val is string => val != null;

  let siblings = [
    x + 1 >= grid.length ? null : `${x + 1},${y}`, // r
    x - 1 < 0 ? null : `${x - 1},${y}`, // l
    y + 1 >= grid[x].length ? null : `${x},${y + 1}`, // u
    y - 1 < 0 ? null : `${x},${y - 1}`, // d
  ].filter(nullFilter);
  return siblings;
};

export const matchesColor = (color: Color, grid: Grid) => (point: string | null) => {
  if (point) {
    let [x, y] = point.split(",").map(Number);
    return grid[x][y].color === color;
  }
  return false;
};

export const breakable = (grid: Grid, posX: number, posY: number) => {
  let points: Set<string> = new Set();
  points.add(`${posX},${posY}`);
  console.log("points", points);

  let pointColor = grid[posX][posY];
  let siblings = gridSiblings(grid, posX, posY);

  // add matching points to set
  siblings
    .filter(matchesColor(getBlockColor(grid[posX][posY]), grid))
    .forEach((pt) => points.add(pt));

  let shouldLoop = true;
  let pointSize = points.size;
  while (shouldLoop) {
    console.log("loopin");
    console.log(`points(${points.size}).values`, points.values());
    Array.from(points).map((pt) => {
      let [x, y] = pt.split(",").map(Number);
      let newSibs = gridSiblings(grid, x, y).filter(
        matchesColor(getBlockColor(grid[posX][posY]), grid)
      );
      newSibs.forEach((sib) => points.add(sib));
    });

    shouldLoop = pointSize !== points.size;
    pointSize = points.size;
  }
  console.log(`matched`, Array.from(points));
  return Array.from(points);
};
