const config = require('config');

import AdventureModel from "../models/adventure.model";
import { readFile } from "../services/readFile.service";

export class AdventuresController { 
    public static getAdventures = (req: any, res: any) => {
        let jsonAdventures = readFile(`${config.get("dataFileRoot")}data/adventures.json`);
        let adventures: AdventureModel[] = jsonAdventures.adventure.map((x: any) => new AdventureModel(x.name, x.id, x.level.start, x.level.end));
    
        res.send(adventures);
    };
    
    public static getAdventureById = (req: any, res: any) => {
        let jsonAdventures = readFile(`${config.get("dataFileRoot")}data/adventures.json`);    
        let foundAdventure = jsonAdventures.adventure.find((x: any) => x.id.toLocaleLowerCase() === req.params.id.toLocaleLowerCase());
    
        if (foundAdventure === undefined) {
            res.send('Error, not found');
        }

        let adventure: AdventureModel = new AdventureModel(foundAdventure.name, foundAdventure.id, foundAdventure.level.start, foundAdventure.level.end);

        res.send(adventure);
    };
}