import axios from "axios";

import { EncounterCreatureViewModel } from "../../view-models/encounter-creature.view-model";

export async function saveEncounter(encounterName: string, encounterCreatures: EncounterCreatureViewModel[], encounterParty: string): Promise<string> {
    const response = await axios.post('http://localhost:5001/encounters', { 
        name: encounterName,
        creatures: encounterCreatures,
        selectedParty: encounterParty
     });

     return response.data as string;
}