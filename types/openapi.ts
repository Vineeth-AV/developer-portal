// types/openapi.ts
export interface SchemaProperty {
    type: string;
    format?: string;
    items?: SchemaProperty;
  }
  
  export interface Schema {
    type: string;
    properties?: { [key: string]: SchemaProperty };
    items?: SchemaProperty;
    required?: string[];
  }
  
  export interface Components {
    schemas: { [key: string]: Schema };
  }
  