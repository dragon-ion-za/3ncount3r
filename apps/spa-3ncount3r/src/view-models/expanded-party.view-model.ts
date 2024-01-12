import { CharacterViewModel } from "./character.view-model";

export class ExpandedPartyViewModel {
    name: string = '';
    characters: CharacterViewModel[] = [];
    currentXp: number = 0;
}