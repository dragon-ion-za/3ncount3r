import axios, { AxiosResponse } from 'axios';

import { ByoApiConfig } from '../models/byoApi.config.model';
import { CreatureModel } from '../models/creature.model';
import { CreatureViewModel } from '../view-models/creature.view-model';

const config = require('config');

export class ByoApiService {

    public static async searchForCreatures(queryString: string) : Promise<CreatureViewModel[]> {
        let creatures: CreatureViewModel[] = [];
        let endpoints: ByoApiConfig[] = config.get('byoapis');

        let calls: Record<string, Promise<AxiosResponse<CreatureModel[], any>>> = {};
        endpoints.forEach(endpoint => {
            calls[endpoint.id] = axios.get(`${endpoint.baseUrl}creatures?${queryString}`);
        });

        var callsToAwait = Object.entries(calls).map(([k,v]) => v);
        await Promise.all(callsToAwait);

        Object.entries(calls).map(([k,v]) => k).forEach(async (key) => {
            let data = (await calls[key]).data;
            data.forEach(x => { 
                let creature: CreatureViewModel = { byoapiId: key, ...x };
                creatures.push(creature); 
            });
        });

        return creatures;
    }

    public static async getCreatureById(id: string, byoapiId: string) : Promise<CreatureViewModel> {
        let creature: CreatureViewModel;
        let endpoint: ByoApiConfig = config.get('byoapis').find((x: ByoApiConfig) => x.id === byoapiId);
        let result = await axios.get(`${endpoint.baseUrl}creatures/${id}`);

        creature = result.data as CreatureViewModel;

        return creature;
    }
}