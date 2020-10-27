import React, { createContext } from 'react';

import Cookies from 'universal-cookie';

// Create Context Object
export const UserContext = createContext({
    loggedUser: '',
    updateLoggedUser: () => { },
});

// Create a provider for components to consume and subscribe to changes
export const UserContextProvider = (props) => {

    const cookies = new Cookies();
    const user = cookies.get('aquaticaUser') ? cookies.get('aquaticaUser') : '';

    const [loggedUser, setLoggedUser] = React.useState(user);

    const updateLoggedUser = (newUser) => {
        setLoggedUser(newUser)
    };

    return <UserContext.Provider value={{loggedUser,updateLoggedUser}}>{props.children}</UserContext.Provider>;
};

export const UserContextConsumer = UserContext.Consumer;
