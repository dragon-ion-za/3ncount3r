import { CharacterViewModel } from "./character.view-model";

export class PartyViewModel {
    id: string = '';
    name: string = '';
    characterIds: string[] = [];
    characters: CharacterViewModel[] = [];
}