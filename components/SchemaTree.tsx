// components/ComponentTree.tsx
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { TreeNode, transformOpenApiToTree } from '../utils/parseSchema';

interface ComponentTreeProps {
  schema: any;
}

const ComponentTree: React.FC<ComponentTreeProps> = ({ schema }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 800;
    const height = 600;
    const margin = { top: 20, right: 120, bottom: 20, left: 120 };

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const root = d3.hierarchy(transformOpenApiToTree(schema, 'AirShoppingRS'));
    const treeLayout = d3.tree<TreeNode>().size([height, width - margin.left - margin.right]);

    const nodes = treeLayout(root);

    svg.selectAll('.link')
      .data(nodes.links())
      .enter().append('path')
      .attr('class', 'link')
      .attr('d', d => `
        M${d.source.y},${d.source.x}
        C${(d.source.y + d.target.y) / 2},${d.source.x}
         ${(d.source.y + d.target.y) / 2},${d.target.x}
         ${d.target.y},${d.target.x}
      `)
      .style('fill', 'none')
      .style('stroke', '#ccc');

    const node = svg.selectAll('.node')
      .data(nodes.descendants())
      .enter().append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.y},${d.x})`);

    node.append('circle')
      .attr('r', 4)
      .style('fill', '#fff')
      .style('stroke', '#000');

    node.append('text')
      .attr('dy', 3)
      .attr('x', d => d.children ? -8 : 8)
      .style('text-anchor', d => d.children ? 'end' : 'start')
      .text(d => d.data.name);

  }, [schema]);

  return <svg ref={svgRef}></svg>;
};

export default ComponentTree;
