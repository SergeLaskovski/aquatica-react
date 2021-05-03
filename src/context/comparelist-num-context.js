import React, { createContext } from 'react';
import UseDataApi from '@/hooks/UseDataApi';
import Cookies from 'universal-cookie';

// Create Context Object
export const ComparelistContext = createContext({
    compareNum: 0
});

// Create a provider for components to consume and subscribe to changes
export const ComparelistContextProvider = (props) => {

    const [compareNum, setCompareNum] = React.useState(0);
    
    const cookies = new Cookies();
    const loggedUser = cookies.get('aquaticaUser') ? cookies.get('aquaticaUser') : '';

    if(loggedUser){
        const COMPARELIST_NUM_API_URL = process.env.REACT_APP_API_BASE + process.env.REACT_APP_API_COMPARELIST + "?username="+loggedUser+"&getnum=1";
        const compareNumData = UseDataApi(COMPARELIST_NUM_API_URL);
        if(compareNumData.load && compareNumData.data && compareNum<1){
            setCompareNum(compareNumData.data);
        }
    }
    const updateCompareNum = (val) => {
        const newVal = compareNum*1 + (val*1);
        setCompareNum(newVal);
    }

    return <ComparelistContext.Provider value={{compareNum, updateCompareNum}}>{props.children}</ComparelistContext.Provider>;
};

export const ComparelistContextConsumer = ComparelistContext.Consumer;
