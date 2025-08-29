import React, { useEffect, useState } from 'react';
import './App.css';
import GoogleAuth from './components/google-auth/google-auth.js';
import { loadGoogleDriveFiles, isExpandandleFileType, childSearch, filterFileItems } from './utils/utils.js';
import { FileItem, NO_CLIENT_ID_MESSAGE, ROOT } from "./constants";
// @ts-ignore
import filesData from './assets/hardcoded-files.json';
import Item from './components/item/item.js';
import Search from './components/search/search.js';

function App(props) {
    const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
    const [files, setFiles] = useState<FileItem[]>([]);
    const [allFiles, setAllFiles] = useState<FileItem[]>([]);
    const [tokinResponse, setTokinResponse] = useState(null);

    useEffect(() => {
        console.log(props, props.clientId, props.apiKey)
    }, []);

    const loadRootFiles = async () => {
        if (tokinResponse) {
            const accessToken = tokinResponse['access_token'];
            const files = await loadGoogleDriveFiles(accessToken, ROOT)
            const filesWithChildren = await childSearch(accessToken, files);

            // console.log(JSON.stringify(filesWithChildren, null, 2));
            setFiles(filesWithChildren);
            setAllFiles(filesWithChildren);
        }
    };

    const loadHardcodedFiles = () => {
        setFiles(filesData);
        setAllFiles(filesData);
    };

    const signIn = (response) => {
        setIsSignedIn(true);
        setTokinResponse(response);
    }

    const performSearch = (criteria => {
        if (criteria) {
            setFiles(filterFileItems(allFiles, criteria))
        } else {
            setFiles(allFiles);
        }
    });

    return (
        <div style={{ padding: "20px" }}>
            {(props.clientId != undefined && props.clientId != '') ? (
                <div className='mb-4'>
                    <GoogleAuth
                        clientId={props.clientId}
                        loginSuccess={signIn}
                        isSignedIn={isSignedIn}
                        signOut={() => {
                            setIsSignedIn(false);
                            setAllFiles([]);
                            setFiles([]);
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
                    <button onClick={loadRootFiles}>Load Root Files</button>
                </div>
            )}

            {files.length > 0 && (
                <div className='mb-4'>
                    <Search onSearch={performSearch}/>
                </div>
            )}

            <ul>
                {files.map((file) => (
                    <Item
                        key={file.id}
                        file={file}
                        tokinResponse={tokinResponse}
                    />
                ))}
            </ul>
        </div>
    )
}

export default App
