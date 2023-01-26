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