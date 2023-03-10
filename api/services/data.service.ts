import * as mongoDB from "mongodb";
import { v4 as uuid } from 'uuid';

import { EncounterModel } from "../models/encounter.model";

export class DataService {
    private static dbUrl: string = 'mongodb://localhost:27017/3ncount3r';
    private static mongoClient: mongoDB.MongoClient = new mongoDB.MongoClient(this.dbUrl);
    private static collections: { encounters?: mongoDB.Collection<EncounterModel> } = {};

    private static async connectToDb() {
        await this.mongoClient.connect();

        const db: mongoDB.Db = this.mongoClient.db('3ncount3r_data');
        const encounterCollection: mongoDB.Collection<EncounterModel> = db.collection<EncounterModel>('Encounters');
        this.collections.encounters = encounterCollection;
        
        console.log(`Successfully connected to database: ${db.databaseName} and collection: ${encounterCollection.collectionName}`);
    }

    public static async saveEncounter(encounter: EncounterModel) : Promise<string> {
        await this.connectToDb();
        encounter.id = uuid();
        let result = await this.collections.encounters?.insertOne(encounter);

        if (result?.acknowledged) {
            return encounter.id;
        } else {
            return '';
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
            return '';
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
}