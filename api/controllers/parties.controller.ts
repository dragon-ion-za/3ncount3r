import { EncounterModel } from "../models/encounter.model";
import { PartyModel } from "../models/party.model";
import { DataService } from "../services/data.service"

export class PartiesController { 
    public static saveParty = async (req: any, res: any) => {
        let encounterId = await DataService.saveParty(req.body as PartyModel);

        res.send(encounterId);
    }

    public static updateParty = async (req: any, res: any) => {
        let encounterId = await DataService.updateParty(req.body as PartyModel);

        res.send(encounterId);
    }

    public static getEncounterTemplates = async (req: any, res: any) => {
        let encounters: EncounterModel[] = await (await DataService.getEncounterTemplates())
                                                    .map(x => { return { 
                                                        name: x.name, 
                                                        id: x.id, 
                                                        creatures: x.creatures, 
                                                        selectedParty: x.selectedParty, 
                                                        roundCount: x.roundCount, 
                                                        currentTurn: x.currentTurn } });

        res.send(encounters);
    }

    public static getEncounterTemplateById = async (req: any, res: any) => {
        let id: string = req.params.id.toLocaleLowerCase();
        let encounter: EncounterModel = await DataService.getEncounterTemplateById(id);

        res.send(encounter);
    }
}