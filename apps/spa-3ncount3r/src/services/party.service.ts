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

export async function getPartyMembers(partyName: string) : Promise<CharacterViewModel[]> {
    let creatures: CharacterViewModel[] = [];

    const response = await axios.get(`${BASE_URL}parties/${partyName}`);

    (response.data as ExpandedPartyViewModel)?.characters.forEach((character: CharacterViewModel) => {
        creatures.push(character);
    });

    return creatures;
}