import { CreatureSizes, ArmourClassModel, SkillModifierModel, ResistanceModel, ActionGroupModel } from "./sharedModels";

export class CharacterModel {
    id: string = '';
    name: string;
    size: CreatureSizes = CreatureSizes.Unknown;
    type: string = '';
    alignment: string[] = [];
    armourClass: ArmourClassModel | null = null;
    hitpointAverage: number = 0;
    hitpointFormula: string = '';
    hitpointSpecial: string = '';
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
    skillModifiers: SkillModifierModel[] = [];
    passivePerception: number = 0;
    resistances: ResistanceModel[] = [];
    immunities: ResistanceModel[] = [];
    languages: string[] = [];
    challengeRating: number = 0;
    legendaryCount: number = 3;
    senses: string[] = [];
    savingThrows: SkillModifierModel[] = [];
    actionGroups: ActionGroupModel[] = [];
    imageUrl: string = '';

    constructor (name: string) {
        this.name = name;
    }
}