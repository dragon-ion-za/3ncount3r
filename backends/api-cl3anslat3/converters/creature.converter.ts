import { CreatureEntity } from "../entities/creature.entity";
import { ComplexLegendaryGroupItem, LegendaryGroupEntity } from "../entities/legendary-group.entity";
import { CreatureModel } from "../models/creature.model";
import { buildActionGroupActionsFromLegendaryGroupActions } from "./sharedConverters";

export function creatureEntityToModelConverter(host: string, entity: CreatureEntity, legendaryGroups: LegendaryGroupEntity[]): CreatureModel {
    let model: CreatureModel = {...entity, imageUrl: `${host}/creatures/image/${entity.source}/${entity.name}`};

    if (model.actionGroups.some(x => x.type === 'lair_region_mythic')) {
        let legendaryGroupDetails = model.actionGroups.find(x => x.type === 'lair_region_mythic');

        legendaryGroupDetails?.items?.forEach(x => {
            let legendaryGroup = legendaryGroups.find(y => y.name === x.name);
            if (legendaryGroup !== undefined) {
                addOrUpdateActionGroup(model, 'Lair Actions', legendaryGroup.lairActions);
                addOrUpdateActionGroup(model, 'Regional Effects', legendaryGroup.regionalEffects);
                addOrUpdateActionGroup(model, 'Mythic Encounter', legendaryGroup.mythicEncounter);
            }
        });

        // Remove the legendary group indicator record as we've now enriched the object with the related action groups
        model.actionGroups.splice(model.actionGroups.findIndex(x => x.type === 'lair_region_mythic'), 1);
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