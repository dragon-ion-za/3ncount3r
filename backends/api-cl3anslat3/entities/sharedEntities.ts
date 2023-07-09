export interface OtherSource {
    source: string;
}

export interface Type {
    type: string;
    tags: string[];
}

export interface Ac {
    ac: number;
    from: string[];
    condition: string;
}

export interface Hp {
    average: number;
    formula: string;
    special: string;
}

export interface Speed {
    walk: number;
    climb: number;
    burrow: number;
    swim: number;
    fly: ComplexSpeed | number;
    canHover: boolean;
}

export interface ComplexSpeed {
    number: number;
    condition: string;
}

export interface Trait {
    name: string;
    entries: string[] | ComplexTrait[];
}

export interface ComplexTrait {
    name: string;
    type: string;
    style: string;
    entry: string;
    items: string[] | ComplexTrait[];
}

export interface SoundClip {
    type: string;
    path: string;
}

export interface Mod {
    trait: Trait;
}

export interface Copy {
    name: string;
    source: string;
    _mod: Mod;
}

export interface ComplexResist {
    special: string;
    resist: string[];
    note: string;
    cond: boolean;
}

export interface ComplexImmunity {
    special: string;
    immune: string[];
    note: string;
    cond: boolean;
}

export interface Spellcasting {
    name: string;
    headerEntries: string[];
    footerEntries: string[];
    spells: { [key: string] : KnownSpells };
    will: string[];
    daily: { [key: string] : string[] };
    ability: string;
    hidden: string[];
}

export interface KnownSpells {
    slots: number;
    spells: string[];
}

export interface LegendaryGroup {
    name: string;
}

export interface Save {
    str: string;
    dex: string;
    con: string;
    wis: string;
    int: string;
    cha: string;
}