import { CreatureSizes, ArmourClassModel, SkillModifierModel, ResistanceModel, ActionGroupModel, ChallengeModel } from "./sharedModels";

export class ClassModel {
    name: string = '';
    level: number = 0;
    byoapiId: string = '';
}

export class EquipmentModel {
    name: string = '';
    byoapiId: string = '';
}

export class CharacterModel {
    id: string = '';
    name: string;

    size: CreatureSizes = CreatureSizes.Unknown;
    race: string = '';
    classes: ClassModel[] = [];
    alignment: string[] = [];
    level: number = 0;

    equipment: EquipmentModel[] = [];
    inventory: EquipmentModel[] = [];
    
    hitpointMax: number = 0;
    hitpointCurrent: number = 0;
    hitpointTemporary: number = 0;

    walkingSpeed: number = 0;
    climbingSpeed: number = 0;
    burrowingSpeed: number = 0;
    swimmingSpeed: number = 0;
    flyingSpeed: number = 0;
    canHover: boolean = false;
    speedConditions: string[] = [];

    attributeStr: number = 0;
    attributeDex: number = 0;
    attributeCon: number = 0;
    attributeInt: number = 0;
    attributeWis: number = 0;
    attributeCha: number = 0;
    
    skillProficiencies: string[] = [];
    skillProficiencyModifiers: SkillModifierModel[] = [];
    savingThrowProficiencies: string[] = [];
    savingThrowModifiers: SkillModifierModel[] = [];
    languages: string[] = [];

    passivePerception: number = 0;
    senses: string[] = [];

    resistances: ResistanceModel[] = [];
    immunities: ResistanceModel[] = [];

    actionGroups: ActionGroupModel[] = [];
    initiative: number = 0;

    challengeRating: ChallengeModel | null = null;
    imageUrl: string = '';

    constructor (name: string) {
        this.name = name;
    }
}