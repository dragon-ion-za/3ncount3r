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

    public static getParties = async (req: any, res: any) => {
        let parties: PartyModel[] = await (await DataService.getParties())
                                                    .map(x => { return { ...x } });

        res.send(parties);
    }

    public static getPartyById = async (req: any, res: any) => {
        let id: string = req.params.id.toLocaleLowerCase();
        let party: PartyModel = await DataService.getPartyById(id);

        res.send(party);
    }
}