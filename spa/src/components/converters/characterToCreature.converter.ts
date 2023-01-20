import { CharacterViewModel, ClassViewModel } from "../../view-models/character.view-model";
import { EncounterCreatureViewModel } from "../../view-models/encounter-creature.view-model";
import { ItemPropertyTypes, ItemTypes, ItemViewModel } from "../../view-models/item.view-model";
import { ArmourClassViewModel } from "../../view-models/shared.view-model";

const buildArmourClass = (equipment: ItemViewModel[]) : ArmourClassViewModel => {
    let model: ArmourClassViewModel = new ArmourClassViewModel();

    let armour: ItemViewModel = equipment.filter(x => x.type === ItemTypes.Armour)[0];

    if (armour) {
        model.armourClass = parseInt(armour.properties.filter(x => x.type === ItemPropertyTypes.Armour)[0].value);
    }

    return model;
}

const parseClasses = (classes: ClassViewModel[]): string => {
    let classString: string[] = [];

    classes.forEach(x => classString.push(`${x.name} Level ${x.level}`));

    return classString.join(' ');
}

export const convertCharactToEncounterCreatureViewModel = (model: CharacterViewModel): EncounterCreatureViewModel => {
    let creature: EncounterCreatureViewModel = new EncounterCreatureViewModel();

    creature.isPlayerCharacter = true;
    creature.id = model.id;
    creature.type = `${model.race} ${parseClasses(model.classes)}`;
    creature.name = model.name;
    creature.walkingSpeed = model.walkingSpeed;
    creature.armourClass = buildArmourClass(model.equipment);
    creature.hitpointMax = creature.currentHitpoints = model.hitpointMaximum;
    creature.traits = model.traits;
    creature.actions = model.actions;
    creature.reactions = model.reactions;
    creature.spellcasting = model.spellcasting;
    creature.attributeCha = model.attributeCha;
    creature.attributeCon = model.attributeCon;
    creature.attributeDex = model.attributeDex;
    creature.attributeInt = model.attributeInt;
    creature.attributeStr = model.attributeStr;
    creature.attributeWis = model.attributeWis;

    return creature;
}