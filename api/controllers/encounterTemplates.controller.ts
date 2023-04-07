import { EncounterModel } from "../models/encounter.model";
import { DataService } from "../services/data.service"
import { EncounterViewModel } from "../view-models/encounter.view-model";

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
        let encounters: EncounterViewModel[] = await (await DataService.getEncounterTemplates())
                                                    .map(x => { return { ...x } as EncounterViewModel });

        res.send(encounters);
    }

    public static getEncounterTemplateById = async (req: any, res: any) => {
        let id: string = req.params.id.toLocaleLowerCase();
        let encounter: EncounterViewModel = await DataService.getEncounterTemplateById(id) as EncounterViewModel;

        res.send(encounter);
    }
}