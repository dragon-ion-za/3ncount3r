export interface ItemEntity {
    name: string;
    rarity: string;
    weight: number;
    value: number;
    property: string[];
    weapon: boolean;
    armor: boolean;
    ac: number;
    dmg1: string;
    dmg2: string;
    dmgType: string;
    weaponCategory: string;
    stealth: boolean;
    range: string;
    entries: string[];
    charges: number;
    reqAttune: string;
}