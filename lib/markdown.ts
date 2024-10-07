// // lib/markdown.ts

import axios from "axios";
import Markdoc, { Config } from "@markdoc/markdoc";
import config from "markdoc/schema";
import yaml from "js-yaml";

const GITHUB_API_URL = process.env.GITHUB_API_URL;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // Ensure this is set in .env.local

interface GitHubFile {
  name: string;
  path: string;
  type: "file" | "dir";
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
}

// Function to recursively fetch files from a directory in GitHub
async function fetchFilesFromGitHub(dirPath: string): Promise<GitHubFile[]> {
  try {
    const response = await axios.get(`${GITHUB_API_URL}${dirPath}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`, // Use your GitHub token for private repositories
      },
      params: {
        ref: "main", // Specifies the branch (default is 'main')
      },
    });

    const files: GitHubFile[] = response.data;
    let allFiles: GitHubFile[] = [];

    for (const file of files) {
      if (file.type === "dir") {
        // Recursively fetch files from the subdirectory using file.path
        const subDirFiles = await fetchFilesFromGitHub(file.path);
        allFiles = [...allFiles, ...subDirFiles];
      } else if (file.type === "file") {
        // Add the file to the list
        allFiles.push(file);
      }
    }

    return allFiles;
  } catch (error: any) {
    console.error("Error fetching content:", error.message || error);
    throw new Error("Failed to fetch files from GitHub");
  }
}

export async function getAllMarkdownFiles(
  dirPath: string,
  arrayOfFiles: string[] = []
): Promise<string[]> {
  try {
    const files = await fetchFilesFromGitHub(dirPath);

    for (const file of files) {
      if (file.type === "dir") {
        arrayOfFiles = await getAllMarkdownFiles(file.path, arrayOfFiles);
      } else if (file.name.endsWith(".md")) {
        arrayOfFiles.push(file.download_url);
      }
    }
     return arrayOfFiles;
  } catch (error) {
    console.error("Error in getAllMarkdownFiles:", error);
    throw error;
  }
}

export async function getMarkdownContent(slug: string) {
  const basePathFromSlug = `${process.env.GITHUB_RAW_URL}/${slug}`;

  // Directly try to fetch the file
  let filePath = `${basePathFromSlug}.md`;
 
  try {
    const res = await fetch(filePath + `?token=${process.env.GITHUB_TOKEN}`);

    // Check if the markdown file exists
    if (res.status === 404) {
      // If it does not exist, try fetching the index.md file from the directory
      const indexPath = `${basePathFromSlug}/index.md`;
      const indexRes = await fetch(
        indexPath + `?token=${process.env.GITHUB_TOKEN}`
      );

      if (indexRes.ok) {
        const indexContent = await indexRes.text();
        const ast = Markdoc.parse(indexContent);
        const frontmatter = ast.attributes.frontmatter
          ? yaml.load(ast.attributes.frontmatter)
          : {};
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
    const frontmatter = ast.attributes.frontmatter
      ? yaml.load(ast.attributes.frontmatter)
      : {};

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
    console.error("Error fetching markdown content:", error.message || error);
    return { content: null, frontmatter: {} };
  }
}
