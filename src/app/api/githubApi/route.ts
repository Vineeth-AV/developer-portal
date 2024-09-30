// // pages/api/githubApi.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

interface GitHubFile {
  name: string;
  path: string;
  type: 'file' | 'dir';
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
}

const GITHUB_API_URL = 'https://api.github.com/repos/Vineeth-AV/deveoper-portal-docs/contents/';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;  // Ensure this is set in .env.local

// Function to recursively fetch files from a directory in GitHub
async function fetchFilesFromGitHub(dirPath: string): Promise<GitHubFile[]> {
  console.log('Fetching path:', dirPath);
  
  try {
    const response = await axios.get(`${GITHUB_API_URL}${dirPath}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`, // Use your GitHub token for private repositories
      },
      params: {
        ref: 'main', // Specifies the branch (default is 'main')
      },
    });

    const files: GitHubFile[] = response.data;
    let allFiles: GitHubFile[] = [];

    for (const file of files) {
      console.log('Processing file:', file.path);

      if (file.type === 'dir') {
        // Recursively fetch files from the subdirectory using file.path
        const subDirFiles = await fetchFilesFromGitHub(file.path);
        allFiles = [...allFiles, ...subDirFiles];
      } else if (file.type === 'file') {
        // Add the file to the list
        allFiles.push(file);
      }
    }

    console.log('Total files fetched:', allFiles.length);
    return allFiles;
  } catch (error: any) {
    console.error('Error fetching content:', error.message || error);
    throw new Error('Failed to fetch files from GitHub');
  }
}

// Next.js API route handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Start fetching files from the 'content' folder
    const allFiles = await fetchFilesFromGitHub('content');
    
    // Return the list of all files as JSON
    return res.status(200).json(allFiles);
  } catch (error: any) {
    console.error('Error fetching markdown files:', error.message || error);
    return res.status(500).json({ error: 'Failed to fetch data' });
  }
}


// // pages/api/githubApi.ts

// import type { NextApiRequest, NextApiResponse } from 'next';
// import axios from 'axios';

// const GITHUB_API_URL = 'https://api.github.com/repos/Vineeth-AV/deveoper-portal-docs/contents/';
// const GITHUB_TOKEN = process.env.GITHUB_TOKEN;  // Ensure the token is correctly set in .env.local

// interface GitHubFile {
//   name: string;
//   path: string;
//   type: 'file' | 'dir';
//   download_url: string | null;
// }

// async function fetchFilesFromGitHub(dirPath: string): Promise<GitHubFile[]> {
//   console.log('Fetching path:', dirPath);
  
//   try {
//     const response = await axios.get(`${GITHUB_API_URL}${dirPath}`, {
//       headers: {
//         Authorization: `token ${GITHUB_TOKEN}`,
//       },
//       params: {
//         ref: 'main',
//       },
//     });

//     const files: GitHubFile[] = response.data;
//     let allFiles: GitHubFile[] = [];

//     for (const file of files) {
//       console.log('Processing file:', file.path);

//       if (file.type === 'dir') {
//         const subDirFiles = await fetchFilesFromGitHub(file.path);
//         allFiles = [...allFiles, ...subDirFiles];
//       } else if (file.type === 'file') {
//         allFiles.push({
//           name: file.name,
//           path: file.path,
//           type: file.type,
//           download_url: file.download_url,
//         });
//       }
//     }

//     console.log('Total files fetched:', allFiles.length);
//     return allFiles;
//   } catch (error: any) {
//     console.error('Error fetching content:', error.message || error);
//     throw new Error('Failed to fetch files from GitHub');
//   }
// }

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     const allFiles = await fetchFilesFromGitHub('content');
//     return res.status(200).json(allFiles);
//   } catch (error: any) {
//     console.error('Error fetching markdown files:', error.message || error);
//     return res.status(500).json({ error: 'Failed to fetch data' });
//   }
// }

