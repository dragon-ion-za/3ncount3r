import { EncounterModel } from "../models/encounter.model";
import { EncounterCreatureModel } from "../models/encounterCreature.model";
import { ByoApiService } from "../services/byoapi.service";
import { CharacterService } from "../services/character.service";
import { DataService } from "../services/data.service"
import { EncounterViewModel } from "../view-models/encounter.view-model";
import { EncounterCreatureViewModel } from "../view-models/encounterCreature.view-model";
import { BaseController } from "./base.controller";

export class EncounterTemplatesController extends BaseController<EncounterModel, EncounterViewModel> { 

    protected override async doSave(model: EncounterModel): Promise<string> {
        return await DataService.saveEncounterTemplate(model);
    }

    protected override async doUpdate(model: EncounterModel): Promise<string> {
        return await DataService.updateEncounterTemplate(model);
    }

    protected override async doGet(): Promise<EncounterViewModel[]> {
        let encounters: EncounterModel[] = await DataService.getEncounterTemplates();

        let expandedEncounters: EncounterViewModel[] = [];

        for (const encounter of encounters) {
            let expandedEncounter: EncounterViewModel = { 
                ...encounter, 
                creatures: []
            };

            for (const creature of encounter.creatures) {
                let foundCreature: EncounterCreatureViewModel = await this.getEncounterCreatureFromCreatureModel(creature);
                expandedEncounter.creatures.push({ ...foundCreature } as EncounterCreatureViewModel);
            }

            expandedEncounters.push(expandedEncounter);
        }

        return expandedEncounters;
    }

    protected override async doGetById(id: string): Promise<EncounterViewModel> {
        let encounter: EncounterModel = await DataService.getEncounterTemplateById(id);

        let expandedEncounter: EncounterViewModel = { 
            ...encounter, 
            creatures: []
        };
        for (const creature of encounter.creatures) {
            let foundCreature: EncounterCreatureViewModel = await this.getEncounterCreatureFromCreatureModel(creature);
            expandedEncounter.creatures.push({ ...foundCreature } as EncounterCreatureViewModel);
        }

        return expandedEncounter;
    }

    private async getEncounterCreatureFromCreatureModel(creature: EncounterCreatureModel) : Promise<EncounterCreatureViewModel> {
        let foundCreature: EncounterCreatureViewModel | undefined = undefined;
        if (creature.isPlayerCharacter) {
            foundCreature = { 
                ...await CharacterService.getCharacterById(creature.id),
                id: creature.id,
                initiative: creature.initiative,
                isPlayerCharacter: false };
        } else {
            foundCreature = { 
                id: creature.id,
                hitpointMax: creature.hitpointMax,
                currentHitpoints: creature.currentHitpoints,
                initiative: creature.initiative,
                isPlayerCharacter: false,
                ...await ByoApiService.getCreatureByName(creature.name, creature.byoapiId) 
            }
        }

        return foundCreature;
    }
}