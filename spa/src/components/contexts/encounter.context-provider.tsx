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
    selectedParty: '',
    setSelectedParty: () => { throw new Error('Encounter State is uninitialised.')},
    setCreatures: () => { throw new Error('Encounter State is uninitialised.')},
    addCreature: () => { throw new Error('Encounter State is uninitialised.')},
    removeCreature: () => { throw new Error('Encounter State is uninitialised.')},
    setSelectedCreature: () => {throw new Error('Encounter State is uninitialised.')}
});

export const useEncounterContext = () => useContext(EncounterContext);

export const EncounterContextProvider : React.FC<EncounterContextProviderProps> = ({children}) => {
    const [creatures, setCreaturesInternal] = useState<EncounterCreatureViewModel[]>([]);
    const [selectedCreature, setSelectedCreatureInternal] = useState<EncounterCreatureViewModel | null>(null);
    const [selectedParty, setSelectedPartyInternal] = useState<string>('');

    const creatureInitiativeEqualityComparer = (x: EncounterCreatureViewModel, y: EncounterCreatureViewModel) => {
        if (x.initiative > y.initiative) return -1;
        if (y.initiative > x.initiative) return 1;
        return 0;
    };

    const setCreatures = (creatures: EncounterCreatureViewModel[]) => {
        let sortedCreatures = creatures.sort((x, y) => creatureInitiativeEqualityComparer(x,y));
        setCreaturesInternal(sortedCreatures);
    };
    
    const addCreature = (creature: EncounterCreatureViewModel) => {
        let state = creatures;
        state.push(creature);
        setCreatures([...state]);
    };

    const removeCreature = (creature: EncounterCreatureViewModel) => {
        throw new Error('Method not implemented');
    };

    const setSelectedCreature = (selectedCreature: EncounterCreatureViewModel) => {
        setSelectedCreatureInternal(selectedCreature);
    };

    const setSelectedParty = (partyName: string) => {
        setSelectedPartyInternal(partyName);
    }

    return (<>
        <EncounterContext.Provider value={{
            creatures,
            selectedCreature,
            selectedParty,
            setSelectedParty,
            setCreatures,
            addCreature,
            removeCreature,
            setSelectedCreature
        }}>
            {children}
        </EncounterContext.Provider>        
    </>);
}