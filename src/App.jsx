import {useEffect, useState} from 'react'
import './App.css'
import {DISCOVERY_DOC, SCOPES} from './constants.tsx'

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function App() {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [files, setFiles] = useState([]);

    useEffect(() => {
        initializeGapi();
    }, []);

    async function initializeGapi() {
        console.log('clientId: ', clientId )
        await window.gapi.load('client', async () => {
            await window.gapi.client.init({
                apiKey: apiKey,
                clientId: clientId,
                discoveryDocs: [DISCOVERY_DOC],
                scope: SCOPES
            });

            const authInstance = window.gapi.auth2.getAuthInstance();
            setIsAuthorized(authInstance.isSignedIn.get());
        });
    }

    async function authorize() {
        const authInstance = window.gapi.auth2.getAuthInstance();
        await authInstance.signIn();
        setIsAuthorized(true);
    }

    async function listFiles() {
        try {
            const response = await window.gapi.client.drive.files.list({
                fields: 'nextPageToken, files(id, name, mimeType, modifiedTime)'
            });

            setFiles(response.result.files || []);
        } catch (error) {
            console.error('Error fetching files:', error);
        }
    }

    return (
        <div className="p-6">
            {!isAuthorized ? (
                <button
                    onClick={authorize}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Authorize Google Drive Access
                </button>
            ) : (
                <div>
                    <button
                        onClick={listFiles}
                        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
                    >
                        Load Drive Files
                    </button>

                    <div className="grid gap-2">
                        {files.map(file => (
                            <div key={file.id} className="p-3 border rounded">
                                <h3 className="font-semibold">{file.name}</h3>
                                <p className="text-sm text-gray-600">{file.mimeType}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default App
