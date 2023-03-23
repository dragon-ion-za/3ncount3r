import axios, { AxiosResponse } from 'axios';

import { ByoApiConfig } from '../models/byoApi.config.model';
import { CreatureModel } from '../models/creature.model';

const config = require('config');

export class ByoApiService {

    public static async searchForCreatures(queryString: string) : Promise<CreatureModel[]> {
        let creatures: CreatureModel[] = [];
        let endpoints: ByoApiConfig[] = config.get('byoapis');

        let calls: Record<string, Promise<AxiosResponse<CreatureModel[], any>>> = {};
        endpoints.forEach(endpoint => {
            calls[endpoint.id] = axios.get(`${endpoint.baseUrl}creatures?${queryString}`);
        });

        var callsToAwait = Object.entries(calls).map(([k,v]) => v);
        await Promise.all(callsToAwait);

        Object.entries(calls).map(([k,v]) => k).forEach(async (key) => {
            let data = (await calls[key]).data;
            data.forEach(x => { x.byoapiId = key; });
            creatures.push(...data);
        });

        return creatures;
    }
}