import axios from 'axios';
import { environment } from '../environments/environment';

import { CreatureViewModel } from "../view-models/creature.view-model";

const BASE_URL = environment.apiBaseUrl;
const RULE_SYSTEM = environment.activeRuleSystem;

export async function doCreatureSearch(criteria: string) : Promise<CreatureViewModel[]> {
    let creatures: CreatureViewModel[] = [];

    const response = await axios.get(`${BASE_URL}creatures/${RULE_SYSTEM}?$filter=contains(tolower(name), tolower('${criteria}'))`);

    response.data.map((x: any) => creatures.push(x as CreatureViewModel));
    console.log(response.data);

    return creatures;
}