export class CreatureViewModel {
    name: string = '';
    sourceId: string = '';
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
    challengeRating: number = 0;
    traits: CreatureTraitViewModel[] = [];
    actions: CreatureTraitViewModel[] = [];
    reactions: CreatureTraitViewModel[] = [];
    legendaryActions: CreatureTraitViewModel[] = [];
    legendaryCount: number = 3;
    spellcasting: SpellcastingViewModel[] = [];
    lairActions: SpecialActionViewModel[] = [];
    regionalEffects: SpecialActionViewModel[] = [];
    mythicEncounter: SpecialActionViewModel[] = [];
}

export enum CreatureSizes {
    Unknown = 0,
    Tiny,
    Small,
    Medium,
    Large,
    Huge,
    Gargantuant
}

export enum SpellTypes {
    Unknown = 0,
    Slot,
    Daily,
    Each
}

export class ArmourClassViewModel {
    armourClass: number = 0;
    appliedFrom: string = '';
    condition: string = '';
    alternateForms: ArmourClassViewModel[] = [];
}

export class SkillModifierViewModel {
    skillName: string = '';
    modifier: number = 0;
}

export class ResistanceViewModel {
    resistantTo: string = '';
    condition: string = '';
}

export class CreatureTraitViewModel {
    name: string = '';
    entries: string[] = [];
}

export class SpellcastingViewModel {
    name: string = '';
    entries: string[] = [];
    atWill: string[] = [];
    withResources: KnownSpellsViewModel[] = [];
    ability: string = '';
}

export class KnownSpellsViewModel {
    type: SpellTypes = SpellTypes.Unknown;
    resource: string = '';
    level: string = '';
    spells: string[] = [];
}

export class SpecialActionViewModel {
    type: string = '';
    items: string[] = [];
}