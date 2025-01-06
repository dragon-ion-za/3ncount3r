const path = require('path');
const config = require('config');

import { createFilter } from 'odata-v4-inmemory'

import { creatureEntityToModelConverter } from "../converters/creature.converter";
import { CreatureEntity } from "../entities/creature.entity";
import { LegendaryGroupEntity } from "../entities/legendary-group.entity";
import { CreatureModel } from "../models/creature.model";
import { readFile } from "../services/readFile.service";

export class CreaturesController {

    public static getCreatures = (req: any, res: any) => {    
        res.send(this.doCreatureSearch(req.query.$filter ?? '', req.protocol + '://' + req.get('host')));
    }

    public static queryCreatures = (req: any, res: any) => {
        res.send(this.doCreatureSearch(req.body.filter ?? '', req.protocol + '://' + req.get('host')));
    }

    public static getCreature = (req: any, res: any) => {
        let creatures: CreatureModel[] = this.doCreatureSearch(`name eq ${req.params.name}`, req.protocol + '://' + req.get('host'));
        if (creatures.length > 0) {
            res.send(creatures[0]);
        } else {
            res.send([]);
        }
    }
    
    public static getCreatureImage = (req: any, res: any) => {
        res.sendFile(`img/${req.params.sourceId}/${req.params.name}.png`, { root: config.get("dataFileRoot") });
    };

    private static doCreatureSearch = (query: string, hostString: string): CreatureModel[] => {
        const files = config.get("bestiaries") as string[];
        const legendaryDataFiles = config.get("legendary") as string[];
        
        let creatures: CreatureModel[] = [];
        let dataFilter = createFilter(query);
        
        let legendaryGroups: LegendaryGroupEntity[] = [];
        legendaryDataFiles.forEach(file => {
            let legendaryFile = readFile(`${config.get("dataFileRoot")}data/bestiary/${file}`);            
            legendaryGroups.push(legendaryFile.legendaryGroup);
        });
    
        files.forEach(file => {
            let jsonCreatures = readFile(`${config.get("dataFileRoot")}data/bestiary/${file}`);
            jsonCreatures.monster
                .filter((x: CreatureEntity) => x.copyFrom == null)
                .filter(dataFilter)
                .map((x: CreatureEntity) => creatureEntityToModelConverter(hostString, x, legendaryGroups))
                .forEach((x: CreatureModel) => creatures.push(x));
        });
        
        return creatures;
    }
}