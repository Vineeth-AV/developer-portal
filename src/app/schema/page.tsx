
'use client'; // Ensure this component runs on the client side

import OpenAPITree from '@/components/OpenAPITree';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';


// Define the functional component for the About page
export default function SchemaViewer() {
  const router = useRouter();
  const [schema, setSchema] = useState<any>(null);

  const width = 1200;  // Define the width of the tree visualization
  const height = 800; // Define the height of the tree visualization
  const margin = { top: 30, left: 70, right: 70, bottom: 70 }; // Define margins
  useEffect(() => {
    
  }, []);

  return (
    <div style={{ height: '250vh' }}>
      <h1>About Us</h1>
      <p>Welcome to the About page of our website.</p>
      <p>
        This page is designed to give you more information about our company, our mission, and our team.
      </p>
       
      <h1>OpenAPI Tree Visualization</h1>
      <OpenAPITree
        width={width}
        height={height}
        margin={margin}
      />
      
    </div>
  );
};

// Export the component as default
 