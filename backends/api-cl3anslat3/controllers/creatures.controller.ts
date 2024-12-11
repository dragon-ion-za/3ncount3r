const path = require('path');
const config = require('config');

import { creatureEntityToModelConverter } from "../converters/creature.converter";
import { CreatureEntity } from "../entities/creature.entity";
import { SourceConfigModel } from "../entities/source-config.model";
import { CreatureModel } from "../models/creature.model";
import { readFile } from "../services/readFile.service";

export class CreaturesController {

    public static getCreatures = (req: any, res: any) => {    
        res.send(this.doCreatureSearch(req.params.ruleSystem, req.query.$filter ?? '', req.protocol + '://' + req.get('host')));
    }

    public static getCreature = (req: any, res: any) => {
        let creatures: CreatureModel[] = this.doCreatureSearch(req.params.ruleSystem, `name eq ${req.params.name}`, req.protocol + '://' + req.get('host'));
        if (creatures.length > 0) {
            res.send(creatures[0]);
        } else {
            res.send([]);
        }
    }
    
    public static getCreatureImage = (req: any, res: any) => {
        res.sendFile(`img/${req.params.sourceId}/${req.params.name}.png`, { root: config.get("dataFileRoot") });
    };

    private static doCreatureSearch = (ruleSystem: string, query: string, hostString: string): CreatureModel[] => {
        const files = config.get("bestiaries") as SourceConfigModel[];
        const legendaryDataFiles = config.get("legendary") as SourceConfigModel[];
        
        let creatures: CreatureModel[] = [];
        let dataFilter = this.buildOdataCreatureFilter(query);
        
        let legendaryFile = legendaryDataFiles.find(x => x.ruleSystem === ruleSystem);
        let legendaryGroups = readFile(`${config.get("dataFileRoot")}data/bestiary/${legendaryFile?.fileName}`);
    
        files.filter(x => x.ruleSystem === ruleSystem).forEach(file => {
            let jsonCreatures = readFile(`${config.get("dataFileRoot")}data/bestiary/${file.fileName}`);
            jsonCreatures.monster
                .filter((x: CreatureEntity) => x.copyFrom == null)
                .filter((x: CreatureEntity) => dataFilter(x))
                .map((x: CreatureEntity) => creatureEntityToModelConverter(hostString, x, legendaryGroups.legendaryGroup))
                .forEach((x: CreatureModel) => creatures.push(x));
        });
        
        return creatures;
    }
    
    private static buildOdataCreatureFilter(reqQuery: string) : (x: CreatureEntity) => any {
    
        if (reqQuery !== undefined) {
            let filterValues: string[] = reqQuery.split(' ');
    
            return (x: CreatureEntity) => { 
                type ObjectKey = keyof typeof x;
                const filterKey = filterValues[0] as ObjectKey;
    
                let searchValue = filterValues.slice(2).join(' ');
    
                switch (filterValues[1]) {
                    case 'like':
                        return (x[filterKey] as string).toLocaleLowerCase().indexOf(searchValue) > -1;
    
                    default:
                        return (x[filterKey] as string) === searchValue;
                }
    
                
            };
        }
    
        return (x: CreatureEntity) => { return true; };
    }

}