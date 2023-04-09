import { DataService } from "../services/data.service"

import { CharacterModel } from "../models/character.model";
import { CharacterViewModel } from "../view-models/character.view-model";

export class CharactersController { 
    public static saveCharacter = async (req: any, res: any) => {
        let encounterId = await DataService.saveCharacter(req.body as CharacterModel);
        res.send(encounterId);
    }

    public static updateCharacter = async (req: any, res: any) => {
        let encounterId = await DataService.updateCharacter(req.body as CharacterModel);
        res.send(encounterId);
    }

    public static getCharacters = async (req: any, res: any) => {
        let parties: CharacterViewModel[] = await (await DataService.getCharacters())
                                                    .map(x => { return { ...x } });

        res.send(parties);
    }

    public static getCharacterById = async (req: any, res: any) => {
        let id: string = req.params.id.toLocaleLowerCase();
        let party: CharacterViewModel = await DataService.getCharacterById(id);

        res.send(party);
    }
}