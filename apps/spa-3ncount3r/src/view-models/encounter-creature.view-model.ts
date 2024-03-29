import { CreatureViewModel } from "./creature.view-model";

export class EncounterCreatureViewModel extends CreatureViewModel {
    id: string = '';
    hitpointMax: number = 0;
    currentHitpoints: number = 0;
    initiative: number = 0;
    isPlayerCharacter: boolean = false;
    isActive: boolean = true;
}