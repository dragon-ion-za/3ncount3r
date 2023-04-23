import { CharacterViewModel, ClassViewModel } from "../../view-models/character.view-model";
import { EncounterCreatureViewModel } from "../../view-models/encounter-creature.view-model";
import { ItemPropertyTypes, ItemTypes, ItemViewModel } from "../../view-models/item.view-model";
import { ArmourClassViewModel, SkillModifierViewModel } from "../../view-models/shared.view-model";
import { calculateAbilityScoreModifier } from "../services/creature.service";

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

const buildSavingThrows = (model: CharacterViewModel): SkillModifierViewModel[] => {
    let savingThrows: SkillModifierViewModel[] = [];

    model.savingThrowProficiencies?.forEach(x => {
        let modifier: SkillModifierViewModel = new SkillModifierViewModel();
        modifier.skillName = x;

        switch (x) {
            case 'str': modifier.modifier = calculateAbilityScoreModifier(model.attributeStr); break;
            case 'dex': modifier.modifier = calculateAbilityScoreModifier(model.attributeDex); break;
            case 'con': modifier.modifier = calculateAbilityScoreModifier(model.attributeCon); break;
            case 'wis': modifier.modifier = calculateAbilityScoreModifier(model.attributeWis); break;
            case 'int': modifier.modifier = calculateAbilityScoreModifier(model.attributeInt); break;
            case 'cha': modifier.modifier = calculateAbilityScoreModifier(model.attributeCha); break;
        }

        modifier.modifier += model.proficiencyBonus;
        savingThrows.push(modifier);
    });

    return savingThrows;
}

export const convertCharacterToEncounterCreatureViewModel = (model: CharacterViewModel): EncounterCreatureViewModel => {
    let creature: EncounterCreatureViewModel = new EncounterCreatureViewModel();

    creature.isPlayerCharacter = true;
    creature.id = model.id;
    creature.type = `${model.race} ${parseClasses(model.classes)}`;
    creature.name = model.name;
    creature.walkingSpeed = model.walkingSpeed;
    creature.armourClass = buildArmourClass(model.equipment);
    creature.hitpointMax = creature.currentHitpoints = model.hitpointMaximum;
    creature.actionGroups = model.actionGroups;
    creature.attributeCha = model.attributeCha;
    creature.attributeCon = model.attributeCon;
    creature.attributeDex = model.attributeDex;
    creature.attributeInt = model.attributeInt;
    creature.attributeStr = model.attributeStr;
    creature.attributeWis = model.attributeWis;
    creature.passivePerception = model.passivePerception;
    creature.languages = model.languages;
    creature.senses = model.senses;
    creature.savingThrows = buildSavingThrows(model);

    return creature;
}