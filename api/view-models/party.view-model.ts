import { EncounterCreatureViewModel } from "./encounterCreature.view-model";

export class PartyViewModel {
    id: string = '';
    name: string = '';
    characters: EncounterCreatureViewModel[] = [];
}