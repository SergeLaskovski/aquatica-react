import React, { createContext } from 'react';

import defaultBG from '@/assets/images/collections_mm.jpg';

// Create Context Object
export const ColMmBgImageContext = createContext({
    bgImage: {},
    updateBgImage: () => { },
});

// Create a provider for components to consume and subscribe to changes
export const ColMmBgImageContextProvider = (props) => {
    const def =  defaultBG;
    const [bgImage, setBgImage] = React.useState(def);

    //function to update context
    const updateBgImage = (newBG) => {
        setBgImage(newBG);
    };

    return <ColMmBgImageContext.Provider value={{bgImage, updateBgImage}}>{props.children}</ColMmBgImageContext.Provider>;
};

export const ColMmBgImageContextConsumer = ColMmBgImageContext.Consumer;
