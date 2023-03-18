export enum CreatureSizes {
    Unknown = 0,
    Tiny,
    Small,
    Medium,
    Large,
    Huge,
    Gargantuan
}

export enum SpellTypes {
    Unknown = 0,
    Slot,
    Daily,
    Each
}

export class ArmourClassModel {
    armourClass: number;
    appliedFrom: string;
    condition: string = '';
    alternateForms: ArmourClassModel[] = [];

    constructor(ac: number, appliedFrom: string, condition: string = '') {
        this.armourClass = ac;
        this.appliedFrom = appliedFrom;
        this.condition = condition;
    }
}

export class SkillModifierModel {
    skillName: string;
    modifier: number;

    constructor(name: string, modifier: number) {
        this.modifier = modifier;
        this.skillName = name;
    }
}

export class CreatureTraitModel {
    name: string;
    entries: string[];

    constructor(name: string, entries: string[]) {
        this.name = name;
        this.entries = entries;
    }
}

export class ResistanceModel {
    resistantTo: string;
    condition: string;

    constructor(resistantTo: string, condition: string) {
        this.resistantTo = resistantTo;
        this.condition = condition;
    }
}

export class SpellcastingModel {
    name: string = '';
    entries: string[] = [];
    atWill: string[] = [];
    withResources: KnownSpellsModel[] = [];
    ability: string = '';
}

export class KnownSpellsModel {
    type: SpellTypes = SpellTypes.Unknown;
    resource: string = '';
    level: string = '';
    spells: string[] = [];
}

export class SpecialActionModel {
    type: string = '';
    name: string = '';
    items: (string | SpecialActionModel)[] = [];
}

export class ActionGroupModel {
    name: string = '';
    items: SpecialActionModel[] = [];
}