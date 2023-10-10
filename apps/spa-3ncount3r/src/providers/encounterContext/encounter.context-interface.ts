import { EncounterCreatureViewModel } from "../../view-models/encounter-creature.view-model";

export interface IEncounterContext {
    creatures: EncounterCreatureViewModel[];
    selectedCreatureIndex: number;
    selectedParty: string;
    encounterName: string;
    encounterId: string;
    roundCounter: number;
    turnCounter: number;
    setSelectedParty: (partyName: string) => void;
    setCreatures: (creatures: EncounterCreatureViewModel[]) => void;
    setEncounterName: (name: string) => void;
    setEncounterId: (id: string) => void;
    addCreature: (creature: EncounterCreatureViewModel) => void;
    removeCreature: (creature: EncounterCreatureViewModel) => void;
    setSelectedCreatureIndex: (index: number) => void;
    getSelectedCreatureIndex: () => number;
    getSelectedCreature: () => EncounterCreatureViewModel;
    setRoundCounter: (round: number) => void;
    setTurnCounter: (turn: number) => void;
}