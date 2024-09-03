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
import styles from 'styles/schemalist.module.css'; // Correct path to CSS module

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

const SchemaList: React.FC = () => {
  const router = useRouter();
  const [schemas, setSchemas] = useState<SchemaListResponse>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSchemas = async () => {
      try {
        const response = await fetch('/api/schemas');
        if (!response.ok) throw new Error('Failed to fetch schemas');
        
        const data: SchemaListResponse = await response.json();
        setSchemas(data);
      } catch (err) {
        console.error('Error fetching schemas:', err);
        setError('Failed to load schemas');
      }
    };

    fetchSchemas();
  }, []);

  // const handleSchemaClick = (schemaName: string) => {
  //   localStorage.setItem('selectedSchema', JSON.stringify(schemas[schemaName]));
  //   router.push(`/schema`);
  // };

  const handleSchemaClick = (schemaName: string) => {
    localStorage.setItem('selectedSchema', JSON.stringify({ name: schemaName }));
    router.push(`/schema?schema=${schemaName}`);
};
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles['container']}>
      <h1 className={styles.title}>Schema List</h1>
      <ul className={styles.list}>
        {Object.keys(schemas).length === 0 ? (
          <li>No schemas available</li>
        ) : (
          Object.keys(schemas).map((schemaName) => (
            <li
              key={schemaName}
              onClick={() => handleSchemaClick(schemaName)}
              className={styles['listColumn']} // Correct usage of hyphenated class name
            >
              {schemaName}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default SchemaList;


