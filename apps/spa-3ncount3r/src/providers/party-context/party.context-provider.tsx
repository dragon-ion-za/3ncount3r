import React, { useContext } from "react";
import { createContext, useState, ReactNode } from "react";
import { IPartyContext } from "./party.context-interface";
import { PartyViewModel } from "../../view-models/party.view-model";

interface PartyContextProviderProps {
    children?: ReactNode;
}

const PartyContext = createContext<IPartyContext>({ 
    parties: [],
    selectedPartyIndex: -1,
    setParties: () => { throw new Error('Party State is uninitialised.'); },
    setSelectedPartyIndex: (index: number) => { throw new Error('Party State is uninitialised.'); },
    getSelectedParty: () => { throw new Error('Party State is uninitialised.'); },
});

export const usePartyContext = () => useContext(PartyContext);

export const PartyContextProvider : React.FC<PartyContextProviderProps> = ({children}) => {
    const [parties, setPartiesInternal] = useState<PartyViewModel[]>([]);
    const [selectedPartyIndex, setSelectedPartyIndexInternal] = useState<number>(-1);

    const setParties = (parties: PartyViewModel[]) => {
        setPartiesInternal(parties);
    }

    const setSelectedPartyIndex = (index: number) => {
        setSelectedPartyIndexInternal(index);
    }

    const getSelectedParty = () => {
        return parties[selectedPartyIndex];
    }

    return (<>
        <PartyContext.Provider value={{
            parties,
            selectedPartyIndex,
            setParties,
            setSelectedPartyIndex,
            getSelectedParty
        }}>
            {children}
        </PartyContext.Provider>        
    </>);
}