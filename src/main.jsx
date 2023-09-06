import React from 'react';
import { createRoot } from 'react-dom/client';
import { HandleDataTypeLookupProvider } from './HandleDataTypeContext';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <HandleDataTypeLookupProvider>
            <App />
        </HandleDataTypeLookupProvider>
    </React.StrictMode>
);