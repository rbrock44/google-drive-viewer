
export async function loadGoogleDriveFiles(access_token, folderId): Promise<any[]> {
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