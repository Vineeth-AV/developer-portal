// 'use client';
// import React, { useEffect, useState } from 'react';
// import * as yaml from 'js-yaml';

// interface Schema {
//   name: string;
// }

// const OpenApiSchemas: React.FC = () => {
//   const [schemas, setSchemas] = useState<Schema[]>([]);

//   useEffect(() => {
//     const fetchOpenApiSpec = async () => {
//       const response = await fetch('airshopping.yaml');
//       const yamlText = await response.text();
//       const openApiSpec = yaml.load(yamlText) as any;

//       const schemaNames = Object.keys(openApiSpec.components.schemas).map((schemaName) => ({
//         name: schemaName,
//       }));

//       setSchemas(schemaNames);
//     };

//     fetchOpenApiSpec();
//   }, []);

//   return (
//     <div>
//       <h1>OpenAPI Schemas</h1>
//       <ul>
//         {schemas.map((schema, index) => (
//           <li key={index}>{schema.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default OpenApiSchemas;
// app/schemas/page.tsx
// app/components/SchemaList.tsx
'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './schemaList.module.css'

// Define a TypeScript type for schema data
interface Schema {
  type: string;
  properties?: Record<string, any>;
  items?: Schema;
  format?: string;
  example?: any;
  required?: string[];
}

interface SchemaListResponse {
  [key: string]: Schema;
}

const SchemaList = () => {
  const router = useRouter();
  const [schemas, setSchemas] = useState<SchemaListResponse>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSchemas = async () => {
      try {
        const response = await fetch('/api/schemas');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: SchemaListResponse = await response.json();
        setSchemas(data);
      } catch (error) {
        console.error('Error fetching schemas:', error);
        setError('Failed to load schemas');
      }
    };

    fetchSchemas();
  }, []);

  const handleClick = (schemaName: string) => {
    localStorage.setItem('selectedSchema', JSON.stringify(schemas[schemaName]));
    router.push(`/schema/${schemaName}`);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Schema List</h1>
      <ul className={styles.list}>
        {Object.keys(schemas).length === 0 ? (
          <li>No schemas available</li>
        ) : (
          Object.keys(schemas).map((key) => (
            <li
              key={key}
              onClick={() => handleClick(key)}
              className={styles.listItem}
            >
              {key}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default SchemaList;
