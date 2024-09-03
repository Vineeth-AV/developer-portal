// import React, { useEffect, useState } from 'react';
// import { Group } from '@visx/group';
// import { hierarchy, Tree } from '@visx/hierarchy';
// import { LinearGradient } from '@visx/gradient';
// import { pointRadial } from 'd3-shape';
// import useForceUpdate from './useForceUpdate'; // Adjust path as needed
// import LinkControls from './LinkControls'; // Adjust path as needed
// import getLinkComponent from './getLinkComponent';
// import * as yaml from 'js-yaml'; // Import js-yaml

// interface TreeNode {
//   name: string;
//   isExpanded?: boolean;
//   children?: TreeNode[];
// }

// const defaultMargin = { top: 30, left: 30, right: 30, bottom: 70 };

// export type LinkTypesProps = {
//   width: number;
//   height: number;
//   margin?: { top: number; right: number; bottom: number; left: number };
// };

// const OpenAPITreeYaml = ({
//   width: totalWidth,
//   height: totalHeight,
//   margin = defaultMargin,
// }: LinkTypesProps) => {
//   const [data, setData] = useState<TreeNode>({ name: 'Loading...', children: [] });
//   const [layout, setLayout] = useState<string>('cartesian');
//   const [orientation, setOrientation] = useState<string>('horizontal');
//   const [linkType, setLinkType] = useState<string>('step');
//   const [stepPercent, setStepPercent] = useState<number>(0.1);
//   const forceUpdate = useForceUpdate();

//   useEffect(() => {
//     fetch('/data.yaml') // Fetch YAML file
//       .then((response) => response.text())
//       .then((yamlText) => {
//         const openapi = yaml.load(yamlText); // Parse YAML to JSON
//         const treeData = transformOpenAPIToTree(openapi);
//         setData(treeData);
//       });
//   }, []);

//   const transformOpenAPIToTree = (openapi: any): TreeNode => {
//     const paths = openapi.paths;
//     const definitions = openapi.components?.schemas || {};

//     const pathNodes = Object.keys(paths).map((path) => ({
//       name: path,
//       isExpanded: false,
//       children: Object.keys(paths[path]).map((method) => ({
//         name: method,
//         isExpanded: false,
//         children: [], // Add responses if needed
//       })),
//     }));

//     const definitionNodes = Object.keys(definitions).map((definition) => ({
//       name: definition,
//       isExpanded: false,
//       children: [], // Add schema properties if needed
//     }));

//     return {
//       name: 'OpenAPI Schema',
//       isExpanded: true,
//       children: [
//         { name: 'Paths', isExpanded: true, children: pathNodes },
//         { name: 'Definitions', isExpanded: true, children: definitionNodes },
//       ],
//     };
//   };

//   const handleClick = (node: any) => {
//     node.data.isExpanded = !node.data.isExpanded;
//     forceUpdate(); // Force update to re-render the tree
//   };

//   const innerWidth = totalWidth - margin.left - margin.right;
//   const innerHeight = totalHeight - margin.top - margin.bottom;

//   let origin: { x: number; y: number };
//   let sizeWidth: number;
//   let sizeHeight: number;

//   if (layout === 'polar') {
//     origin = {
//       x: innerWidth / 2,
//       y: innerHeight / 2,
//     };
//     sizeWidth = 2 * Math.PI;
//     sizeHeight = Math.min(innerWidth, innerHeight) / 2;
//   } else {
//     origin = { x: 0, y: 0 };
//     if (orientation === 'vertical') {
//       sizeWidth = innerWidth;
//       sizeHeight = innerHeight;
//     } else {
//       sizeWidth = innerHeight;
//       sizeHeight = innerWidth;
//     }
//   }

//   const LinkComponent = getLinkComponent({ layout, linkType, orientation });

//   return totalWidth < 10 ? null : (
//     <div>
//       <LinkControls
//         layout={layout}
//         orientation={orientation}
//         linkType={linkType}
//         stepPercent={stepPercent}
//         setLayout={setLayout}
//         setOrientation={setOrientation}
//         setLinkType={setLinkType}
//         setStepPercent={setStepPercent}
//       />
//       <svg width={totalWidth} height={totalHeight}>
//         <LinearGradient id="links-gradient" from="#fd9b93" to="#fe6e9e" />
//         <rect width={totalWidth} height={totalHeight} rx={14} fill="#ffffff" />
//         <Group top={margin.top} left={margin.left}>
//           <Tree
//             root={hierarchy(data, (d) => (d.isExpanded ? d.children : []))}
//             size={[sizeWidth, sizeHeight]}
//             separation={(a, b) => (a.parent === b.parent ? 1 : 0.5) / a.depth}
//           >
//             {(tree) => (
//               <Group top={origin.y} left={origin.x}>
//                 {tree.links().map((link, i) => (
//                   <LinkComponent
//                     key={i}
//                     data={link}
//                     percent={stepPercent}
//                     stroke="rgb(0,0,0)"
//                     strokeWidth="1"
//                     fill="none"
//                   />
//                 ))}
//                 {tree.descendants().map((node, key) => {
//                   const width = 100;
//                   const height = 40;

//                   let top: number;
//                   let left: number;
//                   if (layout === 'polar') {
//                     const [radialX, radialY] = pointRadial(node.x, node.y);
//                     top = radialY;
//                     left = radialX;
//                   } else if (orientation === 'vertical') {
//                     top = node.y;
//                     left = node.x;
//                   } else {
//                     top = node.x;
//                     left = node.y;
//                   }

//                   return (
//                     <Group top={top} left={left} key={key}>
//                       <rect
//                         height={height}
//                         width={width}
//                         y={-height / 2}
//                         x={-width / 2}
//                         fill="#ffffff"
//                         stroke={node.data.children ? 'black' : 'black'}
//                         strokeWidth={2}
//                         strokeDasharray={'2,2'}
//                         strokeOpacity={node.data.children ? 1 : 0.6}
//                         rx={10}
//                         onClick={() => handleClick(node)}
//                       />
//                       <text
//                         dy=".33em"
//                         fontSize={12}
//                         fontFamily="Arial"
//                         textAnchor="middle"
//                         style={{ pointerEvents: 'none' }}
//                         fill={node.depth === 0 ? '#71248e' : node.children ? 'black' : 'black'}
//                       >
//                         {node.data.name}
//                       </text>
//                     </Group>
//                   );
//                 })}
//               </Group>
//             )}
//           </Tree>
//         </Group>
//       </svg>
//     </div>
//   );
// };

// export default import React, { useEffect, useState } from 'react';
// import { Group } from '@visx/group';
// import { hierarchy, Tree } from '@visx/hierarchy';
// import { LinearGradient } from '@visx/gradient';
// import { pointRadial } from 'd3-shape';
// import useForceUpdate from './useForceUpdate'; // Adjust path as needed
// import LinkControls from './LinkControls'; // Adjust path as needed
// import getLinkComponent from './getLinkComponent';
// import * as yaml from 'js-yaml'; // Import js-yaml

// interface TreeNode {
//   name: string;
//   isExpanded?: boolean;
//   children?: TreeNode[];
// }

// const defaultMargin = { top: 30, left: 30, right: 30, bottom: 70 };

// export type LinkTypesProps = {
//   width: number;
//   height: number;
//   margin?: { top: number; right: number; bottom: number; left: number };
// };

// const OpenAPITreeYaml = ({
//   width: totalWidth,
//   height: totalHeight,
//   margin = defaultMargin,
// }: LinkTypesProps) => {
//   const [data, setData] = useState<TreeNode>({ name: 'Loading...', children: [] });
//   const [layout, setLayout] = useState<string>('cartesian');
//   const [orientation, setOrientation] = useState<string>('horizontal');
//   const [linkType, setLinkType] = useState<string>('step');
//   const [stepPercent, setStepPercent] = useState<number>(0.1);
//   const forceUpdate = useForceUpdate();

//   useEffect(() => {
//     fetch('/data.yaml') // Fetch YAML file
//       .then((response) => response.text())
//       .then((yamlText) => {
//         const openapi = yaml.load(yamlText); // Parse YAML to JSON
//         const treeData = transformOpenAPIToTree(openapi);
//         setData(treeData);
//       });
//   }, []);

//   const transformOpenAPIToTree = (openapi: any): TreeNode => {
//     const paths = openapi.paths;
//     const definitions = openapi.components?.schemas || {};

//     const pathNodes = Object.keys(paths).map((path) => ({
//       name: path,
//       isExpanded: false,
//       children: Object.keys(paths[path]).map((method) => ({
//         name: method,
//         isExpanded: false,
//         children: [], // Add responses if needed
//       })),
//     }));

//     const definitionNodes = Object.keys(definitions).map((definition) => ({
//       name: definition,
//       isExpanded: false,
//       children: [], // Add schema properties if needed
//     }));

//     return {
//       name: 'OpenAPI Schema',
//       isExpanded: true,
//       children: [
//         { name: 'Paths', isExpanded: true, children: pathNodes },
//         { name: 'Definitions', isExpanded: true, children: definitionNodes },
//       ],
//     };
//   };

//   const handleClick = (node: any) => {
//     node.data.isExpanded = !node.data.isExpanded;
//     forceUpdate(); // Force update to re-render the tree
//   };

//   const innerWidth = totalWidth - margin.left - margin.right;
//   const innerHeight = totalHeight - margin.top - margin.bottom;

//   let origin: { x: number; y: number };
//   let sizeWidth: number;
//   let sizeHeight: number;

//   if (layout === 'polar') {
//     origin = {
//       x: innerWidth / 2,
//       y: innerHeight / 2,
//     };
//     sizeWidth = 2 * Math.PI;
//     sizeHeight = Math.min(innerWidth, innerHeight) / 2;
//   } else {
//     origin = { x: 0, y: 0 };
//     if (orientation === 'vertical') {
//       sizeWidth = innerWidth;
//       sizeHeight = innerHeight;
//     } else {
//       sizeWidth = innerHeight;
//       sizeHeight = innerWidth;
//     }
//   }

//   const LinkComponent = getLinkComponent({ layout, linkType, orientation });

//   return totalWidth < 10 ? null : (
//     <div>
//       <LinkControls
//         layout={layout}
//         orientation={orientation}
//         linkType={linkType}
//         stepPercent={stepPercent}
//         setLayout={setLayout}
//         setOrientation={setOrientation}
//         setLinkType={setLinkType}
//         setStepPercent={setStepPercent}
//       />
//       <svg width={totalWidth} height={totalHeight}>
//         <LinearGradient id="links-gradient" from="#fd9b93" to="#fe6e9e" />
//         <rect width={totalWidth} height={totalHeight} rx={14} fill="#ffffff" />
//         <Group top={margin.top} left={margin.left}>
//           <Tree
//             root={hierarchy(data, (d) => (d.isExpanded ? d.children : []))}
//             size={[sizeWidth, sizeHeight]}
//             separation={(a, b) => (a.parent === b.parent ? 1 : 0.5) / a.depth}
//           >
//             {(tree) => (
//               <Group top={origin.y} left={origin.x}>
//                 {tree.links().map((link, i) => (
//                   <LinkComponent
//                     key={i}
//                     data={link}
//                     percent={stepPercent}
//                     stroke="rgb(0,0,0)"
//                     strokeWidth="1"
//                     fill="none"
//                   />
//                 ))}
//                 {tree.descendants().map((node, key) => {
//                   const width = 100;
//                   const height = 40;

//                   let top: number;
//                   let left: number;
//                   if (layout === 'polar') {
//                     const [radialX, radialY] = pointRadial(node.x, node.y);
//                     top = radialY;
//                     left = radialX;
//                   } else if (orientation === 'vertical') {
//                     top = node.y;
//                     left = node.x;
//                   } else {
//                     top = node.x;
//                     left = node.y;
//                   }

//                   return (
//                     <Group top={top} left={left} key={key}>
//                       <rect
//                         height={height}
//                         width={width}
//                         y={-height / 2}
//                         x={-width / 2}
//                         fill="#ffffff"
//                         stroke={node.data.children ? 'black' : 'black'}
//                         strokeWidth={2}
//                         strokeDasharray={'2,2'}
//                         strokeOpacity={node.data.children ? 1 : 0.6}
//                         rx={10}
//                         onClick={() => handleClick(node)}
//                       />
//                       <text
//                         dy=".33em"
//                         fontSize={12}
//                         fontFamily="Arial"
//                         textAnchor="middle"
//                         style={{ pointerEvents: 'none' }}
//                         fill={node.depth === 0 ? '#71248e' : node.children ? 'black' : 'black'}
//                       >
//                         {node.data.name}
//                       </text>
//                     </Group>
//                   );
//                 })}
//               </Group>
//             )}
//           </Tree>
//         </Group>
//       </svg>
//     </div>
//   );
// };

// export default OpenAPITreeYaml;
// ;
import React, { useEffect, useState } from 'react';
import { Group } from '@visx/group';
import { hierarchy, Tree } from '@visx/hierarchy';
import { LinearGradient } from '@visx/gradient';
import { pointRadial } from 'd3-shape';
import useForceUpdate from './useForceUpdate';
import LinkControls from './LinkControls';
import getLinkComponent from './getLinkComponent';
import yaml from 'js-yaml';

interface TreeNode {
  name: string;
  isExpanded?: boolean;
  children?: TreeNode[];
}

const defaultMargin = { top: 30, left: 30, right: 30, bottom: 70 };

export type LinkTypesProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
};

const transformOpenAPIToTree = (openapi: any): TreeNode => {
  const paths = openapi.paths;
  const definitions = openapi.components?.schemas || {};

  const pathNodes = Object.keys(paths).map((path) => ({
    name: path,
    children: Object.keys(paths[path]).map((method) => ({
      name: method,
    })),
  }));

  const definitionNodes = Object.keys(definitions).map((definition) => ({
    name: definition,
  }));

  return {
    name: 'OpenAPI Schema',
    children: [
      { name: 'Paths', children: pathNodes },
      { name: 'Definitions', children: definitionNodes },
    ],
  };
};

export default function OpenAPITree({
  width: totalWidth,
  height: totalHeight,
  margin = defaultMargin,
}: LinkTypesProps) {
  const [data, setData] = useState<TreeNode | null>(null);
  const [layout, setLayout] = useState<string>('cartesian');
  const [orientation, setOrientation] = useState<string>('horizontal');
  const [linkType, setLinkType] = useState<string>('diagonal');
  const [stepPercent, setStepPercent] = useState<number>(0.5);
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    fetch('/airshopping.yaml')
      .then((response) => response.text())
      .then((yamlText) => {
        const openapi = yaml.load(yamlText);
        const treeData = transformOpenAPIToTree(openapi);
        setData(treeData);
      });
  }, []);

  if (!data) return <div>Loading...</div>;

  const innerWidth = totalWidth - margin.left - margin.right;
  const innerHeight = totalHeight - margin.top - margin.bottom;

  let origin: { x: number; y: number };
  let sizeWidth: number;
  let sizeHeight: number;

  if (layout === 'polar') {
    origin = {
      x: innerWidth / 2,
      y: innerHeight / 2,
    };
    sizeWidth = 2 * Math.PI;
    sizeHeight = Math.min(innerWidth, innerHeight) / 2;
  } else {
    origin = { x: 0, y: 0 };
    if (orientation === 'vertical') {
      sizeWidth = innerWidth;
      sizeHeight = innerHeight;
    } else {
      sizeWidth = innerHeight;
      sizeHeight = innerWidth;
    }
  }

  const LinkComponent = getLinkComponent({ layout, linkType, orientation });

  return totalWidth < 10 ? null : (
    <div>
      <LinkControls
        layout={layout}
        orientation={orientation}
        linkType={linkType}
        stepPercent={stepPercent}
        setLayout={setLayout}
        setOrientation={setOrientation}
        setLinkType={setLinkType}
        setStepPercent={setStepPercent}
      />
      <svg width={totalWidth} height={totalHeight}>
        <LinearGradient id="links-gradient" from="#fd9b93" to="#fe6e9e" />
        <rect width={totalWidth} height={totalHeight} rx={14} fill="#272b4d" />
        <Group top={margin.top} left={margin.left}>
          <Tree<TreeNode>
            root={hierarchy(data, (d) => (d.isExpanded ? null : d.children))}
            size={[sizeWidth, sizeHeight]}
            separation={(a, b) => (a.parent === b.parent ? 1 : 0.5) / a.depth}
          >
            {(tree) => (
              <Group top={origin.y} left={origin.x}>
                {tree.links().map((link, i) => (
                  <LinkComponent
                    key={i}
                    data={link}
                    percent={stepPercent}
                    stroke="rgb(254,110,158,0.6)"
                    strokeWidth="1"
                    fill="none"
                  />
                ))}

                {tree.descendants().map((node, key) => {
                  const width = 40;
                  const height = 20;

                  let top: number;
                  let left: number;
                  if (layout === 'polar') {
                    const [radialX, radialY] = pointRadial(node.x, node.y);
                    top = radialY;
                    left = radialX;
                  } else if (orientation === 'vertical') {
                    top = node.y;
                    left = node.x;
                  } else {
                    top = node.x;
                    left = node.y;
                  }

                  return (
                    <Group top={top} left={left} key={key}>
                      {node.depth === 0 && (
                        <circle
                          r={12}
                          fill="url('#links-gradient')"
                          onClick={() => {
                            node.data.isExpanded = !node.data.isExpanded;
                            console.log(node);
                            forceUpdate();
                          }}
                        />
                      )}
                      {node.depth !== 0 && (
                        <rect
                          height={height}
                          width={width}
                          y={-height / 2}
                          x={-width / 2}
                          fill="#272b4d"
                          stroke={node.data.children ? '#03c0dc' : '#26deb0'}
                          strokeWidth={1}
                          strokeDasharray={node.data.children ? '0' : '2,2'}
                          strokeOpacity={node.data.children ? 1 : 0.6}
                          rx={node.data.children ? 0 : 10}
                          onClick={() => {
                            node.data.isExpanded = !node.data.isExpanded;
                            console.log(node);
                            forceUpdate();
                          }}
                        />
                      )}
                      <text
                        dy=".33em"
                        fontSize={9}
                        fontFamily="Arial"
                        textAnchor="middle"
                        style={{ pointerEvents: 'none' }}
                        fill={node.depth === 0 ? '#71248e' : node.children ? 'white' : '#26deb0'}
                      >
                        {node.data.name}
                      </text>
                    </Group>
                  );
                })}
              </Group>
            )}
          </Tree>
        </Group>
      </svg>
    </div>
  );
}
