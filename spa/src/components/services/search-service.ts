import axios from 'axios';
import { CreatureViewModel } from "../../view-models/creature.view-model.ts";

export async function doCreatureSearch(criteria: string) : Promise<CreatureViewModel[]> {
    let creatures: CreatureViewModel[] = [];

    const response = await axios.get(`http://localhost:5001/creatures?$filter=name like ${criteria}`);

    response.data.map((x: any) => creatures.push(x as CreatureViewModel));
    console.log(response.data);

    return creatures;
}