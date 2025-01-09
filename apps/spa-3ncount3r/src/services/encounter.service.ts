import axios, { AxiosResponse } from "axios";
import { environment } from "../environments/environment";

import { EncounterCreatureViewModel } from "../view-models/encounter-creature.view-model";
import { EncounterViewModel } from "../view-models/encounter.view-model";

const BASE_URL = environment.apiBaseUrl;
const RULE_SYSTEM = environment.activeRuleSystem;

export async function saveEncounter(accessToken: string, viewModel: EncounterViewModel): Promise<string> {
    const response = await axios.post(`${BASE_URL}encounters/${RULE_SYSTEM}`, viewModel, { headers: {'Authorization': `bearer ${accessToken}`} });

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

export async function updateEncounter(accessToken: string, viewModel: EncounterViewModel): Promise<string> {
    const response = await axios.put(`${BASE_URL}encounters/${RULE_SYSTEM}`, viewModel, { headers: {'Authorization': `bearer ${accessToken}`} });

     return response.data as string;
}

export async function getEncounters(accessToken: string) : Promise<EncounterViewModel[]> {
    const response = await axios.get(`${BASE_URL}encounters/${RULE_SYSTEM}`, { headers: {'Authorization': `bearer ${accessToken}`} })
    return response.data as EncounterViewModel[];
}

export async function getEncounterById(accessToken: string, id: string) : Promise<EncounterViewModel> {
    const response = await axios.get(`${BASE_URL}encounters/${RULE_SYSTEM}/${id}`, { headers: {'Authorization': `bearer ${accessToken}`} });

    return response.data as EncounterViewModel;
}