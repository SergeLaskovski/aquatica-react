import React, { createContext } from 'react';


// Create Context Object
export const CatMmBgImageContext = createContext({
    bgImage: 'default',
    updateBgImage: () => { },
});

// Create a provider for components to consume and subscribe to changes
export const CatMmBgImageContextProvider = (props) => {

    const imgDir =  process.env.REACT_APP_BASE_URL+"/assets/images/Rooms/MegaMenu";
    let def = encodeURI(imgDir + "/default_mm.jpg");

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
        newBG = encodeURI(imgDir + "/" + newBG + "_mm.jpg");
        verifyImageURL(newBG);
    };


    return <CatMmBgImageContext.Provider value={{bgImage, updateBgImage}}>{props.children}</CatMmBgImageContext.Provider>;
};

export const CatMmBgImageContextConsumer = CatMmBgImageContext.Consumer;
