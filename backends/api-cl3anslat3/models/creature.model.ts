import { ResistanceModel, ActionGroupModel, ArmourModel, HitpointModel, MovementModel, ProficiencyModel, VulnerabilityModel } from "./sharedModels";

export class CreatureModel {
    name: string;
    source: string = '';
    difficulty: string = '';
    copyFrom: string = '';
    imageUrl: string = '';
    misc: any;
    armour: ArmourModel[] = [];
    actionGroups: ActionGroupModel[] = [];
    attributes: Record<string, number>[] = [];
    hitpoints: HitpointModel[] = [];
    movement: MovementModel[] = [];
    immunities: string[] = [];
    resistances: ResistanceModel[] = [];
    vulnerabilities: VulnerabilityModel[] = [];
    languages: string[] = [];
    senses: string[] = [];
    proficiencies: ProficiencyModel[] = [];

    constructor (name: string) {
        this.name = name;
    }
}