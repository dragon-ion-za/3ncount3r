import axios from 'axios';

import { CreatureViewModel } from "../view-models/creature.view-model";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export async function doCreatureSearch(criteria: string) : Promise<CreatureViewModel[]> {
    let creatures: CreatureViewModel[] = [];

    const response = await axios.get(`${BASE_URL}creatures?$filter=name like ${criteria}`);

    response.data.map((x: any) => creatures.push(x as CreatureViewModel));
    console.log(response.data);

    return creatures;
}