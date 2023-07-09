import { SpecialActionModel } from "./sharedModels";

export enum ItemTypes {
    Unknown = 0,
    Weapon,
    Armour,
    Ring,
    Amulet,
    Generic,
    Tattoo
}

export enum ItemPropertyTypes {
    Unknown = 0,
    Damage,
    DamageVersatile,
    DamageExtra,
    Armour,
    Healing,
    Range,
    Disadvantage
}

export class ItemPropertyModel {
    name: string = '';
    value: string = '';
    type: ItemPropertyTypes = ItemPropertyTypes.Unknown;

    constructor(name: string, value: string, type: ItemPropertyTypes) {
        this.name = name;
        this.value = value;
        this.type = type;
    }
}

export class ItemModel {
    name: string;
    type: ItemTypes;
    wondrous: boolean = false;
    attunementRequirements: string = '';
    properties: ItemPropertyModel[] = [];
    entries: SpecialActionModel[] = [];

    constructor(name: string, type: ItemTypes) {
        this.name = name;
        this.type = type;
    }
}