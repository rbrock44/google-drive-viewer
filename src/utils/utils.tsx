import { FileItem } from "../constants";

export async function loadGoogleDriveFiles(access_token, folderId): Promise<FileItem[]> {
    const res = await fetch(
        `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+trashed=false&fields=files(id,name,mimeType)`,
        {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        }
    );

    if (!res.ok) {
        console.log(res)
        throw new Error(`Google Drive API error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data.files;
}

export async function addChildrenIfAvailable(
    access_token: string,
    file: FileItem
): Promise<FileItem> {
    if (isExpandandleFileType(file)) {
        const children = await loadGoogleDriveFiles(access_token, file.id);

        const childrenWithNested = await Promise.all(
            children.map((child) => addChildrenIfAvailable(access_token, child))
        );

        return {
            ...file,
            children: childrenWithNested,
        };
    } else {
        return file;
    }
}

export async function childSearch(
    access_token: string,
    files: FileItem[]
): Promise<FileItem[]> {
    return Promise.all(
        files.map((file) => addChildrenIfAvailable(access_token, file))
    );
}

export const isExpandandleFileType = (file: FileItem) => {
    return file.mimeType === "application/vnd.google-apps.folder";
        // || file.mimeType === "application/x-zip-compressed";
}

export function filterFileItems(items: FileItem[], criteria: string, isExactMatch: boolean = false): FileItem[] {
    const lowerCriteria: string = criteria.toLowerCase();
  
    function recursiveFilter(item: FileItem): FileItem | null {
      const nameMatches: boolean = isExactMatch ? (item.name.toLowerCase() === lowerCriteria) : (item.name.toLowerCase().includes(lowerCriteria));
  
      const filteredChildren = item.children
        ?.map(recursiveFilter)
        .filter((c): c is FileItem => c !== null);
  
      if (nameMatches || (filteredChildren && filteredChildren.length > 0)) {
        return { ...item, children: filteredChildren };
      }
      return null;
    }
  
    return items
      .map(recursiveFilter)
      .filter((i): i is FileItem => i !== null);
  }
