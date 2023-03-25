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
        let encounters: EncounterModel[] = await (await DataService.getEncounters())
                                                    .map(x => { return { 
                                                        name: x.name, 
                                                        id: x.id, 
                                                        creatures: x.creatures, 
                                                        selectedParty: x.selectedParty, 
                                                        roundCount: x.roundCount, 
                                                        currentTurn: x.currentTurn } });

        let encounterTemplates: EncounterModel[] = await (await DataService.getEncounterTemplates())
                                                        .map(x => { return { 
                                                            name: x.name, 
                                                            id: x.id, 
                                                            creatures: x.creatures, 
                                                            selectedParty: x.selectedParty, 
                                                            roundCount: x.roundCount, 
                                                            currentTurn: x.currentTurn } });

        res.send(encounters.concat(encounterTemplates));
    }

    public static getEncounterById = async (req: any, res: any) => {
        let id: string = req.params.id.toLocaleLowerCase();
        let encounter: EncounterModel = await DataService.getEncounterById(id) as EncounterModel;

        console.log(encounter);

        res.send(encounter);
    }
}