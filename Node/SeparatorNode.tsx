import React from "react";
import { Group } from "@visx/group";
import { HierarchyNode } from "./";
 
interface Props {
  node: HierarchyNode;
  onClick?: (id: string) => void;
}

export default function SeparatorNode({ node, onClick }: Props) {
  const width = 15;
  const height = 15;
  const centerX = -width / 2;
  const centerY = -height / 2;
  return (
    <Group top={node.x} left={node.y}>
      <rect
        style={{
          cursor: "pointer"
        }}
        height={height}
        width={width}
        rx="6"
        ry="6"
        y={centerY}
        x={centerX}
        fill="rgb(0,0,0)"
        stroke={"grey"}
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
        style={{ pointerEvents: "none", userSelect: "none" }}
        fill="grey"
      >
        {node.children ? "-" : "+"}
      </text>
    </Group>
  );
}
