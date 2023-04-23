import axios, { AxiosResponse } from 'axios';
import { EncounterCreatureViewModel } from '../view-models/encounterCreature.view-model';

const config = require('config');

export class CharacterService {

    public static async getCharacterById(characterId: string) : Promise<EncounterCreatureViewModel> {
        let character: EncounterCreatureViewModel;
        
        let response: AxiosResponse = await axios.get(`${config.characterApi.baseUrl}characters/${characterId}`);
        character = response.data as EncounterCreatureViewModel;

        return character;
    }
}