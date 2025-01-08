import axios from 'axios';
import { environment } from '../environments/environment';

import { CharacterViewModel } from '../view-models/character.view-model';
import { ExpandedPartyViewModel } from '../view-models/expanded-party.view-model';
import { PartyViewModel } from '../view-models/party.view-model';

const BASE_URL = environment.apiBaseUrl;
const RULE_SYSTEM = environment.activeRuleSystem;
const API_ROUTE = `${BASE_URL}parties/${RULE_SYSTEM}`;

export async function getPartyList(accessToken: string) : Promise<PartyViewModel[]> {
    let creatures: PartyViewModel[] = [];

    const response = await axios.get(API_ROUTE, { headers: {'Authorization': `bearer ${accessToken}`} });

    response.data.map((x: any) => creatures.push(x as PartyViewModel));
    console.log(response.data);

    return creatures;
}

export async function getPartyMembers(partyName: string, accessToken: string) : Promise<CharacterViewModel[]> {
    let creatures: CharacterViewModel[] = [];

    const response = await axios.get(`${API_ROUTE}/${partyName}`, { headers: {'Authorization': `bearer ${accessToken}`} });

    (response.data as ExpandedPartyViewModel)?.characters.forEach((character: CharacterViewModel) => {
        creatures.push(character);
    });

    return creatures;
}

export async function saveParty(accessToken: string, viewModel: PartyViewModel): Promise<string> {
    const response = await axios.post(API_ROUTE, viewModel, { headers: {'Authorization': `bearer ${accessToken}`} });

     return response.data as string;
}

export async function updateParty(accessToken: string, viewModel: PartyViewModel): Promise<string> {
    const response = await axios.put(API_ROUTE, viewModel, { headers: {'Authorization': `bearer ${accessToken}`} });

     return response.data as string;
}