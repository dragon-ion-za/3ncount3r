import { CreatureModel } from "../models/creature.model";

export class EncounterCreatureViewModel extends CreatureModel {
    id: string = '';
    sourceId: string = '';
    byoapiId: string = '';
    hitpointMax: number = 0;
    currentHitpoints: number = 0;
    initiative: number = 0;
    isPlayerCharacter: boolean = false;
}