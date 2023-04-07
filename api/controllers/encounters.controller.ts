import { EncounterModel } from "../models/encounter.model";
import { DataService } from "../services/data.service"
import { EncounterViewModel } from "../view-models/encounter.view-model";

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
        let encounters: EncounterViewModel[] = await (await DataService.getEncounters())
                                                    .map(x => { return { ...x } as EncounterViewModel });

        let encounterTemplates: EncounterViewModel[] = await (await DataService.getEncounterTemplates())
                                                        .map(x => { return { ...x } as EncounterViewModel });

        res.send(encounters.concat(encounterTemplates));
    }

    public static getEncounterById = async (req: any, res: any) => {
        let id: string = req.params.id.toLocaleLowerCase();
        let encounter: EncounterViewModel = await DataService.getEncounterById(id) as EncounterViewModel;

        console.log(encounter);

        res.send(encounter);
    }
}