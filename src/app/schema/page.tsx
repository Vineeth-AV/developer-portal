'use client';

import React, { useEffect, useState } from 'react';
import OpenAPITree from '@/components/OpenAPITree';
import { useSearchParams } from 'next/navigation';
import styles from './schema.module.css'; // Correct path to CSS module

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
    <div className={styles.container}>
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
