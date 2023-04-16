import { DataService } from "../services/data.service"

import { CharacterModel } from "../models/character.model";
import { EncounterCreatureViewModel } from "../view-models/encounterCreature.view-model";
import { UtilityService } from "../services/utilit.service";

export class CharactersController { 
    public static saveCharacter = async (req: any, res: any) => {
        let characterId = await DataService.saveCharacter(req.body as CharacterModel);
        res.send(characterId);
    }

    public static updateCharacter = async (req: any, res: any) => {
        let characterId = await DataService.updateCharacter(req.body as CharacterModel);
        res.send(characterId);
    }

    public static getCharacters = async (req: any, res: any) => {
        let characters: EncounterCreatureViewModel[] = await (await DataService.getCharacters())
                                                    .map(x => { return { 
                                                        sourceId: '', 
                                                        byoapiId: 'charact3r',
                                                        hitpointSpecial: '',
                                                        hitpointFormula: '',
                                                        armourClass: null,
                                                        legendaryCount: 0,
                                                        isPlayerCharacter: true,
                                                        ...x,
                                                        hitpointAverage: x.hitpointMax,
                                                        hitpointMax: x.hitpointMax,
                                                        currentHitpoints: x.hitpointCurrent,
                                                        type: `${x.race} ${UtilityService.concatClasses(x.classes)}`,
                                                        skillModifiers: [],
                                                        savingThrows: [] } }); 

        res.send(characters);
    }

    public static getCharacterById = async (req: any, res: any) => {
        let id: string = req.params.id;

        let model: CharacterModel = await DataService.getCharacterById(id);
        let character: EncounterCreatureViewModel = {  
        sourceId: '', 
        byoapiId: 'charact3r',
        hitpointSpecial: '',
        hitpointFormula: '',
        armourClass: null,
        legendaryCount: 0,
        isPlayerCharacter: true,
        ...model,
        hitpointAverage: model.hitpointMax,
        hitpointMax: model.hitpointMax,
        currentHitpoints: model.hitpointCurrent,
        type: `${model.race} ${UtilityService.concatClasses(model.classes)}`,
        skillModifiers: [],
        savingThrows: []  };

        res.send(character);
    }
}