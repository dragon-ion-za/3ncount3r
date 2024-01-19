import { EncounterModel } from "../models/encounter.model";
import { EncounterCreatureModel } from "../models/encounterCreature.model";
import { ByoApiService } from "../services/byoapi.service";
import { CharacterService } from "../services/character.service";
import { DataService } from "../services/data.service"
import { EncounterViewModel } from "../view-models/encounter.view-model";
import { EncounterCreatureViewModel } from "../view-models/encounterCreature.view-model";
import { BaseController } from "./base.controller";

export class EncountersController extends BaseController<EncounterModel, EncounterViewModel> { 

    protected override async doSave(model: EncounterModel): Promise<string> {
        let encounterId = '';        
        encounterId = await DataService.saveEncounter(model);
        return encounterId;
    }

    protected override async doUpdate(model: EncounterModel): Promise<string> {
        let encounterId = '';        
        encounterId = await DataService.updateEncounter(model);
        return encounterId;
    }

    protected override async doGet(): Promise<EncounterViewModel[]> {
        let encounters: EncounterModel[] = (await DataService.getEncounters())
                                                    .map(x => { return x });

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
        let encounter: EncounterModel = await DataService.getEncounterById(id);

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
                isPlayerCharacter: true,
                isActive: creature.isActive ?? true };
        } else {
            foundCreature = { 
                id: creature.id,
                hitpointMax: creature.hitpointMax,
                currentHitpoints: creature.currentHitpoints,
                initiative: creature.initiative,
                isPlayerCharacter: false,
                isActive: creature.isActive ?? true,
                ...await ByoApiService.getCreatureByName(creature.name, creature.byoapiId) 
            }
        }

        return foundCreature;
    }
}