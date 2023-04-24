import { PartyModel } from "../models/party.model";
import { CharacterService } from "../services/character.service";
import { DataService } from "../services/data.service"
import { EncounterCreatureViewModel } from "../view-models/encounterCreature.view-model";
import { PartyViewModel } from "../view-models/party.view-model";
import { BaseController } from "./base.controller";

export class PartiesController extends BaseController<PartyModel, PartyViewModel> {
    
    protected override async doSave(model: PartyModel): Promise<string> {
        return await DataService.saveParty(model);
    }

    protected override async doUpdate(model: PartyModel): Promise<string> {
        return await DataService.updateParty(model);
    }

    protected override async doGet(): Promise<PartyViewModel[]> {
        let parties: PartyModel[] = await (await DataService.getParties())
                                                    .map(x => { return { ...x } });

        let expandedParties: PartyViewModel[] = [];
        for (const party of parties) {
            let expandedParty: PartyViewModel = { characters: [], ...party };
            for (const characterId of party.characterIds) {
                let character: EncounterCreatureViewModel = await CharacterService.getCharacterById(characterId);
                expandedParty.characters.push(character);
            }

            expandedParties.push(expandedParty);
        }

        return expandedParties;
    }

    protected override async doGetById(id: string): Promise<PartyViewModel> {
        let party: PartyModel = await DataService.getPartyById(id);

        let expandedParty: PartyViewModel = { characters: [], ...party };
        for (const characterId of party.characterIds) {
            let character: EncounterCreatureViewModel = await CharacterService.getCharacterById(characterId);
            expandedParty.characters.push(character);
        }

        return expandedParty;
    }
}