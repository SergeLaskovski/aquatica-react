import React, {createContext} from 'react';
import UseDataApi from '@/hooks/UseDataApi';

// Create Context Object
export const CategoriesContext = createContext({
  catContext: {},
  updateCatContext: () => {},
});

// Create a provider for components to consume and subscribe to changes
export const CategoriesContextProvider = (props) => {

    const WOOCATS_API_URL = process.env.REACT_APP_API_BASE + process.env.REACT_APP_API_WOOCATS;
    const catContext = UseDataApi(WOOCATS_API_URL);

    return (
    <CategoriesContext.Provider value={catContext}>{props.children}</CategoriesContext.Provider>
    );
};
