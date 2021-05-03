import React, { createContext } from 'react';
import UseDataApi from '@/hooks/UseDataApi';

import Cookies from 'universal-cookie';

// Create Context Object
export const WishlistContext = createContext({
    wishNum: 0
});

// Create a provider for components to consume and subscribe to changes
export const WishlistContextProvider = (props) => {

    const [wishNum, setWishNum] = React.useState(0);

    const cookies = new Cookies();
    const loggedUser = cookies.get('aquaticaUser') ? cookies.get('aquaticaUser') : '';


    if(loggedUser){
        const WISHLIST_NUM_API_URL = process.env.REACT_APP_API_BASE + process.env.REACT_APP_API_WISHLIST + "?username="+loggedUser+"&getnum=1";
        const wishNumData = UseDataApi(WISHLIST_NUM_API_URL);
        if(wishNumData.load && wishNumData.data && wishNum<1){
            setWishNum(wishNumData.data);
        }
    }
  

    const updateWishNum = (val) => {
        const newVal = wishNum*1 + (val*1);
        setWishNum(newVal);
    }

    return <WishlistContext.Provider value={{wishNum, updateWishNum}}>{props.children}</WishlistContext.Provider>;
};

export const WishlistContextConsumer = WishlistContext.Consumer;
