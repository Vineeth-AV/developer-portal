import React from "react";
import { HierarchyPointNode } from "@visx/hierarchy/lib/types";
import { Group } from "@visx/group";

import { TreeNode } from '@/components/OpenAPITree';

import ParentNode from "./ParentNode";
import RootNode from "./RootNode";
import SeparatorNode from "./SeparatorNode";
 
export type HierarchyNode = HierarchyPointNode<TreeNode>;

interface Props {
  node: HierarchyNode;
  onClick: (id: string) => void;
}

export default function Node({ node, onClick }: Props) {
  const width = 40;
  const height = 20;
  const centerX = -width / 2;
  const centerY = -height / 2;
  const isRoot = node.depth === 0;
  const isParent = !!node.children;
 
   if (isRoot) return <RootNode node={node} />;
  if (isParent) return <ParentNode node={node} />;

  return (
    <Group top={node.x} left={node.y}>
      <rect
        height={height}
        width={width}
        y={centerY}
        x={centerX}
        fill="rgb(0,0,1)"
        stroke="rgb(0,0,0)"
        strokeWidth={1}
        strokeDasharray="2,2"
        strokeOpacity={0.6}
        rx={10}
        onClick={() => {
          onClick?.(node.data.name);
        }}
      />
      <text
        dy=".33em"
        fontSize={9}
        fontFamily="Arial"
        textAnchor="middle"
        fill="rgb(0,1,0)"
        style={{ pointerEvents: "none" }}
      >
        {node.data.name}
      </text>
    </Group>
  );
}
