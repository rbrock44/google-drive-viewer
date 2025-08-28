import { useEffect, useState } from 'react';
import './App.css';
import GoogleAuth from './components/google-auth/google-auth.js';
import { loadGoogleDriveFiles } from './utils/utils.js';
import React from 'react';

function App(props) {
    const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
    const [folderId, setFolderId] = useState<string>("root"); // 'root' is My Drive
    const [files, setFiles] = useState<any[]>([]);
    const [tokinResponse, setTokinResponse] = useState(null);

    useEffect(() => {
        console.log(props, props.clientId, props.apiKey)
    }, []);

    const loadFiles = async () => {
        if (tokinResponse) {
            const files = await loadGoogleDriveFiles(tokinResponse['access_token'], folderId)
            console.log(files);
            setFiles(files);
        }
    };

    const signIn = (response) => {
        setIsSignedIn(true);
        setTokinResponse(response);
    }

    return (
        <div style={{ padding: "20px" }}>
            <div className='mb-4'>
                <GoogleAuth
                    clientId={props.clientId}
                    loginSuccess={signIn}
                    isSignedIn={isSignedIn}
                    signOut={() => { setIsSignedIn(false); }}
                />
            </div>

            {isSignedIn && (
                <div className='mb-4'>
                    <input
                        type="text"
                        placeholder="Folder ID (default: My Drive)"
                        value={folderId}
                        onChange={(e) => setFolderId(e.target.value)}
                        className='mr-2 bg-black-200' 
                    />
                    <button onClick={loadFiles}>Load Files</button>
                </div>
            )}

            <ul>
                {files.map((file) => (
                    <li key={file.id}>
                        {file.name} {file.mimeType === "application/vnd.google-apps.folder" ? "(Folder)" : ""}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default App
