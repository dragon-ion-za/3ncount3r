import { EncounterModel } from "../models/encounter.model";
import { ByoApiService } from "../services/byoapi.service";
import { DataService } from "../services/data.service"
import { EncounterViewModel } from "../view-models/encounter.view-model";
import { EncounterCreatureViewModel } from "../view-models/encounterCreature.view-model";

export class EncounterTemplatesController { 
    public static saveEncounterTemplate = async (req: any, res: any) => {
        let encounterId = await DataService.saveEncounterTemplate(req.body as EncounterModel);

        res.send(encounterId);
    }

    public static updateEncounterTemplate = async (req: any, res: any) => {
        let encounterId = await DataService.updateEncounterTemplate(req.body as EncounterModel);

        res.send(encounterId);
    }

    public static getEncounterTemplates = async (req: any, res: any) => {
        let encounters: EncounterModel[] = await DataService.getEncounterTemplates();

        let expandedEncounters: EncounterViewModel[] = [];
        encounters.forEach(x => {
            let expandedEncounter: EncounterViewModel = { 
                ...x, 
                creatures: []
            };

            x.creatures.forEach(async y => {
                let creature  = await ByoApiService.getCreatureById(y.id, y.byoapiId);
                expandedEncounter.creatures.push({ ...creature } as EncounterCreatureViewModel);
            });

            expandedEncounters.push(expandedEncounter);
        });

        res.send(encounters);
    }

    public static getEncounterTemplateById = async (req: any, res: any) => {
        let id: string = req.params.id.toLocaleLowerCase();
        let encounter: EncounterModel = await DataService.getEncounterTemplateById(id);

        let expandedEncounter: EncounterViewModel = { 
            ...encounter, 
            creatures: []
        };

        encounter.creatures.forEach(async x => {
            let creature  = await ByoApiService.getCreatureById(x.id, x.byoapiId);
            expandedEncounter.creatures.push({ ...creature } as EncounterCreatureViewModel);
        });

        res.send(encounter);
    }
}