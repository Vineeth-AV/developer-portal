import React from "react";
import { Group } from "@visx/group";
import { HierarchyNode } from "./";
 
interface Props {
  node: HierarchyNode;
  onClick?: (id: string) => void;
}

export default function RootNode({ node, onClick }: Props) {
  const width = 70;
  const height = 35;
  const centerX = -width / 2;
  const centerY = -height / 2;
  return (
    <Group top={node.x} left={node.y}>
      <rect
        height={height}
        width={width}
        rx="6"
        ry="6"
        y={centerY}
        x={centerX}
        stroke="rgb(0,0,1)"
        strokeWidth={1}
        onClick={() => {
          onClick?.(node.data.name);
        }}
      />
      <text
        dy=".33em"
        fontSize={9}
        fontFamily="Arial"
        textAnchor="middle"
        style={{ pointerEvents: "none" }}
       >
        {node.data.name}
      </text>
    </Group>
  );
}
