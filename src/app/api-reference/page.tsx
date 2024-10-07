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

"use client"
import React, { useEffect, useState } from 'react';
import { API } from '@stoplight/elements';
import '@stoplight/elements/styles.min.css';

const ApiReference = () => {
  const [apiUrl, setApiUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchYamlFile = async () => {
      // Append GitHub token to the URL
      const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;  // Make sure this environment variable is set
      const yamlUrl = `https://raw.githubusercontent.com/Vineeth-AV/deveoper-portal-docs/refs/heads/main/api-reference/airshopping.yaml?token=${token}`;

      const response = await fetch(yamlUrl);
      if (response.ok) {
        setApiUrl(response.url);
      } else {
        console.error('Error fetching YAML:', response.statusText);
      }
    };
    fetchYamlFile();
  }, []);


  if (!apiUrl) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <API
        apiDescriptionUrl={apiUrl}
        layout="sidebar"  // Customize layout if needed
        router="hash"
      />
    </div>
  );
};

export default ApiReference;


