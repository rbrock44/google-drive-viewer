import React, {useEffect, useState} from 'react';
import './App.css';
import GoogleAuth from './components/google-auth/google-auth.js';
import {loadGoogleDriveFiles} from './utils/utils.js';
import {FileItem, NO_CLIENT_ID_MESSAGE, ROOT} from "./constants";
// @ts-ignore
import filesData from './assets/hardcoded-files.json';

function App(props) {
    const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
    const [folderId, setFolderId] = useState<string>(ROOT); // 'root' is My Drive
    const [files, setFiles] = useState<FileItem[]>([]);
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

    const loadHardcodedFiles = () => {
        setFiles(filesData);
    };

    const signIn = (response) => {
        setIsSignedIn(true);
        setTokinResponse(response);
    }

    const listItemClick = async (file: FileItem) => {
        if (tokinResponse) {
            file.children = await loadGoogleDriveFiles(tokinResponse['access_token'], folderId);
        }
    };

    return (
        <div style={{padding: "20px"}}>
            {(props.clientId != undefined && props.clientId != '') ? (
                    <div className='mb-4'>
                        <GoogleAuth
                            clientId={props.clientId}
                            loginSuccess={signIn}
                            isSignedIn={isSignedIn}
                            signOut={() => {
                                setIsSignedIn(false);
                            }}
                        />
                    </div>
                ) :
                <div>
                    <div className='mb-4'>{NO_CLIENT_ID_MESSAGE}</div>
                    <button className='mb-4' onClick={loadHardcodedFiles}>Load Hardcoded Data</button>
                </div>
            }

            {isSignedIn && (
                <div className='mb-4'>
                    <button onClick={loadFiles}>Load Root Files</button>
                </div>
            )}

            <ul>
                {files.map((file) => (
                    <li
                        key={file.id}
                        onClick={() => listItemClick(file)}
                        className="cursor-pointer hover:bg-gray-200 p-2 rounded"
                    >
                        {file.name} {file.mimeType === "application/vnd.google-apps.folder" ? "(Folder)" : ""}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default App
