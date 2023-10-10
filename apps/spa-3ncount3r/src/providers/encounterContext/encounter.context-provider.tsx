import React, { useContext } from "react";
import { createContext, useState, ReactNode } from "react";

import { IEncounterContext } from "./encounter.context-interface";

import { EncounterCreatureViewModel } from "../../view-models/encounter-creature.view-model";

interface EncounterContextProviderProps {
    children?: ReactNode;
}

const EncounterContext = createContext<IEncounterContext>({ 
    creatures: [], 
    selectedCreatureIndex: 0,
    selectedParty: '',
    encounterName: '',
    encounterId: '',
    roundCounter: 0,
    turnCounter: 0,
    setSelectedParty: () => { throw new Error('Encounter State is uninitialised.')},
    setCreatures: () => { throw new Error('Encounter State is uninitialised.')},
    setEncounterName: () => { throw new Error('Encounter State is uninitialised.')},
    setEncounterId: () => { throw new Error('Encounter State is uninitialised.')},
    addCreature: () => { throw new Error('Encounter State is uninitialised.')},
    removeCreature: () => { throw new Error('Encounter State is uninitialised.')},
    setSelectedCreatureIndex: () => {throw new Error('Encounter State is uninitialised.')},
    getSelectedCreatureIndex: () => {throw new Error('Encounter State is uninitialised.')},
    getSelectedCreature: () => {throw new Error('Encounter State is uninitialised.')},
    setRoundCounter: () => {throw new Error('Encounter State is uninitialised.')},
    setTurnCounter: () => {throw new Error('Encounter State is uninitialised.')},
});

export const useEncounterContext = () => useContext(EncounterContext);

export const EncounterContextProvider : React.FC<EncounterContextProviderProps> = ({children}) => {
    const [creatures, setCreaturesInternal] = useState<EncounterCreatureViewModel[]>([]);
    const [selectedCreatureIndex, setSelectedCreatureIndexInternal] = useState<number>(0);
    const [selectedParty, setSelectedPartyInternal] = useState<string>('');
    const [encounterName, setEncounterNameInternal] = useState<string>('');
    const [encounterId, setEncounterIdInternal] = useState<string>('');
    const [roundCounter, setRoundCounterInternal] = useState<number>(1);
    const [turnCounter, setTurnCounterInternal] = useState<number>(1);

    const creatureInitiativeEqualityComparer = (x: EncounterCreatureViewModel, y: EncounterCreatureViewModel) => {
        if (x?.initiative > y?.initiative) return -1;
        if (y?.initiative > x?.initiative) return 1;
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

    const setSelectedCreatureIndex = (index: number) => {
        setSelectedCreatureIndexInternal(index);
    };
    
    const getSelectedCreatureIndex = () => {
        return selectedCreatureIndex;
    }

    const setSelectedParty = (partyName: string) => {
        setSelectedPartyInternal(partyName);
    }

    const setEncounterName = (name: string) => {
        setEncounterNameInternal(name);
    }

    const setEncounterId = (id: string) => {
        setEncounterIdInternal(id);
    }

    const getSelectedCreature = () => {
        return creatures[selectedCreatureIndex];
    }

    const setRoundCounter = (round: number) => {
        setRoundCounterInternal(round);
    }

    const setTurnCounter = (turn: number) => {
        setTurnCounterInternal(turn);
    }

    return (<>
        <EncounterContext.Provider value={{
            creatures,
            selectedCreatureIndex,
            selectedParty,
            encounterName,
            encounterId,
            roundCounter,
            turnCounter,
            setSelectedParty,
            setCreatures,
            setEncounterName,
            setEncounterId,
            addCreature,
            removeCreature,
            setSelectedCreatureIndex,
            getSelectedCreatureIndex,
            getSelectedCreature,
            setRoundCounter,
            setTurnCounter
        }}>
            {children}
        </EncounterContext.Provider>        
    </>);
}