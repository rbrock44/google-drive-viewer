export const SCOPES: string = 'https://www.googleapis.com/auth/drive.metadata.readonly';

export const NO_CLIENT_ID_MESSAGE: string = 'No clientId';

export interface FileItem {
    id: string;
    name: string;
    mimeType: string;
  }
