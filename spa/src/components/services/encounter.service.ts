import axios from "axios";
import { IEncounterContext } from "../contexts/encounter.context-interface";

export async function saveEncounter(encounterContext: IEncounterContext): Promise<boolean> {
    const response = await axios.post('http://localhost:5001/encounters', { 
        creatures: encounterContext.creatures,
        selectedParty: encounterContext.selectedParty
     });

    return response.status === 200;
}