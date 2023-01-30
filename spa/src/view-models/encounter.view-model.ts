import { EncounterCreatureViewModel } from "./encounter-creature.view-model";

export class EncounterViewModel { 
    id: string = '';
    name: string = '';
    creatures: EncounterCreatureViewModel[] = [];
    selectedParty: string = '';
}