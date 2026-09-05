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

export class ArmourModel {
    source: string = '';
    value: number = 0;
}

export class ActionGroupModel {
    type: string = '';
    ability: string = '';
    entries: string[] = [];
    items: ActionGroupItemModel[] = [];
}

export class ActionGroupItemModel {
    name: string = '';
    entries: string[] = [];
    items: ActionGroupEntryItemModel[] = [];
}

export class ActionGroupEntryItemModel {
    name: string = '';
    entries: string[] = [];
}

export class HitpointModel {
    type: string = '';
    value: string = '';
}

export class MovementModel {
    type: string = '';
    value: number = 0;
}

export class ResistanceModel {
    type: string = '';
    value: string[] = [];
}

export class ProficiencyModel {
    type: string = '';
    target: string = '';
    value: number = 0;
}

export class VulnerabilityModel {
    type: string = '';
    value: string[] = [];
}