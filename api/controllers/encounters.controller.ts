import { EncounterModel } from "../models/encounter.model";
import { DataService } from "../services/data.service"

export class EncountersController { 
    public static saveEncounter = async (req: any, res: any) => {
        let encounterId = await DataService.saveEncounter(req.body as EncounterModel);

        res.send(encounterId);
    }

    public static updateEncounter = async (req: any, res: any) => {
        let encounterId = await DataService.updateEncounter(req.body as EncounterModel);

        res.send(encounterId);
    }

    public static getEncounters = async (req: any, res: any) => {
        let encounters: EncounterModel[] = await (await DataService.getEncounters()).map(x => { return { name: x.name, id: x.id, creatures: [], selectedParty: '' } });

        res.send(encounters);
    }

    public static getEncounterById = async (req: any, res: any) => {
        let id: string = req.params.id.toLocaleLowerCase();
        let encounter: EncounterModel = await DataService.getEncounterById(id);

        res.send(encounter);
    }
}