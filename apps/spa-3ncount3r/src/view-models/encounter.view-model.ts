import { EncounterCreatureViewModel } from "./encounter-creature.view-model";

export class EncounterViewModel { 
    id: string = '';
    campaign: string = '';
    location: string = '';
    name: string = '';
    creatures: EncounterCreatureViewModel[] = [];
    partyId: string = '';
    selectedParty: string = '';
    roundCount: number = 0;
    currentTurn: number = 0;
}