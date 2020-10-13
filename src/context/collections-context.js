import React, {createContext} from 'react';
import UseDataApi from '@/hooks/UseDataApi';

// Create Context Object
export const CollectionsContext = createContext({
  collContext: {},
  updateCollContext: () => {},
});

// Create a provider for components to consume and subscribe to changes
export const CollectionsContextProvider = (props) => {

    const COLLECTIONS_API_URL = process.env.REACT_APP_API_BASE + process.env.REACT_APP_API_COLLECTIONS;
    const collContext = UseDataApi(COLLECTIONS_API_URL);

    return (
    <CollectionsContext.Provider value={collContext}>{props.children}</CollectionsContext.Provider>
    );
};
