import { Armour, ActionGroup, Hitpoint, Movement, Resistance, Proficiency } from "./sharedEntities";

export interface CreatureEntity {
    name: string;
    source: string;
    difficulty: string;
    copyFrom: string;
    misc: any;
    armour: Armour[];
    actionGroups: ActionGroup[];
    attributes: Record<string, number>[];
    hitpoints: Hitpoint[];
    movement: Movement[];
    immunities: string[];
    resistances: Resistance[];
    languages: string[];
    senses: string[];
    proficiencies: Proficiency[];
}