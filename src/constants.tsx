export const DISCOVERY_DOC: string = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';
export const SCOPES: string = 'https://www.googleapis.com/auth/drive.readonly';

export interface FileItem {
    id: string;
    name: string;
    mimeType: string;
  }