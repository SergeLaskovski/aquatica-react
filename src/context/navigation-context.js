import React, {createContext} from 'react';
import UseDataApi from '@/hooks/UseDataApi';

// Create Context Object
export const NavigationContext = createContext({
  navContext: {},
  updateNavContext: () => {},
});

// Create a provider for components to consume and subscribe to changes
export const NavigationContextProvider = (props) => {
  const MENU_URL = process.env.REACT_APP_API_BASE + process.env.REACT_APP_API_MENU;
  const navContext = UseDataApi(MENU_URL);
  
  //function to update context
  const updateNavContext = (pageID) => {
    navContext.current = pageID;
  };


  return (
    <NavigationContext.Provider value={{navContext, updateNavContext}}>{props.children}</NavigationContext.Provider>
  );
};

export const NavigationContextConsumer = NavigationContext.Consumer;
