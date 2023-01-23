import { ItemViewModel } from "./item.view-model";
import { CreatureSizes, CreatureTraitViewModel, ResistanceViewModel, SpellcastingViewModel } from "./shared.view-model";

export interface ClassViewModel {
    name: string;
    level: number;
}

export class CharacterViewModel {
    id: string = '';
    name: string = '';
    size: CreatureSizes = CreatureSizes.Unknown;
    level: number = 0;
    race: string = '';
    classes: ClassViewModel[] = [];
    hitpointMaximum: number = 0;
    proficiencyBonus: number = 0;
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
    savingThrowProficiencies: string[] = [];
    passivePerception: number = 0;
    resistances: ResistanceViewModel[] = [];
    immunities: ResistanceViewModel[] = [];
    languages: string[] = [];
    traits: CreatureTraitViewModel[] = [];
    actions: CreatureTraitViewModel[] = [];
    reactions: CreatureTraitViewModel[] = [];
    spellcasting: SpellcastingViewModel[] = [];
    equipment: ItemViewModel[] = [];
    inventory: ItemViewModel[] = [];
    senses: string[] = [];
}