import axios from "axios";

import { EncounterCreatureViewModel } from "../../view-models/encounter-creature.view-model";
import { EncounterViewModel } from "../../view-models/encounter.view-model";

export async function saveEncounter(encounterName: string, encounterCreatures: EncounterCreatureViewModel[], encounterParty: string): Promise<string> {
    const response = await axios.post('http://localhost:5001/encounters', { 
        name: encounterName,
        creatures: encounterCreatures,
        selectedParty: encounterParty
     });

     return response.data as string;
}

export async function updateEncounter(encounterName: string, encounterId: string, encounterCreatures: EncounterCreatureViewModel[], encounterParty: string): Promise<string> {
    const response = await axios.put('http://localhost:5001/encounters', { 
        name: encounterName,
        id: encounterId,
        creatures: encounterCreatures,
        selectedParty: encounterParty
     });

     return response.data as string;
}

export async function getEncounters() : Promise<EncounterViewModel[]> {
    const response = await axios.get('http://localhost:5001/encounters');

    return response.data as EncounterViewModel[];
}

export async function getEncounterById(id: string) : Promise<EncounterViewModel> {
    const response = await axios.get(`http://localhost:5001/encounters/${id}`);

    return response.data as EncounterViewModel;
}