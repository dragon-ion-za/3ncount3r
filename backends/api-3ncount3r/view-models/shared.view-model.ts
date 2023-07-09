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

export class SpecialActionViewModel {
    type: string = '';
    name: string = '';
    items: (string | SpecialActionViewModel)[] = [];
}

export interface KeyValuePair<TKey, TValue> {
    key: TKey;
    value: TValue;
}

export interface ActionGroupViewModel {
    name: string;
    items: SpecialActionViewModel[];
}