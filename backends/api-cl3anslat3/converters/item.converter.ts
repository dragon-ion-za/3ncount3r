import { ItemEntity } from "../entities/item.entity";
import { ItemModel, ItemPropertyModel, ItemPropertyTypes, ItemTypes } from "../models/item.model";

export function itemEntityToModelConverter(entity: ItemEntity): ItemModel {
    let model: ItemModel = new ItemModel(entity.name, buildItemType(entity));
    model.attunementRequirements = entity.reqAttune;
    model.properties = buildItemProperties(model.type, entity);

    return model;
}

function buildItemType(entity: ItemEntity): ItemTypes {

    if (entity.armor) return ItemTypes.Armour;

    if (entity.weapon) return ItemTypes.Weapon;

    return ItemTypes.Generic;
}


function buildItemProperties(type: ItemTypes, entity: ItemEntity) : ItemPropertyModel[] {
    let properties: ItemPropertyModel[] = [];

    switch(type) {
        case ItemTypes.Armour:
            properties.push(new ItemPropertyModel('ac', entity.ac.toString(), ItemPropertyTypes.Armour));
            if (entity.stealth){
                properties.push(new ItemPropertyModel('stealth', '', ItemPropertyTypes.Disadvantage));
            }
        break;

        case ItemTypes.Weapon:
            properties.push(new ItemPropertyModel(buildDamageType(entity.dmgType), entity.dmg1, ItemPropertyTypes.Damage));
            if (entity.dmg2) {
                properties.push(new ItemPropertyModel(buildDamageType(entity.dmgType), entity.dmg2, ItemPropertyTypes.DamageVersatile));
            }
        break;
    }

    return properties;
}

function buildDamageType(damageType: string): string {
    let type: string = '';

    switch (damageType.toLocaleLowerCase()) {
        case 'p': type = 'piercing'; break;
        case 'b': type = 'bludgeoning'; break;
        case 's': type = 'slashing'; break;
    }

    return type;
}