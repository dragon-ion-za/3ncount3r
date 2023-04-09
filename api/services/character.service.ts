import axios, { AxiosResponse } from 'axios';
import { CharacterViewModel } from '../view-models/character.view-model';

const config = require('config');

export class CharacterService {

    public static async getCharacterById(characterId: string) : Promise<CharacterViewModel> {
        let character: CharacterViewModel;
        
        let response: AxiosResponse = await axios.get(`${config.characterApi.baseUrl}characters/${characterId}`);
        character = response.data as CharacterViewModel;

        return character;
    }
}