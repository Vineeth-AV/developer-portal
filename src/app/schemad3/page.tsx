// pages/index.tsx
"use client"
import React, { useEffect, useState } from 'react';
import SchemaTree from 'components/SchemaTree';
import yaml from 'js-yaml';

const HomePage: React.FC = () => {
  const [schema, setSchema] = useState<any>(null);

  useEffect(() => {
    const fetchSchema = async () => {
      try {
        const response = await fetch('/airshopping1.yaml'); // Adjust path as necessary
        const yamlText = await response.text();
        const openAPISchema = yaml.load(yamlText);
        setSchema(openAPISchema);
      } catch (error) {
        console.error('Error fetching or parsing schema:', error);
      }
    };

    fetchSchema();
  }, []);

  return (
    <div>
      <h1>OpenAPI Schema Visualization</h1>
      {schema ? <SchemaTree schema={schema} /> : <p>Loading schema...</p>}
    </div>
  );
};

export default HomePage;
