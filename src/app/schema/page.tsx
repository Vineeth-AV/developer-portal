'use client';

import React, { useEffect, useState } from 'react';
import OpenAPITree from '@/components/OpenAPITree';
import { useSearchParams } from 'next/navigation';

export default function SchemaViewer() {
  const searchParams = useSearchParams();
  const [schemaName, setSchemaName] = useState<string | null>(null);

  const width = 1200;
  const height = 800;
  const margin = { top: 30, left: 70, right: 70, bottom: 70 };

  useEffect(() => {
    const schemaParam = searchParams.get('schema');
    if (schemaParam) {
      setSchemaName(schemaParam);
    } else {
      const storedSchema = localStorage.getItem('selectedSchema');
      if (storedSchema) {
        setSchemaName(JSON.parse(storedSchema).name);
      } else {
        console.error('No schema selected');
      }
    }
  }, [searchParams]);

  return (
    <div style={{ height: '250vh' }}>
      <h1>OpenAPI Tree Visualization</h1>
      {schemaName ? (
        <OpenAPITree
          width={width}
          height={height}
          margin={margin}
          schemaName={schemaName} // Pass schemaName to OpenAPITree
        />
      ) : (
        <p>Loading schema...</p>
      )}
    </div>
  );
}
