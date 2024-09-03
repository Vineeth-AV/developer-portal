// // app/api/schemas/route.ts
// import { NextResponse } from 'next/server';
// import yaml from 'js-yaml';
// import fs from 'fs';
// import path from 'path';
// import { Components } from 'types/openapi';

// export async function GET() {
//   try {
//     const filePath = path.join(process.cwd(), 'airshopping', 'openapi.yaml');
//     const fileContents = fs.readFileSync(filePath, 'utf8');
//     const data: Components = yaml.load(fileContents) as Components;

//     return NextResponse.json(data.schemas);
//   } catch (error) {
//     console.error('Error reading or parsing YAML file:', error);
//     return NextResponse.error();
//   }
// }

// app/api/schemas/route.ts
// app/api/schemas/route.ts
// app/api/schemas/route.ts

// app/api/schemas/route.ts
// app/api/schemas/route.ts
import { NextResponse } from 'next/server';
import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

// Define types for the expected structure of the YAML data
interface Schema {
  type: string;
  properties?: Record<string, any>;
  items?: Schema;
  format?: string;
  example?: any;
  required?: string[];
}

interface Components {
  schemas: Record<string, Schema>;
}

interface OpenAPISpec {
  components?: Components;
}

export async function GET() {
  try {
    // Fetch the YAML file from the public directory
    const filePath = path.join(process.cwd(), 'public', 'airshopping.yaml');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    
    // Parse YAML content
    const data: OpenAPISpec = yaml.load(fileContents) as OpenAPISpec;
    
    // Extract only the schemas
    const schemas = data.components?.schemas || {};

    return NextResponse.json(schemas);
  } catch (error) {
    console.error('Error fetching or parsing YAML file:', error);
    return NextResponse.error();
  }
}
