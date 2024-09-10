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
//th
//this code is for yaml
// import React, { useEffect, useState } from 'react';
// import { Group } from '@visx/group';
// import { hierarchy, Tree } from '@visx/hierarchy';
// import { LinearGradient } from '@visx/gradient';
// import { pointRadial } from 'd3-shape';
// import yaml from 'js-yaml'; // Import js-yaml for parsing YAML files
// import useForceUpdate from './useForceUpdate'; // Custom hook to force re-render
// import LinkControls from './LinkControls'; // Controls for link types, layout, etc.
// import getLinkComponent from './getLinkComponent'; // Function to get the correct link component based on settings

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
//       try {
//         const response = await fetch('/data.yaml');
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

//this is for json
// import React, { useEffect, useState } from 'react';
// import { Group } from '@visx/group';
// import { hierarchy, Tree } from '@visx/hierarchy';
// import { LinearGradient } from '@visx/gradient';
// import { pointRadial } from 'd3-shape';
// import useForceUpdate from './useForceUpdate'; // Custom hook to force re-render
// import LinkControls from './LinkControls'; // Controls for link types, layout, etc.
// import getLinkComponent from './getLinkComponent'; // Function to get the correct link component based on settings

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
//       try {
//         const response = await fetch('/data.json'); // Fetch the JSON file instead of YAML
//         const jsonData = await response.json(); // Parse the JSON data
//         const transformedData = transformOpenApiToTree(jsonData, schemaName); // Use schemaName here
//         setData(transformedData);
//       } catch (error) {
//         console.error('Error fetching or parsing JSON file:', error);
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
//                         onClick={() => {}}
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


/*
import React, { useEffect, useState } from 'react';
import { Group } from '@visx/group';
import { hierarchy, Tree } from '@visx/hierarchy';
import { LinearGradient } from '@visx/gradient';
import { pointRadial } from 'd3-shape';
import useForceUpdate from './useForceUpdate';
import LinkControls from './LinkControls';
import getLinkComponent from './getLinkComponent';
import yaml from 'js-yaml';

export interface TreeNode {
  name: string;
  isExpanded?: boolean;
  children?: TreeNode[];
  dataType?: string;
}

const defaultMargin = { top: 30, left: 30, right: 30, bottom: 70 };

export type LinkTypesProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  schemaName: string;
};

const transformSchemaToNode = (
  schemaName: string,
  definitions: { [key: string]: any }
): TreeNode => {
  const schema = definitions[schemaName];
  if (!schema) return { name: schemaName, children: [], isExpanded: false };

  const properties = schema.properties
    ? Object.keys(schema.properties).map((prop) => {
        const propSchema = schema.properties[prop];

        // If the property has a $ref, resolve the reference recursively
        if (propSchema.$ref) {
          const refSchemaName = propSchema.$ref.split('/').pop()!;
          return {
            name: prop,
            dataType: "reference",
            children: [transformSchemaToNode(refSchemaName, definitions)], // Recursively resolve the $ref
            isExpanded: false,
          };
        }

        // If the property is an object, check for nested properties
        if (propSchema.type === 'object' && propSchema.properties) {
          return {
            name: prop,
            dataType: propSchema.type,
            children: Object.keys(propSchema.properties).map((nestedProp) => {
              const nestedPropSchema = propSchema.properties[nestedProp];

              // Handle nested objects with children or $ref inside
              if (nestedPropSchema.$ref) {
                const nestedRefSchemaName = nestedPropSchema.$ref.split('/').pop()!;
                return {
                  name: nestedProp,
                  dataType: "reference",
                  children: [transformSchemaToNode(nestedRefSchemaName, definitions)],
                  isExpanded: false,
                };
              }

              return {
                name: nestedProp,
                dataType: nestedPropSchema.type,
                children: nestedPropSchema.properties
                  ? Object.keys(nestedPropSchema.properties).map((subNestedProp) => ({
                      name: subNestedProp,
                      dataType: nestedPropSchema.properties[subNestedProp].type,
                      children: [], // Recursively add subchildren if needed
                      isExpanded: false,
                    }))
                  : [],
                isExpanded: false,
              };
            }),
            isExpanded: false,
          };
        }

        // Handle arrays with items that are references or objects
        if (propSchema.type === 'array' && propSchema.items) {
          return {
            name: prop,
            dataType: 'array',
            children: propSchema.items.$ref
              ? [transformSchemaToNode(propSchema.items.$ref.split('/').pop()!, definitions)] // Recursively resolve array items
              : [],
            isExpanded: false,
          };
        }

        // Simple field (not an object or array)
        return {
          name: prop,
          dataType: propSchema.type,
          children: [],
          isExpanded: false,
        };
      })
    : [];

  return {
    name: schemaName,
    children: properties,
    isExpanded: false,
  };
};


// Convert OpenAPI schema to tree structure
const transformOpenApiToTree = (data: any, schemaName: string): TreeNode => {
  const definitions = data.components?.schemas || data.definitions;
  if (!definitions) return { name: 'No Definitions', children: [], isExpanded: false };

  const schemaNode = transformSchemaToNode(schemaName, definitions);

  return {
    name: schemaName,
    children: schemaNode.children,
    isExpanded: true,
  };
};

// Function to toggle a node's expansion state immutably
const toggleNodeExpansion = (node: TreeNode): TreeNode => {
  return {
    ...node,
    isExpanded: !node.isExpanded,
    // Recursively update children if present
    children: node.children ? node.children.map((child) => ({ ...child })) : [],
  };
};

export default function OpenAPITree({
  width: totalWidth,
  height: totalHeight,
  margin = defaultMargin,
  schemaName,
}: LinkTypesProps) {
  const [data, setData] = useState<TreeNode>({
    name: 'Loading...',
    children: [],
  });
  const [layout, setLayout] = useState<string>('cartesian');
  const [orientation, setOrientation] = useState<string>('horizontal');
  const [linkType, setLinkType] = useState<string>('step');
  const [stepPercent, setStepPercent] = useState<number>(0.5);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; content: string } | null>(null);
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/airshopping.yaml');
        const yamlText = await response.text();
        const openapi = yaml.load(yamlText);
        const transformedData = transformOpenApiToTree(openapi, schemaName);
        setData(transformedData);
      } catch (error) {
        console.error('Error fetching or parsing YAML file:', error);
        setData({ name: 'Error loading data', children: [] });
      }
    };
    fetchData();
  }, [schemaName]);

  const innerWidth = totalWidth - margin.left - margin.right;
  const innerHeight = totalHeight - margin.top - margin.bottom;

  // Recursively find and toggle node expansion in the tree
  const handleNodeClick = (node: any) => {
    const updateNode = (currentNode: TreeNode): TreeNode => {
      if (currentNode.name === node.data.name) {
        return toggleNodeExpansion(currentNode);
      }
      return {
        ...currentNode,
        children: currentNode.children
          ? currentNode.children.map((child) => updateNode(child))
          : [],
      };
    };

    const updatedTree = updateNode(data);
    setData(updatedTree);
    forceUpdate(); // Force a re-render
  };

  const handleNodeClickForToolTip = (node: any, event: React.MouseEvent<SVGGElement, MouseEvent>) => {
    setTooltip({
      x: event.clientX,
      y: event.clientY - 40,
      content: node.data.name,
    });
  };

  const hideTooltip = () => {
    setTooltip(null);
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
            root={hierarchy(data, (d) => (d.isExpanded ? d.children : null))} // Recursive expansion
            size={[sizeWidth, sizeHeight]}
            separation={(a, b) => (a.parent === b.parent ? 10 : 20)}
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
                        cx={-width / 2 - 50}
                        cy={0}
                        r={10}
                        fill={node.data.isExpanded ? '#000000' : '#ffffff'}
                        stroke="#000000"
                        strokeWidth={2}
                        onClick={() => handleNodeClick(node)}
                        style={{ cursor: 'pointer' }}
                      />
                      <rect
                        height={height}
                        width={width}
                        y={-height / 2}
                        x={-width / 2}
                        fill="#ffffff"
                        stroke={node.data.children ? 'black' : 'gray'}
                        strokeWidth={2}
                        rx={10}
                        onMouseEnter={(event) => handleNodeClickForToolTip(node, event)}
                        onMouseLeave={hideTooltip}
                      />
                      <text
                        dy=".33em"
                        fontSize={12}
                        textAnchor="middle"
                        style={{ pointerEvents: 'none' }}
                        fill={node.depth === 0 ? '#71248e' : node.children ? 'black' : 'gray'}
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
      {tooltip && (
        <div
          style={{
            position: 'absolute',
            left: tooltip.x,
            top: tooltip.y,
            background: 'white',
            border: '1px solid black',
            padding: '5px',
            borderRadius: '3px',
            pointerEvents: 'none',
          }}
        >
          {tooltip.content}
        </div>
      )}
    </div>
  );
}

*/



// import React, { useEffect, useState } from 'react';
// import { Group } from '@visx/group';
// import { hierarchy, Tree } from '@visx/hierarchy';
// import { LinearGradient } from '@visx/gradient';
// import { pointRadial } from 'd3-shape';
// import useForceUpdate from './useForceUpdate';
// import LinkControls from './LinkControls';
// import getLinkComponent from './getLinkComponent';
// import yaml from 'js-yaml';

// export interface TreeNode {
//   name: string;
//   isExpanded?: boolean;
//   children?: TreeNode[];
//   dataType?: string;
// }

// const defaultMargin = { top: 30, left: 30, right: 30, bottom: 70 };

// export type LinkTypesProps = {
//   width: number;
//   height: number;
//   margin?: { top: number; right: number; bottom: number; left: number };
//   schemaName: string;
// };

// // Convert OpenAPI schema to tree structure
// const transformOpenApiToTree = (data: any, schemaName: string): TreeNode => {
//   const definitions = data.components?.schemas || data.definitions;
//   if (!definitions) return { name: 'No Definitions', children: [], isExpanded: false };

//   const schema = definitions[schemaName];
//   const transformSchemaToNode = (schema: any): TreeNode => {
//     if (!schema) return { name: schemaName, children: [], isExpanded: false };

//     const properties = schema.properties
//       ? Object.keys(schema.properties).map((prop) => {
//           const propSchema = schema.properties[prop];
          
//           if (propSchema.$ref) {
//             const refSchemaName = propSchema.$ref.split('/').pop()!;
//             return {
//               name: prop,
//               dataType: "reference",
//               children: [transformSchemaToNode(definitions[refSchemaName])],
//               isExpanded: false,
//             };
//           }

//           if (propSchema.type === 'object' && propSchema.properties) {
//             return {
//               name: prop,
//               dataType: propSchema.type,
//               children: Object.keys(propSchema.properties).map((nestedProp) => {
//                 const nestedPropSchema = propSchema.properties[nestedProp];
//                 if (nestedPropSchema.$ref) {
//                   const nestedRefSchemaName = nestedPropSchema.$ref.split('/').pop()!;
//                   return {
//                     name: nestedProp,
//                     dataType: "reference",
//                     children: [transformSchemaToNode(definitions[nestedRefSchemaName])],
//                     isExpanded: false,
//                   };
//                 }
//                 return {
//                   name: nestedProp,
//                   dataType: nestedPropSchema.type,
//                   children: nestedPropSchema.properties
//                     ? Object.keys(nestedPropSchema.properties).map((subNestedProp) => ({
//                         name: subNestedProp,
//                         dataType: nestedPropSchema.properties[subNestedProp].type,
//                         children: [],
//                         isExpanded: false,
//                       }))
//                     : [],
//                   isExpanded: false,
//                 };
//               }),
//               isExpanded: false,
//             };
//           }

//           if (propSchema.type === 'array' && propSchema.items) {
//             return {
//               name: prop,
//               dataType: 'array',
//               children: propSchema.items.$ref
//                 ? [transformSchemaToNode(definitions[propSchema.items.$ref.split('/').pop()!])]
//                 : [],
//               isExpanded: false,
//             };
//           }

//           return {
//             name: prop,
//             dataType: propSchema.type,
//             children: [],
//             isExpanded: false,
//           };
//         })
//       : [];

//     return {
//       name: schemaName,
//       children: properties,
//       isExpanded: true,
//     };
//   };

//   return transformSchemaToNode(schema);
// };

// export default function OpenAPITree({
//   width: totalWidth,
//   height: totalHeight,
//   margin = defaultMargin,
//   schemaName,
// }: LinkTypesProps) {
//   const [data, setData] = useState<TreeNode>({ name: 'Loading...', children: [] });
//   const [layout, setLayout] = useState<string>('cartesian');
//   const [orientation, setOrientation] = useState<string>('horizontal');
//   const [linkType, setLinkType] = useState<string>('step');
//   const [stepPercent, setStepPercent] = useState<number>(0.5);
//   const [tooltip, setTooltip] = useState<{ x: number; y: number; content: string } | null>(null);
//   const forceUpdate = useForceUpdate();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('/airshopping.yaml');
//         const yamlText = await response.text();
//         const openapi = yaml.load(yamlText);
//         const transformedData = transformOpenApiToTree(openapi, schemaName);
//         setData(transformedData);
//       } catch (error) {
//         console.error('Error fetching or parsing YAML file:', error);
//         setData({ name: 'Error loading data', children: [] });
//       }
//     };
//     fetchData();
//   }, [schemaName]);

//   const innerWidth = totalWidth - margin.left - margin.right;
//   const innerHeight = totalHeight - margin.top - margin.bottom;

//   const handleNodeClick = (node: any) => {
//     const updateNode = (currentNode: TreeNode): TreeNode => {
//       if (currentNode.name === node.data.name) {
//         return {
//           ...currentNode,
//           isExpanded: !currentNode.isExpanded,
//           children: currentNode.isExpanded ? [] : currentNode.children,
//         };
//       }
//       return {
//         ...currentNode,
//         children: currentNode.children
//           ? currentNode.children.map((child) => updateNode(child))
//           : [],
//       };
//     };

//     const updatedTree = updateNode(data);
//     setData(updatedTree);
//     forceUpdate(); // Force a re-render
//   };

//   const handleNodeClickForToolTip = (node: any, event: React.MouseEvent<SVGGElement, MouseEvent>) => {
//     setTooltip({
//       x: event.clientX,
//       y: event.clientY - 40,
//       content: node.data.name,
//     });
//   };

//   const hideTooltip = () => {
//     setTooltip(null);
//   };

//   let origin: { x: number; y: number };
//   let sizeWidth: number;
//   let sizeHeight: number;

//   if (layout === 'polar') {
//     origin = { x: innerWidth / 2, y: innerHeight / 2 };
//     sizeWidth = 1  ;
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
//             root={hierarchy(data, (d) => (d.isExpanded ? d.children : null))}
//             size={[sizeWidth, sizeHeight]}
//             separation={(a, b) => (a.parent === b.parent ? 1 : 1)}
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
//                         cx={-width / 2 - 50}
//                         cy={0}
//                         r={10}
//                         fill={node.data.isExpanded ? '#000000' : '#ffffff'}
//                         stroke="#000000"
//                         strokeWidth={2}
//                         onClick={() => handleNodeClick(node)}
//                         style={{ cursor: 'pointer' }}
//                       />
//                       <rect
//                         height={height}
//                         width={width}
//                         y={-height / 2}
//                         x={-width / 2}
//                         fill="#ffffff"
//                         stroke={node.data.children ? 'black' : 'gray'}
//                         strokeWidth={2}
//                         rx={10}
//                         onMouseEnter={(event) => handleNodeClickForToolTip(node, event)}
//                         onMouseLeave={hideTooltip}
//                       />
//                       <text
//                         dy=".33em"
//                         fontSize={12}
//                         textAnchor="middle"
//                         style={{ pointerEvents: 'none' }}
//                         fill={node.depth === 0 ? '#71248e' : node.children ? 'black' : 'gray'}
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
//       {tooltip && (
//         <div
//           style={{
//             position: 'absolute',
//             left: tooltip.x,
//             top: tooltip.y,
//             background: 'white',
//             border: '1px solid black',
//             padding: '5px',
//             borderRadius: '3px',
//             pointerEvents: 'none',
//           }}
//         >
//           {tooltip.content}
//         </div>
//       )}
//     </div>
//   );
// }

// import React, { useEffect, useState } from 'react';
// import { Group } from '@visx/group';
// import { hierarchy, Tree } from '@visx/hierarchy';
// import { LinearGradient } from '@visx/gradient';
// import yaml from 'js-yaml';
// import useForceUpdate from './useForceUpdate';
// import LinkControls from './LinkControls';
// import getLinkComponent from './getLinkComponent';
// import { pointRadial } from 'd3-shape';
// import styles from './openapitree.module.css'; // Correct path to CSS module
// import SwaggerParser from "@apidevtools/swagger-parser";

// export interface TreeNode {
//   name: string;
//   isExpanded?: boolean;
//   children?: TreeNode[];
//   dataType?: string;
// }

// const defaultMargin = { top: 30, left: 30, right: 30, bottom: 70 };

// export type LinkTypesProps = {
//   width: number;
//   height: number;
//   margin?: { top: number; right: number; bottom: number; left: number };
//   schemaName: string;
// };

// const transformOpenApiToTree = (data: any, schemaName: string): TreeNode => {
//   const definitions = data.components?.schemas || data.definitions;

//   if (!definitions) {
//     return { name: 'No Definitions', children: [], isExpanded: false };
//   }

//   const schema = definitions[schemaName];

//   const getSchemaNameFromRef = (ref: string): string => ref.split('/').pop()!;

//   const transformSchemaToNode = (schema: any): TreeNode => {
//     if (!schema) {
//       return { name: schemaName, children: [], isExpanded: false };
//     }

//     const transformProperties = (properties: any): TreeNode[] => {
//       return Object.keys(properties).map((prop) => {
//         const propSchema = properties[prop];
//         let children: TreeNode[] = [];

//         if (propSchema.$ref) {
//           const refSchemaName = getSchemaNameFromRef(propSchema.$ref);
//           children = [transformSchemaToNode(definitions[refSchemaName])];
//         } else if (propSchema.type === 'object' && propSchema.properties) {
//           children = transformProperties(propSchema.properties);
//         } else if (propSchema.type === 'array' && propSchema.items) {
//           children = propSchema.items.$ref
//             ? [transformSchemaToNode(definitions[getSchemaNameFromRef(propSchema.items.$ref)])]
//             : [];
//         }

//         return {
//           name: prop,
//           dataType: propSchema.$ref ? "reference" : propSchema.type,
//           children,
//           isExpanded: false,
//         };
//       });
//     };

//     return {
//       name: schemaName,
//       children: schema.properties ? transformProperties(schema.properties) : [],
//       isExpanded: true,
//     };
//   };

//   return transformSchemaToNode(schema);
// };

// export default function OpenAPITree({
//   width: totalWidth,
//   height: totalHeight,
//   margin = defaultMargin,
//   schemaName,
// }: LinkTypesProps) {
//   const [data, setData] = useState<TreeNode>({ name: 'Loading...', children: [] });
//   const [layout, setLayout] = useState<string>('cartesian');
//   const [orientation, setOrientation] = useState<string>('horizontal');
//   const [linkType, setLinkType] = useState<string>('step');
//   const [stepPercent, setStepPercent] = useState<number>(0.5);
//   const forceUpdate = useForceUpdate();

//   // Scale the size to shorten the link length
//   const linkScaleFactor = 0.3;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('/airshopping.yaml');
//         const yamlText = await response.text();
//         const json = yaml.load(yamlText) as string;
    
//         // Use SwaggerParser to validate and parse the JSON
      
//         let openapi = await SwaggerParser.validate(json);
        
      
//         const transformedData = transformOpenApiToTree(openapi, schemaName);
//         setData(transformedData);
//       } catch (error) {
//         console.error('Error fetching or parsing YAML file:', error);
//         setData({ name: 'Error loading data', children: [] });
//       }
//     };
//     fetchData();
//   }, [schemaName]);

//   const innerWidth = totalWidth - margin.left - margin.right;
//   const innerHeight = totalHeight - margin.top - margin.bottom;

//   const handleNodeClick = (node: any) => {
//   const updateNode = (currentNode: TreeNode): TreeNode => {
//     // If the clicked node is found, toggle its expanded state.
//     if (currentNode.name === node.data.name) {
//       return {
//         ...currentNode,
//         isExpanded: !currentNode.isExpanded,
//       };
//     }

//     // Otherwise, traverse the children of the current node to find the clicked node.
//     return {
//       ...currentNode,
//       children: currentNode.children
//         ? currentNode.children.map((child) => updateNode(child))
//         : [],
//     };
//   };

//   const updatedTree = updateNode(data);
//   setData(updatedTree);
//   forceUpdate(); // Force a re-render
// };


//   let origin: { x: number; y: number };
//   let sizeWidth: number;
//   let sizeHeight: number;

//   if (layout === 'polar') {
//     origin = { x: innerWidth / 2, y: innerHeight / 2 };
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

//   // Apply scaling to reduce link length
//   const scaledSizeWidth = innerWidth * linkScaleFactor;
//   const scaledSizeHeight = innerHeight * linkScaleFactor;

//   const LinkComponent = getLinkComponent({ layout, linkType, orientation });

//   return totalWidth < 10 ? null : (
//     <div  className={styles.container}>
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
//             size={[scaledSizeWidth, innerHeight]} // Apply scaling here
//             separation={(a, b) => (a.parent === b.parent ? 10 : 20)}
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
//                         cx={-width / 2 - 50}
//                         cy={0}
//                         r={10}
//                         fill={node.data.isExpanded ? '#000000' : '#ffffff'}
//                         stroke="#000000"
//                         strokeWidth={2}
//                         onClick={() => handleNodeClick(node)}
//                         style={{ cursor: 'pointer' }}
//                       />
//                       <rect
//                         height={height}
//                         width={width}
//                         y={-height / 2}
//                         x={-width / 2}
//                         fill="#ffffff"
//                         stroke={node.data.children ? 'black' : 'gray'}
//                         strokeWidth={2}
//                         rx={10}
//                       />
//                       <text
//                         dy=".33em"
//                         fontSize={12}
//                         fontFamily="Arial"
//                         textAnchor="middle"
//                         style={{ pointerEvents: 'none' }}
//                         fill="black"
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
// import yaml from 'js-yaml';
// import useForceUpdate from './useForceUpdate';
// import LinkControls from './LinkControls';
// import getLinkComponent from './getLinkComponent';
// import styles from './openapitree.module.css';
// import SwaggerParser from "@apidevtools/swagger-parser";

// export interface TreeNode {
//   name: string;
//   isExpanded?: boolean;
//   children?: TreeNode[];
//   dataType?: string;
// }

// const defaultMargin = { top: 30, left: 30, right: 30, bottom: 70 };

// export type LinkTypesProps = {
//   width: number;
//   height: number;
//   margin?: { top: number; right: number; bottom: number; left: number };
//   schemaName: string;
// };

// const transformOpenApiToTree = (data: any, schemaName: string): TreeNode => {
//   const definitions = data.components?.schemas || data.definitions;

//   if (!definitions) {
//     return { name: 'No Definitions', children: [], isExpanded: false };
//   }

//   const schema = definitions[schemaName];

//   const getSchemaNameFromRef = (ref: string): string => ref.split('/').pop()!;

//   const transformSchemaToNode = (schema: any): TreeNode => {
//     if (!schema) {
//       return { name: schemaName, children: [], isExpanded: false };
//     }

//     const transformProperties = (properties: any): TreeNode[] => {
//       return Object.keys(properties).map((prop) => {
//         const propSchema = properties[prop];
//         let children: TreeNode[] = [];

//         if (propSchema.$ref) {
//           const refSchemaName = getSchemaNameFromRef(propSchema.$ref);
//           children = [transformSchemaToNode(definitions[refSchemaName])];
//         } else if (propSchema.type === 'object' && propSchema.properties) {
//           children = transformProperties(propSchema.properties);
//         } else if (propSchema.type === 'array' && propSchema.items) {
//           children = propSchema.items.$ref
//             ? [transformSchemaToNode(definitions[getSchemaNameFromRef(propSchema.items.$ref)])]
//             : [];
//         }

//         return {
//           name: prop,
//           dataType: propSchema.$ref ? "reference" : propSchema.type,
//           children,
//           isExpanded: false,
//         };
//       });
//     };

//     return {
//       name: schemaName,
//       children: schema.properties ? transformProperties(schema.properties) : [],
//       isExpanded: true,
//     };
//   };

//   return transformSchemaToNode(schema);
// };

// export default function OpenAPITree({
//   width: totalWidth,
//   height: totalHeight,
//   margin = defaultMargin,
//   schemaName,
// }: LinkTypesProps) {
//   const [data, setData] = useState<TreeNode>({ name: 'Loading...', children: [] });
//   const [layout, setLayout] = useState<string>('cartesian');
//   const [orientation, setOrientation] = useState<string>('horizontal'); // Horizontal orientation
//   const [linkType, setLinkType] = useState<string>('step'); // Changed link type to step for better alignment
//   const [stepPercent, setStepPercent] = useState<number>(0.5);
//   const forceUpdate = useForceUpdate();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('/airshopping.yaml');
//         const yamlText = await response.text();
//         const json = yaml.load(yamlText) as string;

//         let openapi = await SwaggerParser.validate(json);
//         const transformedData = transformOpenApiToTree(openapi, schemaName);
//         setData(transformedData);
//       } catch (error) {
//         console.error('Error fetching or parsing YAML file:', error);
//         setData({ name: 'Error loading data', children: [] });
//       }
//     };
//     fetchData();
//   }, [schemaName]);

//   const innerWidth = totalWidth - margin.left - margin.right;
//   const innerHeight = totalHeight - margin.top - margin.bottom;

//   const handleNodeClick = (node: any) => {
//     const updateNode = (currentNode: TreeNode): TreeNode => {
//       if (currentNode.name === node.data.name) {
//         return {
//           ...currentNode,
//           isExpanded: !currentNode.isExpanded,
//         };
//       }
//       return {
//         ...currentNode,
//         children: currentNode.children
//           ? currentNode.children.map((child) => updateNode(child))
//           : [],
//       };
//     };

//     const updatedTree = updateNode(data);
//     setData(updatedTree);
//     forceUpdate();
//   };

//   // Updated origin to place the main node at the top left
//   // Update size to give more horizontal space and less vertical space
//   const size = [innerWidth, innerHeight]; // Updated to support horizontal layout


//   let origin: { x: number; y: number };
//   let sizeWidth: number;
//   let sizeHeight: number;

//   if (layout === 'polar') {
//     origin = { x: innerWidth / 2, y: innerHeight / 2 };
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
//     <div className={styles.container}>
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
//       <svg width={totalWidth} height={totalHeight}
//       >
//         <LinearGradient id="links-gradient" from="#fd9b93" to="#fe6e9e" />
//         <rect width={totalWidth} height={window.innerHeight} rx={10} fill="#987435" />
//         <Group top={margin.top} left={margin.left}>
//           <Tree
//             root={hierarchy(data, (d) => (d.isExpanded ? d.children : null))}
//             size={[innerWidth, innerHeight]}
//             separation={(a, b) => (a.parent === b.parent ? 0.1 : 0.1)} // Adjusted separation
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
//                   const nodeWidth = 100;
//                   const nodeHeight = 40;
//                   const top = node.x;
//                   const left = node.y;

//                   return (
//                     <Group top={top} left={left} key={key}>
//                       <circle
//                         cx={-nodeWidth / 2 - 10}
//                         cy={0}
//                         r={10}
//                         fill={node.data.isExpanded ? '#000000' : '#ffffff'}
//                         stroke="#000000"
//                         strokeWidth={2}
//                         onClick={() => handleNodeClick(node)}
//                         style={{ cursor: 'pointer' }}
//                       />
//                       <rect
//                         height={nodeHeight}
//                         width={nodeWidth}
//                         y={-nodeHeight / 2}
//                         x={-nodeWidth / 2}
//                         fill="#ffffff"
//                         stroke={node.data.children ? 'black' : 'gray'}
//                         strokeWidth={2}
//                         rx={10}
//                       />
//                       <text
//                         dy=".33em"
//                         fontSize={12}
//                         fontFamily="Arial"
//                         textAnchor="middle"
//                         style={{ pointerEvents: 'none' }}
//                         fill="black"
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
 /*
//TODO: important
import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { Group } from '@visx/group';
import { Tree, hierarchy } from '@visx/hierarchy';
import { HierarchyPointNode } from '@visx/hierarchy/lib/types';
import { LinkHorizontal } from '@visx/shape';
import { LinearGradient } from '@visx/gradient';
import yaml from 'js-yaml';
import SwaggerParser from '@apidevtools/swagger-parser';

const peach = '#fd9b93';
const pink = '#fe6e9e';
const blue = '#03c0dc';
const green = '#26deb0';
const plum = '#71248e';
const lightpurple = '#374469';
const white = '#ffffff';
export const background = '#272b4d';

interface TreeNode {
  name: string;
  children?: TreeNode[];
}

type HierarchyNode = HierarchyPointNode<TreeNode>;

const defaultMargin = { top: 20, left: 20, right: 20, bottom: 20 };

export type TreeProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  schemaName: string; // Schema name to fetch from OpenAPI YAML
};

// Node component
function Node({ node, toggleNode }: { node: HierarchyNode; toggleNode: (node: HierarchyNode) => void }) {
  const width = 40;
  const height = 20;
  const centerX = -width / 2;
  const centerY = -height / 2;
  const isRoot = node.depth === 0;
  const isParent = !!node.children;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    toggleNode(node);
  };

  if (isRoot) {
    return (
      <Group top={node.x} left={node.y}>
        <circle r={12} fill="url('#lg')" />
        <text
          dy=".33em"
          fontSize={9}
          fontFamily="Arial"
          textAnchor="middle"
          style={{ pointerEvents: 'none' }}
          fill={plum}
        >
          {node.data.name}
        </text>
      </Group>
    );
  } else if (isParent) {
    return (
      <Group top={node.x} left={node.y}>
        <rect
          height={height}
          width={width}
          y={centerY}
          x={centerX}
          fill={background}
          stroke={blue}
          strokeWidth={1}
          onClick={handleClick} // Ensure handleClick is set on the parent node
        />
        <text
          dy=".33em"
          fontSize={9}
          fontFamily="Arial"
          textAnchor="middle"
          style={{ pointerEvents: 'none' }}
          fill={white}
        >
          {node.data.name}
        </text>
      </Group>
    );
  }

  return (
    <Group top={node.x} left={node.y}>
      <rect
        height={height}
        width={width}
        y={centerY}
        x={centerX}
        fill={background}
        stroke={green}
        strokeWidth={1}
        strokeDasharray="2,2"
        strokeOpacity={0.6}
        rx={10}
        onClick={handleClick}
      />
      <text
        dy=".33em"
        fontSize={9}
        fontFamily="Arial"
        textAnchor="middle"
        fill={green}
        style={{ pointerEvents: 'none' }}
      >
        {node.data.name}
      </text>
    </Group>
  );
}

// Convert OpenAPI schema to tree data
const transformOpenApiToTree = (data: any, schemaName: string): TreeNode => {
  const definitions = data.components?.schemas || data.definitions;

  if (!definitions) {
    return { name: 'No Definitions', children: [] };
  }

  const schema = definitions[schemaName];

  const getSchemaNameFromRef = (ref: string): string => ref.split('/').pop()!;

  const transformSchemaToNode = (schema: any): TreeNode => {
    if (!schema) {
      return { name: schemaName, children: [] };
    }

    const transformProperties = (properties: any): TreeNode[] => {
      return Object.keys(properties).map((prop) => {
        const propSchema = properties[prop];
        let children: TreeNode[] = [];

        if (propSchema.$ref) {
          const refSchemaName = getSchemaNameFromRef(propSchema.$ref);
          children = [transformSchemaToNode(definitions[refSchemaName])];
        } else if (propSchema.type === 'object' && propSchema.properties) {
          children = transformProperties(propSchema.properties);
        } else if (propSchema.type === 'array' && propSchema.items) {
          children = propSchema.items.$ref
            ? [transformSchemaToNode(definitions[getSchemaNameFromRef(propSchema.items.$ref)])]
            : [];
        }

        return {
          name: prop,
          children,
        };
      });
    };

    return {
      name: schemaName,
      children: schema.properties ? transformProperties(schema.properties) : [],
    };
  };

  return transformSchemaToNode(schema);
};

export default function OpenAPITree({ width, height, margin = defaultMargin, schemaName }: TreeProps) {
  const [data, setData] = useState<TreeNode | null>(null);
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/airshopping.yaml');
        const yamlText = await response.text();
        const json = yaml.load(yamlText) as string;

        let openapi = await SwaggerParser.validate(json);
        const transformedData = transformOpenApiToTree(openapi, schemaName);
        setData(transformedData);
      } catch (error) {
        console.error('Error fetching or parsing YAML file:', error);
        setData({ name: 'Error loading data', children: [] });
      }
    };

    fetchData();
  }, [schemaName]);

  const toggleNode = useCallback((node: HierarchyNode) => {
    setExpandedNodes((prev) => ({
      ...prev,
      [node.data.name]: !prev[node.data.name],
    }));
  }, []);

  const yMax = height - margin.top - margin.bottom;
  const xMax = width - margin.left - margin.right;

  const treeData = useMemo(() => {
    if (!data) return null;

    const filterData = (node: TreeNode): TreeNode | null => {
      if (!expandedNodes[node.name] && node.children) {
        return { ...node, children: undefined };
      }

      return {
        ...node,
        children: node.children?.map((child) => filterData(child)).filter(Boolean) as TreeNode[],
      };
    };

    return hierarchy(filterData(data)!);
  }, [data, expandedNodes]);

  return width < 10 || !treeData ? null : (
    <svg width={width} height={height}>
      <LinearGradient id="lg" from={peach} to={pink} />
      <rect width={width} height={height} rx={14} fill={background} />
      <Tree<TreeNode> root={treeData} size={[yMax, xMax]} nodeSize={[100, 40]} separation={(a, b) => (a.parent === b.parent ? 1 : 0.5)}>
        {(tree) => (
          <Group top={margin.top} left={margin.left}>
            {tree.links().map((link, i) => (
              <LinkHorizontal
                key={`link-${i}`}
                data={link}
                stroke={lightpurple}
                strokeWidth="1"
                fill="none"
              />
            ))}
            {tree.descendants().map((node, i) => (
              <Node key={`node-${i}`} node={node} toggleNode={toggleNode} />
            ))}
          </Group>
        )}
      </Tree>
    </svg>
  );
}


*/
/*
import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { Group } from '@visx/group';
import { Tree, hierarchy } from '@visx/hierarchy';
import { HierarchyPointNode } from '@visx/hierarchy/lib/types';
import { LinkHorizontal } from '@visx/shape';
import { LinearGradient } from '@visx/gradient';
import yaml from 'js-yaml';
import SwaggerParser from '@apidevtools/swagger-parser';
import path from 'utils/treepath'

const peach = '#fd9b93';
const pink = '#fe6e9e';
const blue = '#03c0dc';
const green = '#26deb0';
const plum = '#71248e';
const lightpurple = '#374469';
const white = '#ffffff';
export const background = '#272b4d';

interface TreeNode {
  name: string;
  children?: TreeNode[];
}

type HierarchyNode = HierarchyPointNode<TreeNode>;

const defaultMargin = { top: 20, left: 20, right: 20, bottom: 20 };

export type TreeProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  schemaName: string; // Schema name to fetch from OpenAPI YAML
};

const CustomLink = ({ link }: { link: any }) => {
  const { source, target } = link;
  const path = `M${source.y},${source.x} 
                V${target.x} 
                H${target.y}`;

  return (
    <path
      d={path}
      fill="none"
      stroke={lightpurple}
      strokeWidth={1}
    />
  );
};

// Node component
function Node({ node, toggleNode }: { node: HierarchyNode; toggleNode: (node: HierarchyNode) => void }) {
  const width = 40;
  const height = 20;
  const centerX = -width / 2;
  const centerY = -height / 2;
  const isRoot = node.depth === 0;
  const isParent = !!node.children;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    toggleNode(node);
  };

  if (isRoot) {
    return (
      <Group top={node.x} left={node.y}>
        <circle r={12} fill="url('#lg')" />
        <text
          dy=".33em"
          fontSize={9}
          fontFamily="Arial"
          textAnchor="middle"
          style={{ pointerEvents: 'none' }}
          fill={plum}
        >
          {node.data.name}
        </text>
      </Group>
    );
  } else if (isParent) {
    return (
      <Group top={node.x} left={node.y}>
        <rect
          height={height}
          width={width}
          y={centerY}
          x={centerX}
          fill={background}
          stroke={blue}
          strokeWidth={1}
          onClick={handleClick} // Ensure handleClick is set on the parent node
        />
        <text
          dy=".33em"
          fontSize={9}
          fontFamily="Arial"
          textAnchor="middle"
          style={{ pointerEvents: 'none' }}
          fill={white}
        >
          {node.data.name}
        </text>
      </Group>
    );
  }

  return (
    <Group top={node.x} left={node.y}>
      <rect
        height={height}
        width={width}
        y={centerY}
        x={centerX}
        fill={background}
        stroke={green}
        strokeWidth={1}
        strokeDasharray="2,2"
        strokeOpacity={0.6}
        rx={10}
        onClick={handleClick}
      />
      <text
        dy=".33em"
        fontSize={9}
        fontFamily="Arial"
        textAnchor="middle"
        fill={green}
        style={{ pointerEvents: 'none' }}
      >
        {node.data.name}
      </text>
    </Group>
  );
}

// Convert OpenAPI schema to tree data
const transformOpenApiToTree = (data: any, schemaName: string): TreeNode => {
  const definitions = data.components?.schemas || data.definitions;

  if (!definitions) {
    return { name: 'No Definitions', children: [] };
  }

  const schema = definitions[schemaName];

  const getSchemaNameFromRef = (ref: string): string => ref.split('/').pop()!;

  const transformSchemaToNode = (schema: any): TreeNode => {
    if (!schema) {
      return { name: schemaName, children: [] };
    }

    const transformProperties = (properties: any): TreeNode[] => {
      return Object.keys(properties).map((prop) => {
        const propSchema = properties[prop];
        let children: TreeNode[] = [];

        if (propSchema.$ref) {
          const refSchemaName = getSchemaNameFromRef(propSchema.$ref);
          children = [transformSchemaToNode(definitions[refSchemaName])];
        } else if (propSchema.type === 'object' && propSchema.properties) {
          children = transformProperties(propSchema.properties);
        } else if (propSchema.type === 'array' && propSchema.items) {
          children = propSchema.items.$ref
            ? [transformSchemaToNode(definitions[getSchemaNameFromRef(propSchema.items.$ref)])]
            : [];
        }

        return {
          name: prop,
          children,
        };
      });
    };

    return {
      name: schemaName,
      children: schema.properties ? transformProperties(schema.properties) : [],
    };
  };

  return transformSchemaToNode(schema);
};

export default function OpenAPITree({ width, height, margin = defaultMargin, schemaName }: TreeProps) {
  const [data, setData] = useState<TreeNode | null>(null);
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/airshopping.yaml');
        const yamlText = await response.text();
        const json = yaml.load(yamlText) as string;

        let openapi = await SwaggerParser.validate(json);
        const transformedData = transformOpenApiToTree(openapi, schemaName);
        setData(transformedData);

        // Initialize all nodes to be expanded by default
        const initializeExpandedNodes = (node: TreeNode, expanded: Record<string, boolean> = {}): Record<string, boolean> => {
          expanded[node.name] = true;
          if (node.children) {
            node.children.forEach((child) => initializeExpandedNodes(child, expanded));
          }
          return expanded;
        };

        const initialExpanded = initializeExpandedNodes(transformedData);
        setExpandedNodes(initialExpanded);
      } catch (error) {
        console.error('Error fetching or parsing YAML file:', error);
        setData({ name: 'Error loading data', children: [] });
      }
    };

    fetchData();
  }, [schemaName]);

  const toggleNode = useCallback((node: HierarchyNode) => {
    setExpandedNodes((prev) => ({
      ...prev,
      [node.data.name]: !prev[node.data.name],
    }));
  }, []);

  const yMax = height - margin.top - margin.bottom;
  const xMax = width - margin.left - margin.right;

  const treeData = useMemo(() => {
    if (!data) return null;

    const filterData = (node: TreeNode): TreeNode | null => {
      if (!expandedNodes[node.name] && node.children) {
        return { ...node, children: undefined };
      }

      return {
        ...node,
        children: node.children?.map((child) => filterData(child)).filter(Boolean) as TreeNode[],
      };
    };

    return hierarchy(filterData(data)!);
  }, [data, expandedNodes]);

  return width < 10 || !treeData ? null : (
    <svg width={width} height={height}>
      <LinearGradient id="lg" from={peach} to={pink} />
      <rect width={width} height={height} rx={14} fill={background} />
      <Tree<TreeNode>
  root={treeData}
  size={[yMax, xMax]} // Layout to ensure the tree expands downward and right
  nodeSize={[50, 150]} // Adjust for right-hand alignment and spacing
  separation={(a, b) => (a.parent === b.parent ? 1 : 0.5)}
>
  {(tree) => (
    <Group top={margin.top} left={margin.left}>
      { }
      {tree.links().map((link, i) => (
        <CustomLink key={`link-${i}`} link={link} />
      ))}
      { }
      {tree.descendants().map((node, i) => (
        <Node key={`node-${i}`} node={node} toggleNode={toggleNode} />
      ))}
    </Group>
  )}
</Tree>
    </svg>
  );
}
*/

import React, { useEffect, useState } from 'react';
import { Group } from '@visx/group';
import { hierarchy, Tree } from '@visx/hierarchy';
import { LinearGradient } from '@visx/gradient';
import yaml from 'js-yaml';
import useForceUpdate from './useForceUpdate';
import LinkControls from './LinkControls';
import getLinkComponent from './getLinkComponent';
import styles from './openapitree.module.css';
import SwaggerParser from "@apidevtools/swagger-parser";

export interface TreeNode {
  name: string;
  isExpanded?: boolean;
  children?: TreeNode[];
  dataType?: string;
}

const defaultMargin = { top: 30, left: 30, right: 30, bottom: 70 };

export type LinkTypesProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  schemaName: string;
};

const transformOpenApiToTree = (data: any, schemaName: string): TreeNode => {
  const definitions = data.components?.schemas || data.definitions;

  if (!definitions) {
    return { name: 'No Definitions', children: [], isExpanded: false };
  }

  const schema = definitions[schemaName];

  const getSchemaNameFromRef = (ref: string): string => ref.split('/').pop()!;

  const transformSchemaToNode = (schema: any): TreeNode => {
    if (!schema) {
      return { name: schemaName, children: [], isExpanded: false };
    }

    const transformProperties = (properties: any): TreeNode[] => {
      return Object.keys(properties).map((prop) => {
        const propSchema = properties[prop];
        let children: TreeNode[] = [];

        if (propSchema.$ref) {
          const refSchemaName = getSchemaNameFromRef(propSchema.$ref);
          children = [transformSchemaToNode(definitions[refSchemaName])];
        } else if (propSchema.type === 'object' && propSchema.properties) {
          children = transformProperties(propSchema.properties);
        } else if (propSchema.type === 'array' && propSchema.items) {
          children = propSchema.items.$ref
            ? [transformSchemaToNode(definitions[getSchemaNameFromRef(propSchema.items.$ref)])]
            : [];
        }

        return {
          name: prop,
          dataType: propSchema.$ref ? "reference" : propSchema.type,
          children,
          isExpanded: false,
        };
      });
    };

    return {
      name: schemaName,
      children: schema.properties ? transformProperties(schema.properties) : [],
      isExpanded: true,
    };
  };

  return transformSchemaToNode(schema);
};

export default function OpenAPITree({
  width: totalWidth,
  height: totalHeight,
  margin = defaultMargin,
  schemaName,
}: LinkTypesProps) {
  const [data, setData] = useState<TreeNode>({ name: 'Loading...', children: [] });
  const [layout, setLayout] = useState<string>('cartesian');
  const [orientation, setOrientation] = useState<string>('horizontal'); // Horizontal orientation
  const [linkType, setLinkType] = useState<string>('step'); // Changed link type to step for better alignment
  const [stepPercent, setStepPercent] = useState<number>(0.5);
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/airshopping.yaml');
        const yamlText = await response.text();
        const json = yaml.load(yamlText) as string;

        let openapi = await SwaggerParser.validate(json);
        const transformedData = transformOpenApiToTree(openapi, schemaName);
        setData(transformedData);
      } catch (error) {
        console.error('Error fetching or parsing YAML file:', error);
        setData({ name: 'Error loading data', children: [] });
      }
    };
    fetchData();
  }, [schemaName]);

  const innerWidth = totalWidth - margin.left - margin.right;
  const innerHeight = totalHeight - margin.top - margin.bottom;

  const handleNodeClick = (node: any) => {
    const updateNode = (currentNode: TreeNode): TreeNode => {
      if (currentNode.name === node.data.name) {
        return {
          ...currentNode,
          isExpanded: !currentNode.isExpanded,
        };
      }
      return {
        ...currentNode,
        children: currentNode.children
          ? currentNode.children.map((child) => updateNode(child))
          : [],
      };
    };

    const updatedTree = updateNode(data);
    setData(updatedTree);
    forceUpdate();
  };

  // Updated origin to place the main node at the top left
  // Update size to give more horizontal space and less vertical space
  const size = [innerWidth, innerHeight]; // Updated to support horizontal layout

  let origin: { x: number; y: number };
  let sizeWidth: number;
  let sizeHeight: number;

  if (layout === 'polar') {
    origin = { x: innerWidth / 2, y: innerHeight / 2 };
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
    <div className={styles.container}>
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
        <rect width={totalWidth} height={window.innerHeight} rx={10} fill="#987435" />
        <Group top={margin.top} left={margin.left}>
          <Tree
            root={hierarchy(data, (d) => (d.isExpanded ? d.children : null))}
            size={[innerWidth, innerHeight]}
            separation={(a, b) => (a.parent === b.parent ? 0.2 : 0.2)} // Adjusted separation to reduce node distance
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
                  const nodeWidth = 100;
                  const nodeHeight = 40;
                  const top = node.x;
                  const left = node.y;

                  return (
                    <Group top={top} left={left} key={key}>
                      <circle
                        cx={-nodeWidth / 2 - 10}
                        cy={0}
                        r={10}
                        fill={node.data.isExpanded ? '#000000' : '#ffffff'}
                        stroke="#000000"
                        strokeWidth={2}
                        onClick={() => handleNodeClick(node)}
                        style={{ cursor: 'pointer' }}
                      />
                      <rect
                        height={nodeHeight}
                        width={nodeWidth}
                        y={-nodeHeight / 2}
                        x={-nodeWidth / 2}
                        fill="#ffffff"
                        stroke={node.data.children ? 'black' : 'gray'}
                        strokeWidth={2}
                        rx={10}
                      />
                      <text
                        dy=".33em"
                        fontSize={12}
                        fontFamily="Arial"
                        textAnchor="middle"
                        style={{ pointerEvents: 'none' }}
                        fill="black"
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
