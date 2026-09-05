import { ComplexLegendaryGroupItem } from "../entities/legendary-group.entity";
import { Ac, ComplexSpeed, Speed } from "../entities/sharedEntities";
import { CreatureSizes, ActionGroupModel, ActionGroupEntryItemModel, ActionGroupItemModel } from "../models/sharedModels";

export function convertSizeToEnum(entitySize: string[]) : CreatureSizes {
    switch (entitySize[0].toLowerCase()) {
        case 't': return CreatureSizes.Tiny;
        case 's': return CreatureSizes.Small;
        case 'm': return CreatureSizes.Medium;
        case 'l': return CreatureSizes.Large;
        case 'h': return CreatureSizes.Huge;
        case 'g': return CreatureSizes.Gargantuan;
        default: return CreatureSizes.Unknown;
    }
}

export function convertToFlyingSpeed(entityFly: ComplexSpeed | number): number {
    if (!entityFly) return 0;

    if (typeof entityFly === "number") {
        return entityFly as number;
    } else {
        let fly = entityFly as ComplexSpeed;
        return fly.number;
    }
}

export function buildSpeedConditions(entitySpeed: Speed): string[] {
    let speedConditions: string[] = [];

    if (entitySpeed.fly && typeof entitySpeed.fly === "object") {
        let fly = entitySpeed.fly as ComplexSpeed;
        if (fly.condition !== '') {
            speedConditions.push(fly.condition);
        }
    }

    return speedConditions;
}

export function buildActionGroupActionsFromLegendaryGroupActions(groupName: string, legendaryActions: (string | ComplexLegendaryGroupItem)[]) : ActionGroupModel {
    let model: ActionGroupModel = new ActionGroupModel();
    model.type = groupName;

    Object.keys(legendaryActions ?? []).forEach((key, index) => {
        model.items.push(...buildActionsFromLegendaryGroupAction(legendaryActions[index]));
    });

    return model;
}

export function buildActionsFromLegendaryGroupAction(legendaryAction: (string | ComplexLegendaryGroupItem)): ActionGroupItemModel[] {
    let specialActions: ActionGroupItemModel[] = [];

    if (typeof legendaryAction === 'string') {
        specialActions.push({entries: [legendaryAction as string]} as ActionGroupItemModel);
    } else {
        let castLairActions = legendaryAction as ComplexLegendaryGroupItem;

        if (castLairActions.type === 'list') {
            let specialAction = new ActionGroupItemModel();

            Object.keys(castLairActions.items ?? []).forEach((actionKey, actionIndex) => {
                if (typeof castLairActions.items[actionIndex] === 'string') {
                    specialAction.entries.push(castLairActions.items[actionIndex] as string)
                } else {
                    let innerLairAction = castLairActions.items[actionIndex] as ComplexLegendaryGroupItem;
                    specialAction.items.push({
                        name: innerLairAction.name,
                        entries: [innerLairAction.entry]
                    } as ActionGroupEntryItemModel);
                }
            });

            specialActions.push(specialAction);
        } else if (castLairActions.type === 'entries') {
            castLairActions.entries.forEach(x => {
                specialActions.push(...buildActionsFromLegendaryGroupAction(x));
            });
        }
    }

    return specialActions;
}

export function getExperienceFromChallengeRating(challengeRating: number): number {
    switch(challengeRating) {
        case .125: return 25;
        case .25: return 50;
        case .50: return 100;
        case 1: return 200;
        case 2: return 450;
        case 3: return 700;
        case 4: return 1100;
        case 5: return 1800;
        case 6: return 2300;
        case 7: return 2900;
        case 8: return 3900;
        case 9: return 5000;
        case 10: return 5900;
        case 11: return 7200;
        case 12: return 8400;
        case 13: return 10000;
        case 14: return 11500;
        case 15: return 13000;
        case 16: return 15000;
        case 17: return 18000;
        case 18: return 20000;
        case 19: return 22000;
        case 20: return 25000;
        case 21: return 33000;
        case 22: return 41000;
        case 23: return 50000;
        case 24: return 62000;
        case 25: return 75000;
        case 26: return 90000;
        case 27: return 105000;
        case 28: return 120000;
        case 29: return 135000;
        case 30: return 155000;
        default: return 0;
    }
}