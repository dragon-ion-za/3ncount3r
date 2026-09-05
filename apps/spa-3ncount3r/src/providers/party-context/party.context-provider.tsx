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
    currentParty: { id: '', name: 'Unnamed Party', characterIds: [], characters: [] },
    setParties: () => { throw new Error('Party State is uninitialised.'); },
    setSelectedPartyIndex: (index: number) => { throw new Error('Party State is uninitialised.'); },
    setCurrentParty: (party: PartyViewModel) => { throw new Error('Party State is uninitialised.'); },
    getSelectedParty: () => { throw new Error('Party State is uninitialised.'); },
});

export const usePartyContext = () => useContext(PartyContext);

export const PartyContextProvider : React.FC<PartyContextProviderProps> = ({children}) => {
    const [parties, setPartiesInternal] = useState<PartyViewModel[]>([]);
    const [selectedPartyIndex, setSelectedPartyIndexInternal] = useState<number>(-1);
    const [currentParty, setCurrentPartyInternal] = useState<PartyViewModel>({ id: '', name: 'Unnamed Party', characterIds: [], characters: [] });

    const setParties = (parties: PartyViewModel[]) => {
        setPartiesInternal(parties);
    }

    const setSelectedPartyIndex = (index: number) => {
        setSelectedPartyIndexInternal(index);
    }

    const setCurrentParty = (party: PartyViewModel) => {
        setCurrentPartyInternal(party);
    }

    const getSelectedParty = () => {
        if (selectedPartyIndex === -2) {
            setCurrentPartyInternal({ id: '', name: 'Unnamed Party', characterIds: [], characters: [] });
            return currentParty as PartyViewModel;
        } else {
            return parties[selectedPartyIndex];
        }
    }

    return (<>
        <PartyContext.Provider value={{
            parties,
            selectedPartyIndex,
            currentParty,
            setParties,
            setSelectedPartyIndex,
            setCurrentParty,
            getSelectedParty
        }}>
            {children}
        </PartyContext.Provider>        
    </>);
}