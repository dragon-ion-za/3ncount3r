class AdventureModel {
    name: string;
    id: string;
    startingLevel: number;
    endingLevel: number;

    constructor (adventureName: string, adventureId: string, adventureStartingLevel: number, adventureEndingLevel: number) {
        this.name = adventureName;
        this.id = adventureId;
        this.startingLevel = adventureStartingLevel;
        this.endingLevel = adventureEndingLevel;
    }
}

export default AdventureModel;