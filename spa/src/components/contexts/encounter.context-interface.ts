import { EncounterCreatureViewModel } from "../../view-models/encounter-creature.view-model";

export interface IEncounterContext {
    creatures: EncounterCreatureViewModel[];
    selectedCreature: EncounterCreatureViewModel | null;
    addCreature: (creature: EncounterCreatureViewModel) => void;
    removeCreature: (creature: EncounterCreatureViewModel) => void;
    setSelectedCreature: (selectedCreature: EncounterCreatureViewModel) => void;
}