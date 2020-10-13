import React, {createContext} from 'react';

// Create Context Object
export const CurrentProductContext = createContext({
  currProdContext: {},
  updateCurrProdContext: () => {},
});

// Create a provider for components to consume and subscribe to changes
export const CurrentProductContextProvider = (props) => {

  const [currProdContext, setCurrProdContext] = React.useState({});
  
  //function to update context
  const updateCurrProdContext = (title, slug) => {
    setCurrProdContext({title: title, slug: slug});
  };


  return (
    <CurrentProductContext.Provider value={{currProdContext, updateCurrProdContext}}>{props.children}</CurrentProductContext.Provider>
  );
};

export const CurrentProductContextConsumer = CurrentProductContext.Consumer;
