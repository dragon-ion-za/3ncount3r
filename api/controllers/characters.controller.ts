import { DataService } from "../services/data.service"

import { CharacterModel } from "../models/character.model";
import { EncounterCreatureViewModel } from "../view-models/encounterCreature.view-model";
import { UtilityService } from "../services/utilit.service";
import { BaseController } from "./base.controller";

export class CharactersController extends BaseController<CharacterModel, EncounterCreatureViewModel> { 

    protected override async doSave(model: CharacterModel): Promise<string> {
        return await DataService.saveCharacter(model);
    }

    protected override async doUpdate(model: CharacterModel): Promise<string> {
        return await DataService.updateCharacter(model as CharacterModel);
    }
    
    protected override async doGet(): Promise<EncounterCreatureViewModel[]> {
        return (await DataService.getCharacters())
            .map(x => { 
                return { 
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
                    savingThrows: [] 
                } 
            }
        );   
    }

    protected override async doGetById(id: string): Promise<EncounterCreatureViewModel> {
        let model: CharacterModel = await DataService.getCharacterById(id);
        return  {  
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
            savingThrows: []  
        };
    }
}