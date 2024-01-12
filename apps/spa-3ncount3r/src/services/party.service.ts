import axios from 'axios';
import { environment } from '../environments/environment';

import { CharacterViewModel } from '../view-models/character.view-model';
import { ExpandedPartyViewModel } from '../view-models/expanded-party.view-model';
import { PartyViewModel } from '../view-models/party.view-model';

const BASE_URL = environment.apiBaseUrl;

export async function getPartyList() : Promise<PartyViewModel[]> {
    let creatures: PartyViewModel[] = [];

    const response = await axios.get(`${BASE_URL}parties`);

    response.data.map((x: any) => creatures.push(x as PartyViewModel));
    console.log(response.data);

    return creatures;
}

export async function getParty(partyName: string) : Promise<ExpandedPartyViewModel> {
    const response = await axios.get(`${BASE_URL}parties/${partyName}`);
    return response.data as ExpandedPartyViewModel;
}