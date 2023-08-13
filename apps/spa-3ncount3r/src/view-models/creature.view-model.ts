import { ActionGroupViewModel, ArmourClassViewModel, ChallengeViewModel, CreatureSizes, ResistanceViewModel, SkillModifierViewModel } from "./shared.view-model";

export class CreatureViewModel {
    name: string = '';
    sourceId: string = '';
    byoapiId: string = '';
    size: CreatureSizes = CreatureSizes.Unknown;
    type: string = '';
    alignment: string[] = [];
    armourClass: ArmourClassViewModel | null = null;
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
    skillModifiers: SkillModifierViewModel[] = [];
    passivePerception: number = 0;
    resistances: ResistanceViewModel[] = [];
    immunities: ResistanceViewModel[] = [];
    languages: string[] = [];
    challengeRating: ChallengeViewModel | null = null;
    legendaryCount: number = 3;
    senses: string[] = [];
    savingThrows: SkillModifierViewModel[] = [];
    actionGroups: ActionGroupViewModel[] = [];
    imageUrl: string = '';
}