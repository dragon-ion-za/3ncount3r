import { EncounterCreatureViewModel } from "../../view-models/encounter-creature.view-model";

export interface IEncounterContext {
    creatures: EncounterCreatureViewModel[];
    selectedCreature: EncounterCreatureViewModel | null;
    selectedParty: string;
    encounterName: string;
    encounterId: string;
    setSelectedParty: (partyName: string) => void;
    setCreatures: (creatures: EncounterCreatureViewModel[]) => void;
    setEncounterName: (name: string) => void;
    setEncounterId: (id: string) => void;
    addCreature: (creature: EncounterCreatureViewModel) => void;
    removeCreature: (creature: EncounterCreatureViewModel) => void;
    setSelectedCreature: (selectedCreature: EncounterCreatureViewModel) => void;
}