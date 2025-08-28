import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <App clientId={clientId} apiKey={apiKey}/>
  </StrictMode>,
)
