import { EncounterModel } from "../models/encounter.model";
import { ByoApiService } from "../services/byoapi.service";
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
        encounters.concat(encounterTemplates).forEach(x => {
            let expandedEncounter: EncounterViewModel = { 
                ...x, 
                creatures: []
            };

            x.creatures.forEach(async y => {
                let creature  = await ByoApiService.getCreatureById(y.id, y.byoapiId);
                expandedEncounter.creatures.push({ ...creature } as EncounterCreatureViewModel);
            })

            expandedEncounters.push(expandedEncounter);
        });

        res.send(expandedEncounters);
    }

    public static getEncounterById = async (req: any, res: any) => {
        let id: string = req.params.id.toLocaleLowerCase();
        let encounter: EncounterModel = await DataService.getEncounterById(id);

        let expandedEncounter: EncounterViewModel = { 
            ...encounter, 
            creatures: []
        };

        encounter.creatures.forEach(async x => {
            let creature  = await ByoApiService.getCreatureById(x.id, x.byoapiId);
            expandedEncounter.creatures.push({ ...creature } as EncounterCreatureViewModel);
        });

        res.send(expandedEncounter);
    }
}