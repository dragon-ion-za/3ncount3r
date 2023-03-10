import { EncounterCreatureModel } from "./encounterCreature.model";

export class EncounterModel {
    id: string = '';
    name: string = '';
    creatures: EncounterCreatureModel[] = [];
    selectedParty: string = '';
}