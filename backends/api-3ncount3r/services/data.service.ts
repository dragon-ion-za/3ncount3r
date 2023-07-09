import * as mongoDB from "mongodb";
import { v4 as uuid } from 'uuid';

const config = require('config');

import { EncounterModel } from "../models/encounter.model";
import { PartyModel } from "../models/party.model";
import { CharacterModel } from "../models/character.model";
import { UtilityService } from "./utilit.service";

export class DataService {
    private static dbUrl: string = config.get('connectionStrings.3ncount3rContext');
    private static mongoClient: mongoDB.MongoClient = new mongoDB.MongoClient(this.dbUrl);
    private static collections: { 
        encounterTemplates? : mongoDB.Collection<EncounterModel>, 
        encounters?: mongoDB.Collection<EncounterModel>,
        parties?: mongoDB.Collection<PartyModel>,
        characters?: mongoDB.Collection<CharacterModel> } = {};

    private static async connectToDb() {
        await this.mongoClient.connect();

        const db: mongoDB.Db = this.mongoClient.db('3ncount3r_data');
        this.collections.encounters = db.collection<EncounterModel>('Encounters');
        this.collections.encounterTemplates = db.collection<EncounterModel>('EncounterTemplates');
        this.collections.parties = db.collection<PartyModel>('Parties');
        this.collections.characters = db.collection<CharacterModel>('Characters');
        
        console.log(`Successfully connected to database: ${db.databaseName}`);
    }

    public static async saveEncounter(encounter: EncounterModel) : Promise<string> {
        await this.connectToDb();
        encounter.id = uuid();
        let result = await this.collections.encounters?.insertOne(encounter);

        if (result?.acknowledged) {
            return encounter.id;
        } else {
            return 'Error occurred';
        }
    }

    public static async updateEncounter(encounter: EncounterModel) : Promise<string> {
        await this.connectToDb();
        console.log(encounter);
        let result = await this.collections.encounters?.updateOne({id: encounter.id}, { $set: { 
            name: encounter.name,
            creatures: encounter.creatures,
            selectedParty: encounter.selectedParty
         } });

        if (result?.acknowledged) {
            return encounter.id;
        } else {
            return 'Error occurred';
        }
    }

    public static async getEncounters(): Promise<EncounterModel[]> {
        await this.connectToDb();
        return (await this.collections.encounters?.find({}).toArray()) as EncounterModel[];
    }

    public static async getEncounterById(id: string): Promise<EncounterModel> {
        await this.connectToDb();
        let encounter = (await this.collections.encounters?.findOne({ id: id })) as EncounterModel;

        return encounter;
    }

    public static async saveEncounterTemplate(encounter: EncounterModel) : Promise<string> {
        await this.connectToDb();
        encounter.id = uuid();
        let result = await this.collections.encounterTemplates?.insertOne(encounter);

        if (result?.acknowledged) {
            return encounter.id;
        } else {
            return '';
        }
    }

    public static async updateEncounterTemplate(encounter: EncounterModel) : Promise<string> {
        await this.connectToDb();
        console.log(encounter);
        let result = await this.collections.encounterTemplates?.updateOne({id: encounter.id}, { $set: { 
            name: encounter.name,
            creatures: encounter.creatures,
            selectedParty: encounter.selectedParty,
            currentTurn: encounter.currentTurn,
            roundCount: encounter.roundCount
         } });

        if (result?.acknowledged) {
            return encounter.id;
        } else {
            return '';
        }
    }

    public static async getEncounterTemplates(): Promise<EncounterModel[]> {
        await this.connectToDb();
        return (await this.collections.encounterTemplates?.find({}).toArray()) as EncounterModel[];
    }

    public static async getEncounterTemplateById(id: string): Promise<EncounterModel> {
        await this.connectToDb();
        let encounter = (await this.collections.encounterTemplates?.findOne({ id: id })) as EncounterModel;

        return encounter;
    }

    public static async saveParty(party: PartyModel) : Promise<string> {
        await this.connectToDb();
        party.id = uuid();
        let result = await this.collections.parties?.insertOne(party);

        if (result?.acknowledged) {
            return party.id;
        } else {
            return '';
        }
    }

    public static async updateParty(party: PartyModel) : Promise<string> {
        await this.connectToDb();

        let result = await this.collections.parties?.updateOne({id: party.id}, { $set: { 
            ...party
         } });

        if (result?.acknowledged) {
            return party.id;
        } else {
            return '';
        }
    }

    public static async getParties(): Promise<PartyModel[]> {
        await this.connectToDb();
        return (await this.collections.parties?.find({}).toArray()) as PartyModel[];
    }

    public static async getPartyById(id: string): Promise<PartyModel> {
        await this.connectToDb();
        let party = (await this.collections.parties?.findOne({ id: id })) as PartyModel;

        return party;
    }

    public static async saveCharacter(character: CharacterModel) : Promise<string> {
        await this.connectToDb();
        character.id = `${character.name}.${UtilityService.getRandomInt(1000, 9999)}`;
        let result = await this.collections.characters?.insertOne(character);

        if (result?.acknowledged) {
            return character.id;
        } else {
            console.log(result);
            return 'Error occurred';
        }
    }

    public static async updateCharacter(character: CharacterModel) : Promise<string> {
        await this.connectToDb();

        let result = await this.collections.characters?.updateOne({id: character.id}, { $set: { 
            ...character
         } });

        if (result?.acknowledged) {
            return character.id;
        } else {
            return 'Error occurred';
        }
    }

    public static async getCharacters(): Promise<CharacterModel[]> {
        await this.connectToDb();
        return (await this.collections.characters?.find({}).toArray()) as CharacterModel[];
    }

    public static async getCharacterById(id: string): Promise<CharacterModel> {
        await this.connectToDb();
        let character = (await this.collections.characters?.findOne({ id: id })) as CharacterModel;

        return character;
    }
}