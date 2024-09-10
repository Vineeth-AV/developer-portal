import { path as d3Path } from "d3-path";

export function path(l:any) {
  const { x: sy, y: sx } = l.source;
  const { x: ty, y: tx } = l.target;

  const yDiff = sy - ty;

  if (yDiff !== 0) {
    const path = d3Path();
    const radius = 20;

    if (yDiff < 0) {
      path.moveTo(sx, sy);
      path.lineTo(sx, ty - radius);
      path.quadraticCurveTo(sx, ty, sx + radius, ty);
      path.lineTo(tx, ty);

      return path.toString();
    }

    path.moveTo(sx, sy);
    path.lineTo(sx, ty + radius);
    path.quadraticCurveTo(sx, ty, sx + radius, ty);
    path.lineTo(tx, ty);

    return path.toString();
  }

  const path = d3Path();
  path.moveTo(sx, sy);
  path.lineTo(tx, ty);
  return path.toString();
}

export default path;
