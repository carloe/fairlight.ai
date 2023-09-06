import React, { createContext, useState } from 'react';

export const HandleDataTypeLookupContext = createContext();

export const HandleDataTypeLookupProvider = ({ children }) => {
    const [lookupTable, setLookupTable] = useState({
        model: 'teal',
        latent: 'red',
        image: 'green',
        imageMask: 'purple',
        integer: 'blue',
        // other lookup table values
    });

    const getValue = (key) => {
        return lookupTable[key] || 'neutral'; // Return an empty string if the key is not found
    };

    return (
        <HandleDataTypeLookupContext.Provider value={getValue}>
            {children}
        </HandleDataTypeLookupContext.Provider>
    );
};