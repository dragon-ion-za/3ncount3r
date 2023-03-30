import { CreatureModel } from "./creature.model";

export class PartyModel {
    id: string = '';
    name: string = '';
    characters: CreatureModel[] = [];
}