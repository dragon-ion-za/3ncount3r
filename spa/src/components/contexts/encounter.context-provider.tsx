import React, { useContext } from "react";
import { createContext, useState, ReactNode } from "react";

import { IEncounterContext } from "./encounter.context-interface";

import { EncounterCreatureViewModel } from "../../view-models/encounter-creature.view-model";

interface EncounterContextProviderProps {
    children?: ReactNode;
}

const EncounterContext = createContext<IEncounterContext>({ 
    creatures: [], 
    selectedCreature: null,
    addCreature: () => { throw new Error('Encounter State is uninitialised.')},
    removeCreature: () => { throw new Error('Encounter State is uninitialised.')},
    setSelectedCreature: () => {throw new Error('Encounter State is uninitialised.')}
});

export const useEncounterContext = () => useContext(EncounterContext);

export const EncounterContextProvider : React.FC<EncounterContextProviderProps> = ({children}) => {
    const [creatures, setCreaturesInternal] = useState<EncounterCreatureViewModel[]>([]);
    const [selectedCreature, setSelectedCreatureInternal] = useState<EncounterCreatureViewModel | null>(null);
    
    const addCreature = (creature: EncounterCreatureViewModel) => {
        let state = creatures;
        state.push(creature);
        setCreaturesInternal([...state]);
    };

    const removeCreature = (creature: EncounterCreatureViewModel) => {
        throw new Error('Method not implemented');
    };

    const setSelectedCreature = (selectedCreature: EncounterCreatureViewModel) => {
        setSelectedCreatureInternal(selectedCreature);
    };

    return (<>
        <EncounterContext.Provider value={{
            creatures,
            selectedCreature,
            addCreature,
            removeCreature,
            setSelectedCreature
        }}>
            {children}
        </EncounterContext.Provider>        
    </>);
}