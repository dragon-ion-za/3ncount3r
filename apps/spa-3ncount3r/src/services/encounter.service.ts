import axios, { AxiosResponse } from "axios";
import { environment } from "../environments/environment";

import { EncounterCreatureViewModel } from "../view-models/encounter-creature.view-model";
import { EncounterViewModel } from "../view-models/encounter.view-model";

const BASE_URL = environment.apiBaseUrl;

export async function saveEncounter(encounterName: string, encounterCreatures: EncounterCreatureViewModel[], 
    encounterParty: string, roundNumber: number, turnNumber: number): Promise<string> {
    const response = await axios.post(`${BASE_URL}encounters`, { 
        name: encounterName,
        creatures: encounterCreatures,
        selectedParty: encounterParty,
        roundCount: roundNumber,
        currentTurn: turnNumber
     });

     return response.data as string;
}

export async function saveEncounterTemplate(encounterName: string, encounterCreatures: EncounterCreatureViewModel[]): Promise<string> {
    const response = await axios.post(`${BASE_URL}encountertemplates`, { 
        name: encounterName,
        creatures: encounterCreatures,
        roundCount: 1,
        currentTurn: 1
     });

     return response.data as string;
}

export async function updateEncounter(encounterName: string, encounterId: string, encounterCreatures: EncounterCreatureViewModel[], 
    encounterParty: string, roundNumber: number, turnNumber: number): Promise<string> {
    const response = await axios.put(`${BASE_URL}encounters`, { 
        name: encounterName,
        id: encounterId,
        creatures: encounterCreatures,
        selectedParty: encounterParty,
        roundCount: roundNumber,
        currentTurn: turnNumber
     });

     return response.data as string;
}

export async function updateEncounterTemplate(encounterName: string, encounterId: string, encounterCreatures: EncounterCreatureViewModel[]): Promise<string> {
    const response = await axios.put(`${BASE_URL}encountertemplates`, { 
        name: encounterName,
        id: encounterId,
        creatures: encounterCreatures,
        roundCount: 1,
        currentTurn: 1
     });

     return response.data as string;
}

export async function getEncounters() : Promise<EncounterViewModel[]> {
    let calls: Promise<AxiosResponse<EncounterViewModel[], any>>[] = [];
    calls.push(axios.get(`${BASE_URL}encounters`));
    calls.push(axios.get(`${BASE_URL}encountertemplates`));

    await Promise.all(calls);

    let response: EncounterViewModel[] = [];
    for (let call of calls) {
        response.push(...(await call).data)
    }

    return response;
}

export async function getEncounterById(id: string) : Promise<EncounterViewModel> {
    const response = await axios.get(`${BASE_URL}encounters/${id}`);

    return response.data as EncounterViewModel;
}

export async function getEncounterTemplateById(id: string) : Promise<EncounterViewModel> {
    const response = await axios.get(`${BASE_URL}encountertemplates/${id}`);

    return response.data as EncounterViewModel;
}