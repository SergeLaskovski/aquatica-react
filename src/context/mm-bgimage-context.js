import React, { createContext } from 'react';

import defaultBG from '@/assets/images/products_mm.jpg';

// Create Context Object
export const MmBgImageContext = createContext({
    bgImage: {},
    updateBgImage: () => { },
});

// Create a provider for components to consume and subscribe to changes
export const MmBgImageContextProvider = (props) => {
    const def =  defaultBG;
    const [bgImage, setBgImage] = React.useState(def);

    //function to update context
    const updateBgImage = (newBG) => {
        setBgImage(newBG);
    };

    return <MmBgImageContext.Provider value={{bgImage, updateBgImage}}>{props.children}</MmBgImageContext.Provider>;
};

export const MmBgImageContextConsumer = MmBgImageContext.Consumer;
