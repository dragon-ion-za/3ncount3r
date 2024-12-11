import { CreatureEntity } from "../entities/creature.entity";
import { ComplexLegendaryGroupItem, LegendaryGroupEntity } from "../entities/legendary-group.entity";
import { CreatureModel } from "../models/creature.model";
import { ActionGroupLegendaryGroupItemModel } from "../models/sharedModels";
import { buildActionGroupActionsFromLegendaryGroupActions } from "./sharedConverters";

export function creatureEntityToModelConverter(host: string, entity: CreatureEntity, legendaryGroups: LegendaryGroupEntity[]): CreatureModel {
    let model: CreatureModel = {...entity, imageUrl: `${host}/creatures/image/${entity.source}/${entity.name}`};

    if (entity.actionGroups.some(x => x.type === 'lair_region_mythic')) {
        let legendaryGroupDetails = entity.actionGroups.find(x => x.type === 'lair_region_mythic');

        legendaryGroupDetails?.items?.forEach(x => {
            let legendaryGroup = legendaryGroups.filter(y => y.name === (x as ActionGroupLegendaryGroupItemModel).id)[0];
            if (legendaryGroup !== null) {
                addOrUpdateActionGroup(model, 'Lair Actions', legendaryGroup.lairActions);
                addOrUpdateActionGroup(model, 'Regional Effects', legendaryGroup.regionalEffects);
                addOrUpdateActionGroup(model, 'Mythic Encounter', legendaryGroup.mythicEncounter);
            }
        });

        // Remove the legendary group indicator record as we've now enriched the object with the related action groups
        entity.actionGroups.splice(entity.actionGroups.findIndex(x => x.type === 'lair_region_mythic'), 1);
    }

    return model;
};

function addOrUpdateActionGroup(model: CreatureModel, actionGroupType: string, legendaryGroup: (string | ComplexLegendaryGroupItem)[]) {
    let lairActions = buildActionGroupActionsFromLegendaryGroupActions(actionGroupType, legendaryGroup);
    console.log(lairActions);
    if (model.actionGroups.some(x => x.type === actionGroupType)) {
        model.actionGroups.find(x => x.type === actionGroupType)?.items.push(...lairActions.items);
    } else {
        model.actionGroups.push(lairActions);
    }
}