import axios from 'axios';
import { environment } from '../environments/environment';

import { CharacterViewModel } from '../view-models/character.view-model';

const BASE_URL = environment.apiBaseUrl;
const RULE_SYSTEM = environment.activeRuleSystem;

export async function doCharacterSearch(accessToken: string, criteria: string) : Promise<CharacterViewModel[]> {
    let creatures: CharacterViewModel[] = [];

    const response = await axios.get(`${BASE_URL}characters/${RULE_SYSTEM}?$filter=contains(tolower(name), tolower('${criteria}'))`);

    response.data.map((x: any) => creatures.push(x as CharacterViewModel));
    console.log(response.data);

    return creatures;
}