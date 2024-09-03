/*
import React, { useEffect, useState } from 'react';
import { Group } from '@visx/group';
import { hierarchy, Tree } from '@visx/hierarchy';
import { LinearGradient } from '@visx/gradient';
import { pointRadial } from 'd3-shape';
import useForceUpdate from './useForceUpdate';
import LinkControls from './LinkControls';
import getLinkComponent from './getLinkComponent';

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
   fetch('/data.json')
     .then((response) => response.json())
     .then((openapi: any) => {
       const treeData = transformOpenAPIToTree(openapi);
       setData(treeData);
     });
 }, []);

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
               {tree.links().map((link, i) => {
                 // Type assertion for link
                 const typedLink = link as { source: { x: number; y: number }; target: { x: number; y: number } };
                 return (
                   <LinkComponent
                   key={i}
                   data={link}
                   percent={stepPercent}
                   stroke="rgb(254,110,158,0.6)"
                   strokeWidth="1"
                   fill="none"
                 />
                 );
               })}

               {tree.descendants().map((node, key) => {
                 // Type assertion for node
                 const typedNode = node as { x: number; y: number; depth: number; data: TreeNode; children?: any[] };
                 const width = 40;
                 const height = 20;

                 let top: number;
                 let left: number;
                 if (layout === 'polar') {
                   const [radialX, radialY] = pointRadial(typedNode.x, typedNode.y);
                   top = radialY;
                   left = radialX;
                 } else if (orientation === 'vertical') {
                   top = typedNode.y;
                   left = typedNode.x;
                 } else {
                   top = typedNode.x;
                   left = typedNode.y;
                 }

                 return (
                   <Group top={top} left={left} key={key}>
                     {typedNode.depth === 0 && (
                       <circle
                         r={12}
                         fill="url('#links-gradient')"
                         onClick={() => {
                           typedNode.data.isExpanded = !typedNode.data.isExpanded;
                           console.log(typedNode);
                           forceUpdate();
                         }}
                       />
                     )}
                     {typedNode.depth !== 0 && (
                       <rect
                         height={height}
                         width={width}
                         y={-height / 2}
                         x={-width / 2}
                         fill="#272b4d"
                         stroke={typedNode.data.children ? '#03c0dc' : '#26deb0'}
                         strokeWidth={1}
                         strokeDasharray={typedNode.data.children ? '0' : '2,2'}
                         strokeOpacity={typedNode.data.children ? 1 : 0.6}
                         rx={typedNode.data.children ? 0 : 10}
                         onClick={() => {
                           typedNode.data.isExpanded = !typedNode.data.isExpanded;
                           console.log(typedNode);
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
                       fill={typedNode.depth === 0 ? '#71248e' : typedNode.children ? 'white' : '#26deb0'}
                     >
                       {typedNode.data.name}
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
}*/

//////////////////////////////
/*

import React, { useEffect, useState } from 'react';
import { Group } from '@visx/group';
import { hierarchy, Tree } from '@visx/hierarchy';
import { LinearGradient } from '@visx/gradient';
import { LinkHorizontal } from '@visx/shape';
import useForceUpdate from './useForceUpdate'; // Adjust path as needed
import LinkControls from './LinkControls'; // Adjust path as needed
import { pointRadial } from 'd3-shape';
import { steps } from 'framer-motion';
import getLinkComponent from './getLinkComponent';
 

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
  const definitions = openapi.definitions || {};  

  const pathNodes = Object.keys(paths).map((path) => ({
    name: path,
    isExpanded: true,
    children: Object.keys(paths[path]).map((method) => ({
      name: method,
    })),
  }));

  const definitionNodes = Object.keys(definitions).map((definition) => ({
    name: definition,
    isExpanded: false,
    children: [], // Add children if applicable
  }));

  return {
    name: 'OpenAPI Definition',
    isExpanded: true,
    children: [
      { name: 'Paths', isExpanded: true, children: pathNodes },
      { name: 'Definitions', isExpanded: true, children: definitionNodes },
    ],
  };
};

// const transformOpenAPIToTree = (openapi:any) => {
//   return {
//     name: 'API',
//     children: Object.keys(openapi.paths).map((path) => ({
//       name: path,
//       children: Object.keys(openapi.paths[path]).map((method) => ({
//         name: `${method.toUpperCase()} ${path}`,
//         children: Object.keys(openapi.paths[path][method].responses).map(
//           (status) => ({
//             name: `Response ${status}`,
//             children: [],
//           })
//         ),
//       })),
//     })),
//   };
// };

// const transformOpenApiToTree = (openapi :any) => {
//   const paths = Object.keys(openapi.paths).map((path) => ({
//     name: path,
//     children: Object.keys(openapi.paths[path]).map((method) => {
//       const responses = openapi.paths[path][method].responses;
//       const responseNodes = Object.keys(responses).map((status) => {
//         const schemaRef = responses[status].content?.['application/json']?.schema?.$ref;
//         const schemaName = schemaRef ? schemaRef.split('/').pop() : null;
//         return {
//           name: `Response ${status}: ${responses[status].description}`,
//           children: schemaName ? [transformSchemaToNode(schemaName, openapi.components.schemas)] : []
//         };
//       });
//       return {
//         name: `${method.toUpperCase()} ${path}`,
//         children: responseNodes
//       };
//     })
//   }));

//   return {
//     name: openapi.info.title,
//     children: paths
//   };
// };

// const transformSchemaToNode = (schemaName: string, schemas: { [key: string]: any }): TreeNode => {
//   const schema = schemas[schemaName];
//   if (!schema) return { name: schemaName, children: [] };

//   const properties = schema.properties
//     ? Object.keys(schema.properties).map((prop) => ({
//         name: `${prop}: ${schema.properties[prop].type}`,
//         children: schema.properties[prop].$ref ? [transformSchemaToNode(schema.properties[prop].$ref.split('/').pop(), schemas)] : []
//       }))
//     : [];

//   return {
//     name: schemaName,
//     children: properties
//   };
// };
// const transformOpenApiToTree = (data: any): TreeNode => {
//   // Create a tree structure based on OpenAPI paths
//   const paths = Object.keys(data.paths).map((path) => ({
//     name: path,
//     children: Object.keys(data.paths[path]).map((method) => {
//       const responses = data.paths[path][method].responses;
//       const responseNodes = Object.keys(responses).map((status) => {
//         const schemaRef = responses[status].schema?.$ref;
//         const schemaName = schemaRef ? schemaRef.split('/').pop() : null;
//         return {
//           name: `Response ${status}: ${responses[status].description}`,
//           children: schemaName ? [transformSchemaToNode(schemaName, data.definitions)] : [],
//           isExpanded: false,
//         };
//       });
//       return {
//         name: `${method.toUpperCase()} ${path}`,
//         children: responseNodes,
//         isExpanded: false,
//       };
//     }),
//     isExpanded: false,
//   }));

//   return {
//     name: data.info.title,
//     children: paths,
//     isExpanded: false, // Start with the root node expanded
//   };
// };

// const transformSchemaToNode = (schemaName: string, definitions: { [key: string]: any }): TreeNode => {
//   const schema = definitions[schemaName];
//   if (!schema) return { name: schemaName, children: [], isExpanded: false };

//   const properties = schema.properties
//     ? Object.keys(schema.properties).map((prop) => ({
//         name: `${prop}: ${schema.properties[prop].type}`,
//         children: schema.properties[prop].$ref
//           ? [transformSchemaToNode(schema.properties[prop].$ref.split('/').pop()!, definitions)]
//           : [],
//         isExpanded: false,
//       }))
//     : [];

//   return {
//     name: schemaName,
//     children: properties,
//     isExpanded: false,
//   };
// };
const transformOpenApiToTree = (data: any): TreeNode => {
  // Create a tree structure based on OpenAPI schemas (definitions)
  const definitions = data.definitions || data.components?.schemas;
  if (!definitions) return { name: 'No Definitions', children: [], isExpanded: false };

  const schemaNodes = Object.keys(definitions).map((schemaName) => {
    return transformSchemaToNode(schemaName, definitions);
  });

  return {
    name: data.info.title || 'OpenAPI Definitions',
    children: schemaNodes,
    isExpanded: true, // Start with the root node expanded
  };
};

const transformSchemaToNode = (schemaName: string, definitions: { [key: string]: any }): TreeNode => {
  const schema = definitions[schemaName];
  if (!schema) return { name: schemaName, children: [], isExpanded: false };

  const properties = schema.properties
    ? Object.keys(schema.properties).map((prop) => ({
        name: `${prop}: ${schema.properties[prop].type}`,
        children: schema.properties[prop].$ref
          ? [transformSchemaToNode(schema.properties[prop].$ref.split('/').pop()!, definitions)]
          : [],
        isExpanded: false,
      }))
    : [];

  return {
    name: schemaName,
    children: properties,
    isExpanded: false,
  };
};

const toggleNodeExpansion = (node: TreeNode) => {
  node.isExpanded = !node.isExpanded;
  return node;
};

export default function OpenAPITree({
  width: totalWidth,
  height: totalHeight,
  margin = defaultMargin,
}: LinkTypesProps) {
   const [data, setOpenApiData] = useState<TreeNode>({
    name: 'Loading...',
    children: [],
  });
  const [layout, setLayout] = useState<string>('cartesian');
  const [orientation, setOrientation] = useState<string>('horizontal');
  const [linkType, setLinkType] = useState<string>('step');
  const [stepPercent, setStepPercent] = useState<number>(0.1);
  const forceUpdate = useForceUpdate();

  // useEffect(() => {
  //   fetch('/data.json')
  //     .then((response) => response.json())
  //     .then((openapi: any) => {
  //       const treeData = transformOpenAPIToTree(openapi);
  //       setData(treeData);
  //     });
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/data.json');
      const data = await response.json();
      const transformedData = transformOpenApiToTree(data);
      setOpenApiData(transformedData);
    };
    fetchData();
  }, []);


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
        <rect width={totalWidth} height={totalHeight} rx={14} fill="#ffffff" />
        <Group top={margin.top} left={margin.left}>
          <Tree
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
                    stroke="rgb(0,0,0)"
                    strokeWidth="1"
                    fill="none"
                  />
                ))}

                {tree.descendants().map((node, key) => {
                  const width = 100;
                  const height = 40;

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
                        // <circle
                        //   r={12}
                        //   fill="url('#links-gradient')"
                        //   onClick={() => {
                        //     node.data.isExpanded = !node.data.isExpanded;
                        //     console.log(node);
                        //     forceUpdate();
                        //   }}
                        // />
                        <rect
                          height={height}
                          width={width}
                          y={-height / 2}
                          x={-width / 2}
                          fill="#ffffff"
                          stroke={node.data.children ? 'black' : 'black'}
                          strokeWidth={2}
                          strokeDasharray={'2,2'}
                          strokeOpacity={node.data.children ? 1 : 0.6}
                          rx={10}
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
                          fill="#ffffff"
                          stroke={node.data.children ? 'black' : 'black'}
                          strokeWidth={2}
                          strokeDasharray={'2,2'}
                          strokeOpacity={node.data.children ? 1 : 0.6}
                          rx={ 10}
                          onClick={() => {
                            node.data.isExpanded = !node.data.isExpanded;
                            console.log(node);
                            forceUpdate();
                          }}
                        />
                      )}
                      <text
                        dy=".33em"
                        fontSize={12}
                        fontFamily="Arial"
                        textAnchor="middle"
                        style={{ pointerEvents: 'none' }}
                        fill={node.depth === 0 ? '#71248e' : node.children ? 'black' : 'black'}
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
}*/




// 

// import React, { useEffect, useState } from 'react';
// import { Group } from '@visx/group';
// import { hierarchy, Tree } from '@visx/hierarchy';
// import { LinearGradient } from '@visx/gradient';
// import { pointRadial } from 'd3-shape';
// import useForceUpdate from './useForceUpdate'; // Adjust path as needed
// import LinkControls from './LinkControls'; // Adjust path as needed
// import getLinkComponent from './getLinkComponent';
// import * as yaml from 'js-yaml';

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

// const transformOpenApiToTree = (data: any): TreeNode => {
//   const definitions = data.definitions || data.components?.schemas;
//   if (!definitions) return { name: 'No Definitions', children: [], isExpanded: false };

//   const schemaNodes = Object.keys(definitions).map((schemaName) =>
//     transformSchemaToNode(schemaName, definitions)
//   );

//   return {
//     name: data.info.title || 'OpenAPI Definitions',
//     children: schemaNodes,
//     isExpanded: true,
//   };
// };

// const transformSchemaToNode = (schemaName: string, definitions: { [key: string]: any }): TreeNode => {
//   const schema = definitions[schemaName];
//   if (!schema) return { name: schemaName, children: [], isExpanded: false };

//   const properties = schema.properties
//     ? Object.keys(schema.properties).map((prop) => {
//         const propSchema = schema.properties[prop];
//         return {
//           name: `${prop}: ${propSchema.type}`,
//           children: propSchema.$ref
//             ? [transformSchemaToNode(propSchema.$ref.split('/').pop()!, definitions)]
//             : [],
//           isExpanded: false,
//         };
//       })
//     : [];

//   return {
//     name: schemaName,
//     children: properties,
//     isExpanded: false,
//   };
// };

// const parseData = async (url: string, type: 'json' | 'yaml') => {
//   const response = await fetch(url);
//   const text = await response.text();
//   return type === 'yaml' ? yaml.load(text) : JSON.parse(text);
// };

// export default function OpenAPITree({
//   width: totalWidth,
//   height: totalHeight,
//   margin = defaultMargin,
// }: LinkTypesProps) {
//   const [data, setData] = useState<TreeNode>({
//     name: 'Loading...',
//     children: [],
//     isExpanded: true,
//   });
//   const [layout, setLayout] = useState<string>('cartesian');
//   const [orientation, setOrientation] = useState<string>('horizontal');
//   const [linkType, setLinkType] = useState<string>('diagonal');
//   const [stepPercent, setStepPercent] = useState<number>(0.5);
//   const [fileType, setFileType] = useState<'json' | 'yaml'>('json'); // Default to JSON
//   const forceUpdate = useForceUpdate();

//   useEffect(() => {
//     const fetchData = async () => {
//       const url = '/airshopping.yaml' + (fileType === 'yaml' ? 'yaml' : 'json');
//       const jsonData = await parseData(url, fileType);
//       setData(transformOpenApiToTree(jsonData));
//     };

//     fetchData();
//   }, [fileType]);

//   const innerWidth = totalWidth - margin.left - margin.right;
//   const innerHeight = totalHeight - margin.top - margin.bottom;

//   const { x: originX, y: originY, width: sizeWidth, height: sizeHeight } =
//     layout === 'polar'
//       ? {
//           x: innerWidth / 2,
//           y: innerHeight / 2,
//           width: 2 * Math.PI,
//           height: Math.min(innerWidth, innerHeight) / 2,
//         }
//       : {
//           x: 0,
//           y: 0,
//           width: orientation === 'vertical' ? innerWidth : innerHeight,
//           height: orientation === 'vertical' ? innerHeight : innerWidth,
//         };

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
//       <div>
//         <button onClick={() => setFileType('json')}>Load JSON</button>
//         <button onClick={() => setFileType('yaml')}>Load YAML</button>
//       </div>
//       <svg width={totalWidth} height={totalHeight}>
//         <LinearGradient id="links-gradient" from="#fd9b93" to="#fe6e9e" />
//         <rect width={totalWidth} height={totalHeight} rx={14} fill="#ffffff" />
//         <Group top={margin.top} left={margin.left}>
//           <Tree<TreeNode>
//             root={hierarchy(data, (d) => (d.isExpanded ? d.children : null))}
//             size={[sizeWidth, sizeHeight]}
//             separation={(a, b) => (a.parent === b.parent ? 1 : 0.5) / a.depth}
//           >
//             {(tree) => (
//               <Group top={originY} left={originX}>
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

//                   const [top, left] =
//                     layout === 'polar'
//                       ? pointRadial(node.x, node.y)
//                       : orientation === 'vertical'
//                       ? [node.y, node.x]
//                       : [node.x, node.y];

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
//                         onClick={() => {
//                           node.data.isExpanded = !node.data.isExpanded;
//                           forceUpdate();
//                         }}
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
// }

// import React, { useEffect, useState } from 'react';
// import { Group } from '@visx/group';
// import { hierarchy, Tree } from '@visx/hierarchy';
// import { LinearGradient } from '@visx/gradient';
// import useForceUpdate from './useForceUpdate'; // Adjust path as needed
// import LinkControls from './LinkControls'; // Adjust path as needed
// import { pointRadial } from 'd3-shape';
// import yaml from 'js-yaml'; // Add this line to import js-yaml
// import getLinkComponent from './getLinkComponent';

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
//   schemaName: string; // New prop to receive the clicked schema name
// };

// const transformSchemaToNode = (schemaName: string, definitions: { [key: string]: any }): TreeNode => {
//   const schema = definitions[schemaName];
//   if (!schema) return { name: schemaName, children: [], isExpanded: false };

//   const properties = schema.properties
//     ? Object.keys(schema.properties).map((prop) => ({
//         name: `${prop}: ${schema.properties[prop].type}`,
//         children: schema.properties[prop].$ref
//           ? [transformSchemaToNode(schema.properties[prop].$ref.split('/').pop()!, definitions)]
//           : [],
//         isExpanded: false,
//       }))
//     : [];

//   return {
//     name: schemaName,
//     children: properties,
//     isExpanded: false,
//   };
// };

// const transformOpenApiToTree = (data: any, schemaName: string): TreeNode => {
//   const definitions = data.definitions || data.components?.schemas;
//   if (!definitions) return { name: 'No Definitions', children: [], isExpanded: false };

//   const schemaNode = transformSchemaToNode(schemaName, definitions);

//   return {
//     name: schemaName,
//     children: [schemaNode],
//     isExpanded: true, // Start with the root node expanded
//   };
// };

// export default function OpenAPITree({
//   width: totalWidth,
//   height: totalHeight,
//   margin = defaultMargin,
//   schemaName, // New prop received
// }: LinkTypesProps) {
//   const [data, setOpenApiData] = useState<TreeNode>({
//     name: 'Loading...',
//     children: [],
//   });
//   const [layout, setLayout] = useState<string>('cartesian');
//   const [orientation, setOrientation] = useState<string>('horizontal');
//   const [linkType, setLinkType] = useState<string>('step');
//   const [stepPercent, setStepPercent] = useState<number>(0.1);
//   const forceUpdate = useForceUpdate();

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await fetch('/airshopping.yaml');
//       const yamlText = await response.text();
//       const openapi = yaml.load(yamlText);
//       const transformedData = transformOpenApiToTree(openapi, schemaName); // Use schemaName here
//       setOpenApiData(transformedData);
//     };
//     fetchData();
//   }, [schemaName]); // Re-fetch data when schemaName changes

//   const innerWidth = totalWidth - margin.left - margin.right;
//   const innerHeight = totalHeight - margin.top - margin.bottom;

//   const handleNodeClick = (node: any) => {
//     node.data.isExpanded = !node.data.isExpanded; // Toggle expansion
//     setOpenApiData({ ...data }); // Trigger re-render by updating state
//     forceUpdate(); // Force a re-render
//   };

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

//   // Fixed distance between nodes
//   const nodeSpacing = 100; // Adjust this value as needed

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
//             root={hierarchy(data, (d) => (d.isExpanded ? d.children : null))}
//             size={[sizeWidth, sizeHeight]}
//             separation={(a, b) => (a.parent === b.parent ? nodeSpacing : nodeSpacing / 2) / a.depth}
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
//                       {/* Toggle node */}
//                       <circle
//                         cx={-width / 2 - 50} // Adjust position relative to the node
//                         cy={0}
//                         r={10} // Radius of the circle
//                         fill={node.data.isExpanded ? '#000000' : '#ffffff'} // Fill color depending on expanded state
//                         stroke="#000000" // Stroke color
//                         strokeWidth={2}
//                         onClick={() => handleNodeClick(node)}
//                         style={{ cursor: 'pointer' }}
//                       />

//                       {/* Inner circles as shown in the provided image */}
//                       <circle cx={-width / 2 - 55} cy={0} r={3} fill="black" />
//                       <circle cx={-width / 2 - 45} cy={0} r={3} fill="black" />
//                       <circle cx={-width / 2 + 45} cy={0} r={3} fill="black" />

//                       {/* Node rectangle */}
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
//                         style={{ cursor: 'pointer' }}
//                         onClick={() => handleNodeClick(node)} // Node is also clickable
//                       />

//                       {/* Node text */}
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
// }




// import React, { useEffect, useState } from 'react';
// import { Group } from '@visx/group';
// import { hierarchy, Tree } from '@visx/hierarchy';
// import { LinearGradient } from '@visx/gradient';
// import useForceUpdate from './useForceUpdate'; // Adjust path as needed
// import LinkControls from './LinkControls'; // Adjust path as needed
// import { pointRadial } from 'd3-shape';
// import yaml from 'js-yaml'; // Import js-yaml
// import getLinkComponent from './getLinkComponent';

// export interface TreeNode {
//   name: string;
//   isExpanded?: boolean;
//   children?: TreeNode[];
// }

// const defaultMargin = { top: 30, left: 30, right: 30, bottom: 70 };

// export type LinkTypesProps = {
//   width: number;
//   height: number;
//   margin?: { top: number; right: number; bottom: number; left: number };
//   schemaName: string; // Prop to receive the schema name
// };

// const transformSchemaToNode = (schemaName: string, definitions: { [key: string]: any }): TreeNode => {
//   const schema = definitions[schemaName];
//   if (!schema) return { name: schemaName, children: [], isExpanded: false };

//   const properties = schema.properties
//     ? Object.keys(schema.properties).map((prop) => ({
//         name: `${prop}: ${schema.properties[prop].type}`,
//         children: schema.properties[prop].$ref
//           ? [transformSchemaToNode(schema.properties[prop].$ref.split('/').pop()!, definitions)]
//           : [],
//         isExpanded: false,
//       }))
//     : [];

//   return {
//     name: schemaName,
//     children: properties,
//     isExpanded: false,
//   };
// };

// const transformOpenApiToTree = (data: any, schemaName: string): TreeNode => {
//   const definitions = data.components?.schemas || data.definitions;
//   if (!definitions) return { name: 'No Definitions', children: [], isExpanded: false };

//   const schemaNode = transformSchemaToNode(schemaName, definitions);

//   return {
//     name: schemaName,
//     children: [schemaNode],
//     isExpanded: true, // Start with the root node expanded
//   };
// };

// export default function OpenAPITree({
//   width: totalWidth,
//   height: totalHeight,
//   margin = defaultMargin,
//   schemaName, // Prop received
// }: LinkTypesProps) {
//   const [data, setData] = useState<TreeNode>({
//     name: 'Loading...',
//     children: [],
//   });
//   const [layout, setLayout] = useState<string>('cartesian');
//   const [orientation, setOrientation] = useState<string>('horizontal');
//   const [linkType, setLinkType] = useState<string>('step');
//   const [stepPercent, setStepPercent] = useState<number>(0.1);
//   const forceUpdate = useForceUpdate();

//   useEffect(() => {
//     const fetchData = async () => {
//       console.log("schemaName"+schemaName)
//       try {
//         const response = await fetch('/airshopping.yaml');
//         const yamlText = await response.text();
//         const openapi = yaml.load(yamlText);
//         const transformedData = transformOpenApiToTree(openapi, schemaName); // Use schemaName here
//         setData(transformedData);
//       } catch (error) {
//         console.error('Error fetching or parsing YAML file:', error);
//         setData({ name: 'Error loading data', children: [] });
//       }
//     };
//     fetchData();
//   }, [schemaName]); // Re-fetch data when schemaName changes

//   const innerWidth = totalWidth - margin.left - margin.right;
//   const innerHeight = totalHeight - margin.top - margin.bottom;

//   const handleNodeClick = (node: any) => {
//     node.data.isExpanded = !node.data.isExpanded; // Toggle expansion
//     setData({ ...data }); // Trigger re-render by updating state
//     forceUpdate(); // Force a re-render
//   };

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

//   // Fixed distance between nodes
//   const nodeSpacing = 100; // Adjust this value as needed

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
//             root={hierarchy(data, (d) => (d.isExpanded ? d.children : null))}
//             size={[sizeWidth, sizeHeight]}
//             separation={(a, b) => (a.parent === b.parent ? nodeSpacing : nodeSpacing / 2) / a.depth}
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
//                       <circle
//                         cx={-width / 2 - 50} // Adjust position relative to the node
//                         cy={0}
//                         r={10} // Radius of the circle
//                         fill={node.data.isExpanded ? '#000000' : '#ffffff'} // Fill color depending on expanded state
//                         stroke="#000000" // Stroke color
//                         strokeWidth={2}
//                         onClick={() => handleNodeClick(node)}
//                         style={{ cursor: 'pointer' }}
//                       />

//                       <circle cx={-width / 2 - 55} cy={0} r={3} fill="black" />
//                       <circle cx={-width / 2 - 45} cy={0} r={3} fill="black" />
//                       <circle cx={-width / 2 + 45} cy={0} r={3} fill="black" />

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
//                         style={{ cursor: 'pointer' }}
//                         onClick={() => handleNodeClick(node)}
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
// }
import React, { useEffect, useState } from 'react';
import { Group } from '@visx/group';
import { hierarchy, Tree } from '@visx/hierarchy';
import { LinearGradient } from '@visx/gradient';
import { pointRadial } from 'd3-shape';
import yaml from 'js-yaml'; // Import js-yaml for parsing YAML files
import useForceUpdate from './useForceUpdate'; // Custom hook to force re-render
import LinkControls from './LinkControls'; // Controls for link types, layout, etc.
import getLinkComponent from './getLinkComponent'; // Function to get the correct link component based on settings

export interface TreeNode {
  name: string;
  isExpanded?: boolean;
  children?: TreeNode[];
}

const defaultMargin = { top: 30, left: 30, right: 30, bottom: 70 };

export type LinkTypesProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  schemaName: string; // Prop to receive the schema name
};

const transformSchemaToNode = (schemaName: string, definitions: { [key: string]: any }): TreeNode => {
  const schema = definitions[schemaName];
  if (!schema) return { name: schemaName, children: [], isExpanded: false };

  const properties = schema.properties
    ? Object.keys(schema.properties).map((prop) => ({
        name: `${prop}: ${schema.properties[prop].type}`,
        children: schema.properties[prop].$ref
          ? [transformSchemaToNode(schema.properties[prop].$ref.split('/').pop()!, definitions)]
          : [],
        isExpanded: false,
      }))
    : [];

  return {
    name: schemaName,
    children: properties,
    isExpanded: false,
  };
};

const transformOpenApiToTree = (data: any, schemaName: string): TreeNode => {
  const definitions = data.components?.schemas || data.definitions;
  if (!definitions) return { name: 'No Definitions', children: [], isExpanded: false };

  const schemaNode = transformSchemaToNode(schemaName, definitions);

  return {
    name: schemaName,
    children: [schemaNode],
    isExpanded: true, // Start with the root node expanded
  };
};

export default function OpenAPITree({
  width: totalWidth,
  height: totalHeight,
  margin = defaultMargin,
  schemaName, // Prop received
}: LinkTypesProps) {
  const [data, setData] = useState<TreeNode>({
    name: 'Loading...',
    children: [],
  });
  const [layout, setLayout] = useState<string>('cartesian');
  const [orientation, setOrientation] = useState<string>('horizontal');
  const [linkType, setLinkType] = useState<string>('step');
  const [stepPercent, setStepPercent] = useState<number>(0.1);
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/airshopping.yaml');
        const yamlText = await response.text();
        const openapi = yaml.load(yamlText);
        const transformedData = transformOpenApiToTree(openapi, schemaName); // Use schemaName here
        setData(transformedData);
      } catch (error) {
        console.error('Error fetching or parsing YAML file:', error);
        setData({ name: 'Error loading data', children: [] });
      }
    };
    fetchData();
  }, [schemaName]); // Re-fetch data when schemaName changes

  const innerWidth = totalWidth - margin.left - margin.right;
  const innerHeight = totalHeight - margin.top - margin.bottom;

  const handleNodeClick = (node: any) => {
    node.data.isExpanded = !node.data.isExpanded; // Toggle expansion
    setData({ ...data }); // Trigger re-render by updating state
    forceUpdate(); // Force a re-render
  };

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

  // Fixed distance between nodes
  const nodeSpacing = 100; // Adjust this value as needed

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
        <rect width={totalWidth} height={totalHeight} rx={14} fill="#ffffff" />
        <Group top={margin.top} left={margin.left}>
          <Tree
            root={hierarchy(data, (d) => (d.isExpanded ? d.children : null))}
            size={[sizeWidth, sizeHeight]}
            separation={(a, b) => (a.parent === b.parent ? nodeSpacing : nodeSpacing / 2) / a.depth}
          >
            {(tree) => (
              <Group top={origin.y} left={origin.x}>
                {tree.links().map((link, i) => (
                  <LinkComponent
                    key={i}
                    data={link}
                    percent={stepPercent}
                    stroke="rgb(0,0,0)"
                    strokeWidth="1"
                    fill="none"
                  />
                ))}

                {tree.descendants().map((node, key) => {
                  const width = 100;
                  const height = 40;

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
                      <circle
                        cx={-width / 2 - 50} // Adjust position relative to the node
                        cy={0}
                        r={10} // Radius of the circle
                        fill={node.data.isExpanded ? '#000000' : '#ffffff'} // Fill color depending on expanded state
                        stroke="#000000" // Stroke color
                        strokeWidth={2}
                        onClick={() => handleNodeClick(node)}
                        style={{ cursor: 'pointer' }}
                      />

                      <circle cx={-width / 2 - 55} cy={0} r={3} fill="black" />
                      <circle cx={-width / 2 - 45} cy={0} r={3} fill="black" />
                      <circle cx={-width / 2 + 45} cy={0} r={3} fill="black" />

                      <rect
                        height={height}
                        width={width}
                        y={-height / 2}
                        x={-width / 2}
                        fill="#ffffff"
                        stroke={node.data.children ? 'black' : 'black'}
                        strokeWidth={2}
                        strokeDasharray={'2,2'}
                        strokeOpacity={node.data.children ? 1 : 0.6}
                        rx={10}
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleNodeClick(node)}
                      />

                      <text
                        dy=".33em"
                        fontSize={12}
                        fontFamily="Arial"
                        textAnchor="middle"
                        style={{ pointerEvents: 'none' }}
                        fill={node.depth === 0 ? '#71248e' : node.children ? 'black' : 'black'}
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
