import { useEffect, useRef } from 'react'

const loadScript = (src) =>
    new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) return resolve()
        const script = document.createElement('script')
        script.src = src
        script.onload = () => resolve()
        script.onerror = (err) => reject(err)
        document.body.appendChild(script)
    })

const GoogleAuth = (props) => {
    if (props.isSignedIn) {
        const handleSignOut = () => {
            /*global google*/
            google.accounts.id.disableAutoSelect();
            localStorage.removeItem("googleUser");
            props.signOut();
        }
        return <button onClick={handleSignOut}>Sign Out</button>
    }
    const googleButton = useRef(null);

    useEffect(() => {
        const src = 'https://accounts.google.com/gsi/client'

        loadScript(src)
            .then(() => {
                /*global google*/

                const tokenClient = google.accounts.oauth2.initTokenClient({
                    client_id: props.clientId,
                    scope: "https://www.googleapis.com/auth/drive.metadata.readonly",
                    callback: (tokenResponse) => {
                        props.loginSuccess(tokenResponse)
                    },
                });
        
                tokenClient.requestAccessToken();
            })
            .catch(console.error)

        return () => {
            const scriptTag = document.querySelector(`script[src="${src}"]`)
            if (scriptTag) document.body.removeChild(scriptTag)
        }
    }, [])

    return (
        <div ref={googleButton}></div>
    )
}

export default GoogleAuth