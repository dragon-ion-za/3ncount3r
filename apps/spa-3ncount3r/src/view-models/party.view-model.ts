import { CharacterViewModel } from "./character.view-model";

export class PartyViewModel {
    name: string = '';
    characters: CharacterViewModel[] = [];
    currentXp: number = 0;
}