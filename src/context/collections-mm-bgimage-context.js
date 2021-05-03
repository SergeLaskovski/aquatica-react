import React, { createContext } from 'react';


// Create Context Object
export const ColMmBgImageContext = createContext({
    bgImage: 'default',
    updateBgImage: () => { },
});

// Create a provider for components to consume and subscribe to changes
export const ColMmBgImageContextProvider = (props) => {

    const imgDir =  process.env.REACT_APP_BASE_URL+"/assets/images/Collections/MegaMenu";
    let def = encodeURI(imgDir + "/default mm.jpg");

    const [bgImage, setBgImage] = React.useState(def);

 
    //function to check if img exists
    const verifyImageURL = (url) => {
        var img = new Image();
        img.src = url;
        img.onload = function () {
            setBgImage(url);
        };
        img.onerror = function () {
            setBgImage(def);
        };
    }
 
    //function to update context
    const updateBgImage = (newBG) => {
        newBG = encodeURI(imgDir + "/" + newBG + " mm.jpg");
        verifyImageURL(newBG);
    };


    return <ColMmBgImageContext.Provider value={{bgImage, updateBgImage}}>{props.children}</ColMmBgImageContext.Provider>;
};

export const ColMmBgImageContextConsumer = ColMmBgImageContext.Consumer;
