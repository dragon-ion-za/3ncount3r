import { CreatureEntity } from "../entities/creature.entity";
import { LegendaryGroupEntity } from "../entities/legendary-group.entity";
import { Spellcasting, Type } from "../entities/sharedEntities";
import { CreatureModel } from "../models/creature.model";
import { convertSizeToEnum, convertToArmourClassModel, convertToFlyingSpeed, buildSpeedConditions, buildSkillModifiers, 
    buildResistances, buildImmunities, buildLairActions, builsSavingThrows, buildActionGroupActionsFromTraits, 
    buildActionGroupActionsFromSpellcasting, 
    buildActionGroupActionsFromLegendaryGroupActions} from "./sharedConverters";

export function creatureEntityToModelConverter(host: string, entity: CreatureEntity, legendaryGroups: LegendaryGroupEntity[]): CreatureModel {
    let model: CreatureModel = new CreatureModel(entity.name);

    model.sourceId = entity.source;
    model.size = convertSizeToEnum(entity.size);
    model.type = (entity.type as Type)?.type ?? entity.type as string;
    model.alignment = entity.alignment;
    model.armourClass = convertToArmourClassModel(entity.ac);
    model.hitpointAverage = entity.hp.average;
    model.hitpointFormula = entity.hp.formula;
    model.hitpointSpecial = entity.hp.special;
    model.walkingSpeed = entity.speed.walk;
    model.climbingSpeed = entity.speed.climb;
    model.burrowingSpeed = entity.speed.burrow;
    model.swimmingSpeed = entity.speed.swim;
    model.flyingSpeed = convertToFlyingSpeed(entity.speed.fly);
    model.canHover = entity.speed.canHover;
    model.speedConditions = buildSpeedConditions(entity.speed);
    model.attributeCha = entity.cha;
    model.attributeCon = entity.con;
    model.attributeDex = entity.dex;
    model.attributeInt = entity.int;
    model.attributeStr = entity.str;
    model.attributeWis = entity.wis;
    model.skillModifiers = buildSkillModifiers(entity.skill);
    model.passivePerception = entity.passive;
    model.resistances = buildResistances(entity.resist);
    model.immunities = buildImmunities(entity.immune, entity.conditionImmune);
    model.languages = entity.languages ?? [];
    model.challengeRating = Number.parseInt(entity.cr);
    model.legendaryCount = entity.legendaryActions ?? 3;
    model.senses = entity.senses ?? [];
    model.savingThrows = builsSavingThrows(entity.save);

    model.actionGroups.push(buildActionGroupActionsFromTraits('Traits', entity.trait ?? []));
    model.actionGroups.push(buildActionGroupActionsFromTraits('Actions', entity.action ?? []));
    model.actionGroups.push(buildActionGroupActionsFromTraits('Reactions', entity.reaction ?? []));
    model.actionGroups.push(buildActionGroupActionsFromTraits('Legendary Actions', entity.legendary ?? []));

    if (entity.spellcasting && entity.spellcasting.length > 0) {
        let spellcasting: Spellcasting = entity.spellcasting.filter(x => x.name === 'Spellcasting')[0];
        if (spellcasting) model.actionGroups.push(buildActionGroupActionsFromSpellcasting('Spellcasting',spellcasting ));

        spellcasting = entity.spellcasting.filter(x => x.name === 'Innate Spellcasting')[0];
        if (spellcasting) model.actionGroups.push(buildActionGroupActionsFromSpellcasting('Innate Spellcasting', spellcasting));
    }
    
    
    if (entity.legendaryGroup) {
        let legendaryGroup = legendaryGroups.filter(x => x.name === entity.legendaryGroup!.name)[0];
        if (legendaryGroup !== null) {
            model.lairActions = buildLairActions(legendaryGroup.lairActions);
            model.regionalEffects = buildLairActions(legendaryGroup.regionalEffects);
            model.mythicEncounter = buildLairActions(legendaryGroup.mythicEncounter);

            model.actionGroups.push(buildActionGroupActionsFromLegendaryGroupActions('Lair Actions', legendaryGroup.lairActions));
            model.actionGroups.push(buildActionGroupActionsFromLegendaryGroupActions('Regional Effects', legendaryGroup.regionalEffects));
            model.actionGroups.push(buildActionGroupActionsFromLegendaryGroupActions('Mythic Encounter', legendaryGroup.mythicEncounter));
        }
    }

    model.imageUrl = `${host}/creatures/image/${model.sourceId}/${model.name}`;

    return model;
};