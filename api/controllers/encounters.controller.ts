import { EncounterModel } from "../models/encounter.model";
import { ByoApiService } from "../services/byoapi.service";
import { CharacterService } from "../services/character.service";
import { DataService } from "../services/data.service"
import { EncounterViewModel } from "../view-models/encounter.view-model";
import { EncounterCreatureViewModel } from "../view-models/encounterCreature.view-model";

export class EncountersController { 
    public static saveEncounter = async (req: any, res: any) => {
        let encounter: EncounterModel = req.body as EncounterModel;
        let encounterId = '';
        
        if (encounter.selectedParty !== undefined && encounter.selectedParty !== '') {
            encounterId = await DataService.saveEncounter(encounter);
        } else {
            encounterId = await DataService.saveEncounterTemplate(encounter);
        }

        res.send(encounterId);
    }

    public static updateEncounter = async (req: any, res: any) => {
        let encounter: EncounterModel = req.body as EncounterModel;
        let encounterId = '';
        
        if (encounter.selectedParty !== undefined && encounter.selectedParty !== '') {
            encounterId = await DataService.updateEncounter(encounter);
        } else {
            encounterId = await DataService.updateEncounterTemplate(encounter);
        }

        res.send(encounterId);
    }

    public static getEncounters = async (req: any, res: any) => {
        let encounters: EncounterModel[] = await (await DataService.getEncounters())
                                                    .map(x => { return x });

        let encounterTemplates: EncounterModel[] = await (await DataService.getEncounterTemplates())
                                                        .map(x => { return x });

        let expandedEncounters: EncounterViewModel[] = [];
        let unionedEncounters: EncounterModel[] = encounters.concat(encounterTemplates);

        for (const encounter of unionedEncounters) {
            let expandedEncounter: EncounterViewModel = { 
                ...encounter, 
                creatures: []
            };

            for (const creature of encounter.creatures) {
                let foundCreature = creature.isPlayerCharacter 
                    ? await CharacterService.getCharacterById(creature.id) 
                    : await ByoApiService.getCreatureByName(creature.name, creature.byoapiId);
                expandedEncounter.creatures.push({ ...foundCreature } as EncounterCreatureViewModel);
            }

            expandedEncounters.push(expandedEncounter);
        }
        
        res.send(expandedEncounters);
    }

    public static getEncounterById = async (req: any, res: any) => {
        let id: string = req.params.id.toLocaleLowerCase();
        let encounter: EncounterModel = await DataService.getEncounterById(id);

        let expandedEncounter: EncounterViewModel = { 
            ...encounter, 
            creatures: []
        };
        for (const creature of encounter.creatures) {
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

            expandedEncounter.creatures.push({ ...foundCreature } as EncounterCreatureViewModel);
        }

        res.send(expandedEncounter);
    }
}