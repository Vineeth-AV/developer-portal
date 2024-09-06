// utils/parseSchema.ts
// utils/parseSchema.ts
// utils/parseSchema.ts
/*export interface SchemaNode {
    name: string;
    children?: SchemaNode[];
  }
  
  export const transformOpenAPIToComponentTree = (schema: any): SchemaNode => {
    // Extract the definitions from the OpenAPI schema
    const definitions = schema.components?.schemas || schema.definitions;
  
    if (!definitions) return { name: 'No Definitions', children: [] };
  
    // Convert definitions to SchemaNode format
    const nodes: SchemaNode[] = Object.keys(definitions).map(key => {
      const definition = definitions[key];
      return {
        name: key,
        children: definition.properties
          ? Object.keys(definition.properties).map(propKey => ({
              name: propKey,
              children: definition.properties[propKey].$ref
                ? [transformOpenAPIToComponentTree({ components: { schemas: { [definition.properties[propKey].$ref.split('/').pop()!]: definitions[definition.properties[propKey].$ref.split('/').pop()!] } } })]
                : [],
            }))
          : [],
      };
    });
  
    // Remove the root "Component" node
    return { name: 'Root', children: nodes };
  };*/
  
  export interface TreeNode {
    name: string;
    isExpanded?: boolean;
    children?: TreeNode[];
    dataType?: string;
  }
  
  export  const transformOpenApiToTree = (data: any, schemaName: string): TreeNode => {
    const definitions = data.components?.schemas || data.definitions;
    if (!definitions) return { name: 'No Definitions', children: [], isExpanded: false };
  
    const schema = definitions[schemaName];
    const transformSchemaToNode = (schema: any): TreeNode => {
      if (!schema) return { name: schemaName, children: [], isExpanded: false };
  
      const properties = schema.properties
        ? Object.keys(schema.properties).map((prop) => {
            const propSchema = schema.properties[prop];
            
            if (propSchema.$ref) {
              const refSchemaName = propSchema.$ref.split('/').pop()!;
              return {
                name: prop,
                dataType: "reference",
                children: [transformSchemaToNode(definitions[refSchemaName])],
                isExpanded: false,
              };
            }
  
            if (propSchema.type === 'object' && propSchema.properties) {
              return {
                name: prop,
                dataType: propSchema.type,
                children: Object.keys(propSchema.properties).map((nestedProp) => {
                  const nestedPropSchema = propSchema.properties[nestedProp];
                  if (nestedPropSchema.$ref) {
                    const nestedRefSchemaName = nestedPropSchema.$ref.split('/').pop()!;
                    return {
                      name: nestedProp,
                      dataType: "reference",
                      children: [transformSchemaToNode(definitions[nestedRefSchemaName])],
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
                          children: [],
                          isExpanded: false,
                        }))
                      : [],
                    isExpanded: false,
                  };
                }),
                isExpanded: false,
              };
            }
  
            if (propSchema.type === 'array' && propSchema.items) {
              return {
                name: prop,
                dataType: 'array',
                children: propSchema.items.$ref
                  ? [transformSchemaToNode(definitions[propSchema.items.$ref.split('/').pop()!])]
                  : [],
                isExpanded: false,
              };
            }
  
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
        isExpanded: true,
      };
    };
  
    return transformSchemaToNode(schema);
  };