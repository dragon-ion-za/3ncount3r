import { SpecialActionViewModel } from "./shared.view-model";

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

export class ItemPropertyViewModel {
    name: string = '';
    value: string = '';
    type: ItemPropertyTypes = ItemPropertyTypes.Unknown;

    constructor(name: string, value: string, type: ItemPropertyTypes) {
        this.name = name;
        this.value = value;
        this.type = type;
    }
}

export class ItemViewModel {
    name: string = '';
    type: ItemTypes = ItemTypes.Unknown;
    wondrous: boolean = false;
    attunementRequirements: string = '';
    properties: ItemPropertyViewModel[] = [];
    entries: SpecialActionViewModel[] = [];
}