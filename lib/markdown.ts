// // lib/markdown.ts

import axios from 'axios';
import Markdoc, { Config } from "@markdoc/markdoc";
import config from "markdoc/schema";
import yaml from "js-yaml";

const GITHUB_API_URL = 'https://api.github.com/repos/Vineeth-AV/deveoper-portal-docs/contents/';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;  // Ensure this is set in .env.local

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
  


export async function getAllMarkdownFiles(dirPath: string, arrayOfFiles: string[] = []): Promise<string[]> {
  try {
    const files = await fetchFilesFromGitHub(dirPath);
    
    for (const file of files) {
      if (file.type === 'dir') {
        arrayOfFiles = await getAllMarkdownFiles(file.path, arrayOfFiles);
      } else if (file.name.endsWith('.md')) {
        arrayOfFiles.push(file.download_url);
      }
    }

    console.log("All Markdown Files:", arrayOfFiles);
    return arrayOfFiles;
  } catch (error) {
    console.error('Error in getAllMarkdownFiles:', error);
    throw error;
  }
}

export async function getMarkdownContent(slug: string) {
  console.log("getMarkdownContent slug:", slug);
  
  // const baseURL = "https://raw.githubusercontent.com/Vineeth-AV/deveoper-portal-docs/refs/heads/main/content/";
  // let filePath = "";

  // if (slug) {
  //   // If slug is provided and does not end with .md, append '/index.md'
  //   if (!slug.endsWith(".md")) {
  //     filePath = `${baseURL}${slug}/index.md`;
  //   } else {
  //     filePath = `${baseURL}${slug}`;
  //   }
  // } else {
  //   // Default to 'index.md' if no slug is provided
  //   filePath = `${baseURL}index.md`;
  // }

  // console.log("getMarkdownContent filePath:", filePath);

  // try {
  //   const res = await fetch(filePath, {
  //     headers: {
  //       Authorization: `token ${GITHUB_TOKEN}`,
  //     },
  //   });

  //   if (!res.ok) {
  //     throw new Error(`Failed to fetch markdown content: ${res.statusText}`);
  //   }

  //   const fileContent = await res.text();

  //   if (!fileContent) return { content: null };

  //   let frontmatter;
  //   if (fileContent) {
  //     const ast = Markdoc.parse(fileContent);
  //     frontmatter = ast.attributes.frontmatter
  //       ? yaml.load(ast.attributes.frontmatter)
  //       : {};
  //   }

   // Build the base path from the slug
   const basePathFromSlug = `https://raw.githubusercontent.com/Vineeth-AV/deveoper-portal-docs/main/content/${slug}`;

   console.log("getMarkdownContent basePathFromSlug:", basePathFromSlug);

   // Directly try to fetch the file
   let filePath = `${basePathFromSlug}.md`;
   console.log("getMarkdownContent filePath:", filePath + `?token=${process.env.GITHUB_TOKEN}`);
 try {
   const res = await fetch(filePath + `?token=${process.env.GITHUB_TOKEN}`);

   // Check if the markdown file exists
   if (res.status === 404) {
       // If it does not exist, try fetching the index.md file from the directory
       const indexPath = `${basePathFromSlug}/index.md`;
       const indexRes = await fetch(indexPath + `?token=${process.env.GITHUB_TOKEN}`);

       if (indexRes.ok) {
           const indexContent = await indexRes.text();
           const ast = Markdoc.parse(indexContent);
           const frontmatter = ast.attributes.frontmatter ? yaml.load(ast.attributes.frontmatter) : {};
           const tokenizer = new Markdoc.Tokenizer({ allowComments: true });
           const tokens = tokenizer.tokenize(indexContent);
           const astTransformed = Markdoc.parse(tokens);

           // Transform the Markdoc AST
           const updatedConfig: Config = {
            ...config,
            variables: {
              frontmatter,
              path: slug,
            },
          };
          return {
            content: Markdoc.transform(astTransformed, updatedConfig),
            frontmatter: (frontmatter as any) || {},
          };
       }
       return { content: null };
   }

   // If the markdown file exists, read its content
   const fileContent = await res.text();
   const ast = Markdoc.parse(fileContent);
   const frontmatter = ast.attributes.frontmatter ? yaml.load(ast.attributes.frontmatter) : {};


    // Transform the markdoc
    const tokenizer = new Markdoc.Tokenizer({ allowComments: true });
    const tokens = tokenizer.tokenize(fileContent);
    const astTransformed = Markdoc.parse(tokens);
    const updatedConfig: Config = {
      ...config,
      variables: {
        frontmatter,
        path: slug,
      },
    };
    return {
      content: Markdoc.transform(astTransformed, updatedConfig),
      frontmatter: (frontmatter as any) || {},
    };
  } catch (error: any) {
    console.error('Error fetching markdown content:', error.message || error);
    return { content: null, frontmatter: {} };
  }
}




/*
// lib/markdown.ts

import Markdoc, { Config } from "@markdoc/markdoc";
import config from "markdoc/schema";
import yaml from "js-yaml";
import path from "path";
import axios from "axios";

interface GitHubFile {
  name: string;
  path: string;
  type: 'file' | 'dir';
  download_url: string | null;
}

export async function getAllMarkdownFiles(
  dirPath: string,
  arrayOfFiles: string[] = []
): Promise<string[]> {
  try {
    // Fetch markdown files from the API route
    const response = await axios.get('http://localhost:3000/api/githubApi');
    const data: GitHubFile[] = response.data;

    console.log("Data fetched from API:", data);

    // Loop through the data returned from the API
    for (const file of data) {
      if (file.type === 'dir') {
        // Recursively fetch files from subdirectories
        arrayOfFiles = await getAllMarkdownFiles(file.path, arrayOfFiles);
      } else if (file.name.endsWith('.md')) {
        // Add the relative path of the markdown file
        arrayOfFiles.push(file.path); // Changed from download_url to path
      }
    }

    console.log("All Markdown Files:", arrayOfFiles);
    return arrayOfFiles;
  } catch (error: any) {
    console.error('Error in getAllMarkdownFiles:', error.message || error);
    throw new Error('Failed to fetch markdown files');
  }
}

export async function getMarkdownContent(slug: string) {
  console.log("getMarkdownContent slug:", slug);
  const baseURL = "https://raw.githubusercontent.com/Vineeth-AV/deveoper-portal-docs/refs/heads/main/content/";
  
  let filePath = "";
  if (slug.endsWith(".md")) {
    filePath = `${baseURL}${slug}`;
  } else {
    filePath = `${baseURL}${slug}/index.md`;
  }

  console.log("getMarkdownContent filePath:", filePath + `?token=${process.env.GITHUB_TOKEN}`);

  try {
    const res = await fetch(filePath + `?token=${process.env.GITHUB_TOKEN}`);
    if (!res.ok) {
      console.error(`Failed to fetch markdown content: ${res.statusText}`);
      return { content: null };
    }
    const fileContent = await res.text();

    if (!fileContent) return { content: null };

    // Parse frontmatter
    let frontmatter;
    const ast = Markdoc.parse(fileContent);
    frontmatter = ast.attributes.frontmatter
      ? yaml.load(ast.attributes.frontmatter)
      : {};

    // Transform the Markdoc
    const tokenizer = new Markdoc.Tokenizer({ allowComments: true });
    const tokens = tokenizer.tokenize(fileContent);
    const parsedAst = Markdoc.parse(tokens);
    const updatedConfig: Config = {
      ...config,
      variables: {
        frontmatter,
        path: slug,
      },
    };
    const transformedContent = Markdoc.transform(parsedAst, updatedConfig);

    return {
      content: transformedContent,
      frontmatter: (frontmatter as any) || {},
    };
  } catch (error: any) {
    console.error('Error fetching markdown content:', error.message || error);
    return { content: null };
  }
}
*/