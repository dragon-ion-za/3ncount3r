import React, { useContext } from "react";
import { createContext, useState, ReactNode } from "react";
import { IBusyLoadingContext } from "./busy-loading.context-interface";

interface BusyLoadingContextProviderProps {
    children?: ReactNode;
}

const BusyLoadingContext = createContext<IBusyLoadingContext>({ 
    isLoading: false,
    setIsLoading: () => { throw new Error('Encounter State is uninitialised.')},
    getIsLoading: () => {throw new Error('Encounter State is uninitialised.')},
});

export const useBusyLoadingContext = () => useContext(BusyLoadingContext);

export const BusyLoadingContextProvider : React.FC<BusyLoadingContextProviderProps> = ({children}) => {
    const [isLoading, setIsLoadingInternal] = useState<boolean>(false);

    const setIsLoading = (isLoading: boolean) => {
        setIsLoadingInternal(isLoading);
    };

    const getIsLoading = () => {
        return isLoading;
    }

    return (<>
        <BusyLoadingContext.Provider value={{
            isLoading,
            setIsLoading,
            getIsLoading
        }}>
            {children}
        </BusyLoadingContext.Provider>        
    </>);
}