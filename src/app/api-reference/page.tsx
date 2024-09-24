// pages/api-docs.js
/*import { NextPage } from 'next';
import { API } from '@stoplight/elements';
import Head from 'next/head';

const ApiReference : NextPage = () => {
  const apiDescriptionUrl = 'https://api.apis.guru/v2/specs/github.com/1.1.4/openapi.yaml';
  const router = 'history';

  return (
    <div>
    <Head>
      <title>About</title>
    </Head>
    <h1>About</h1>
    <p>This is the about page.</p>
  </div>
  );
};

export default ApiReference;
*/
// pages/docs.tsx
// app/api-reference/page.tsx

'use client'; // Ensure this component runs on the client side

import { useEffect, useState } from 'react';
import { API } from '@stoplight/elements';
import '@stoplight/elements/styles.min.css';

const ApiReference = () => {
  const [specUrl, setSpecUrl] = useState<string | null>(null);

  useEffect(() => {
    // Set the URL for your OpenAPI JSON document
    setSpecUrl('/airshopping.yaml'); // Ensure this path is correct for your public folder
  }, []);

  return (
    <div style={{marginTop: '100px', height: '200vh' }}>
      {specUrl ? (
        <API apiDescriptionUrl={specUrl} router="hash" />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ApiReference;

