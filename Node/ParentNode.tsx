import React from "react";
import { Group } from "@visx/group";
import { HierarchyNode } from "./";
import { color, rgb } from "d3";

interface Props {
  node: HierarchyNode;
  onClick?: (id: string) => void;
}

export default function ParentNode({ node, onClick }: Props) {
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
        stroke="rgb(0,0,0)"
        strokeWidth={1}
        onClick={() => {
          onClick?.(node.data.name);
        }}
      />
      <text
        dy=".33em"
        y="-5"
        fontSize={9}
        fontFamily="Arial"
        textAnchor="middle"
        style={{ pointerEvents: "none" }}
        fill="rgb(0,0,0)"
      >
        {node.data.name}
      </text>
      <foreignObject x="-23" y="3" width={60} height={13}>
        <div
          style={{
            margin: 0,
            fontSize: 10,
            lineHeight: 1.1,
            color: "rgb(0,1,0)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"
          }}
        >
          In progress
        </div>
      </foreignObject>
    </Group>
  );
}
