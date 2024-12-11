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
    items: ActionGroupBaseItemModel[] = [];
}

export abstract class ActionGroupBaseItemModel
{
    type: string = this.getType();
    abstract getType(): string;
}

export class ActionGroupEntryItemModel extends ActionGroupBaseItemModel {
    name: string = '';
    entries: string[] = [];

    getType(): string {
        return 'entry';
    }
}

export class ActionGroupListItemModel extends ActionGroupBaseItemModel {
    name: string = '';
    headerEntries: string[] = [];
    entries: ActionGroupEntryItemModel[] = [];

    getType(): string {
        return 'list';
    }
}

export class ActionGroupLegendaryGroupItemModel extends ActionGroupBaseItemModel {
    id: string = '';
    source: string = '';

    getType(): string {
        return 'legendaryGroupActions';
    }
}

export class ActionGroupSpellcastingItemModel extends ActionGroupBaseItemModel {
    ability: string = '';
    headerEntries: string[] = [];
    spells: SpellItemModel[] = [];

    getType(): string {
        return 'spellList';
    }
}

export class SpellItemModel {
    resource: string = '';
    uses: number = 0;
    list: string[] = [];
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