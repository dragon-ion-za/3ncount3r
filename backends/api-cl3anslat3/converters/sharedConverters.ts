import { ComplexLegendaryGroupItem } from "../entities/legendary-group.entity";
import { Ac, ComplexSpeed, Speed, ComplexResist, ComplexImmunity, Trait, Spellcasting, Save, ComplexTrait } from "../entities/sharedEntities";
import { CreatureSizes, ArmourClassModel, SkillModifierModel, ResistanceModel, CreatureTraitModel, SpellcastingModel, KnownSpellsModel, SpellTypes, SpecialActionModel, ActionGroupModel } from "../models/sharedModels";

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

export function convertToArmourClassModel(entityAc: Ac[] | number[]): ArmourClassModel {    
    if (typeof entityAc[0] === "number") {
        let acNumbers: number[] = entityAc as number[];
        return new ArmourClassModel(acNumbers[0], '');
    } else {        
        let acArray: Ac[] = entityAc as Ac[];
        let acModel = new ArmourClassModel(acArray[0].ac, acArray[0].from?.[0] ?? '');
        acArray.slice(1).forEach(acEntity => {
            acModel.alternateForms.push(new ArmourClassModel(acEntity.ac, acEntity.from?.[0] ?? '', acEntity.condition));
        })
        return acModel;
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

export function buildSkillModifiers(entitySkill: any): SkillModifierModel[] {
    if (!entitySkill) return [];

    let skillMods: SkillModifierModel[] = [];

    Object.keys(entitySkill).forEach((key, index) => {        
        skillMods.push(new SkillModifierModel(key, entitySkill[index] as number));
    });

    return skillMods;
}

export function buildResistances(entityResist: any): ResistanceModel[] {
    if (!entityResist) return [];

    let resistances: ResistanceModel[] = [];

    Object.keys(entityResist).forEach((key, index) => {
        if (typeof entityResist[index] === 'string') {
            resistances.push(new ResistanceModel(entityResist[index] as string, ''));
        } else {
            let complexEntityResist: ComplexResist = entityResist[index] as ComplexResist;

            if (complexEntityResist.special) {
                resistances.push(new ResistanceModel(complexEntityResist.special, 'special'));
            } else {
                complexEntityResist.resist.forEach(x => resistances.push(new ResistanceModel(x, complexEntityResist.note)));
            }
        }
        
    });

    return resistances;
}

export function buildImmunities(entityImmune: any, entityConditionImmune: any): ResistanceModel[] {
    let immunities: ResistanceModel[] = [];
    
    if (entityImmune) {
        Object.keys(entityImmune ?? []).forEach((key, index) => {
            if (typeof entityImmune[index] === 'string') {
                immunities.push(new ResistanceModel(entityImmune[index] as string, ''));
            } else {
                let complexEntityResist: ComplexImmunity = entityImmune[index] as ComplexImmunity;
    
                if (complexEntityResist.special) {
                    immunities.push(new ResistanceModel(complexEntityResist.special, 'special'));
                } else {
                    complexEntityResist.immune.forEach(x => immunities.push(new ResistanceModel(x, complexEntityResist.note)));
                }
            }
            
        });
    }

    if (entityConditionImmune) {
        Object.keys(entityConditionImmune ?? []).forEach((key, index) => {
            if (typeof entityConditionImmune[index] === 'string') {
                immunities.push(new ResistanceModel(entityConditionImmune[index] as string, ''));
            } else {
                let complexEntityResist: ComplexImmunity = entityConditionImmune[index] as ComplexImmunity;
    
                if (complexEntityResist.special) {
                    immunities.push(new ResistanceModel(complexEntityResist.special, 'special'));
                } else {
                    complexEntityResist.immune.forEach(x => immunities.push(new ResistanceModel(x, complexEntityResist.note)));
                }
            }
            
        });
    }

    return immunities;
}

export function buildTraits(entityTraits: Trait[]) : CreatureTraitModel[] {
    let traits: CreatureTraitModel[] = [];

    entityTraits?.forEach(x => { 
        let trait: CreatureTraitModel = new CreatureTraitModel(x.name, []);

        Object.keys(x.entries ?? []).forEach((key, index) => {    
            if (typeof x.entries[index] === 'string') {
                trait.entries.push(x.entries[index] as string);
            } else {
                let castTrait = x.entries[index] as ComplexTrait;

                Object.keys(castTrait.items ?? []).forEach((innerKey, innerIndex) => {
                    if (typeof castTrait.items[innerIndex] === 'string') {
                        trait.entries.push(castTrait.items[innerIndex] as string);
                    } else {
                        let castTraitItem = castTrait.items[innerIndex] as ComplexTrait;
                        trait.entries.push(`${castTraitItem.name}: ${castTraitItem.entry}`);
                    }
                });
            }
        });

        traits.push(trait); 
    });

    return traits;
}

export function buildSpellcasting(entitySpellcasting: Spellcasting[]) : SpellcastingModel[] {
    let spells: SpellcastingModel[] = [];

    entitySpellcasting?.forEach((spellcasting: Spellcasting) => {
        let model: SpellcastingModel = new SpellcastingModel();
        model.name = spellcasting.name;
        model.entries = spellcasting.headerEntries.concat(spellcasting.footerEntries);
        model.ability = spellcasting.ability;

        if (spellcasting.will && spellcasting.will.length > 0) {
            spellcasting.will.forEach(x => model.atWill.push(x));
        }

        if (spellcasting.daily !== undefined) {
            for (const key in spellcasting.daily){
                let limitedSpells: KnownSpellsModel = new KnownSpellsModel();

                let matches = key.matchAll(/(\n?)(\w?)/g);
                let resourceLimit: string = '';
                let resourceLimitType: string = '';

                for (const match of matches) {
                    if (match.index === 0) {
                        resourceLimit = match[0];
                    }
                    if (match.index === 1) {
                        resourceLimitType = match[0];
                    }
                }

                switch (resourceLimitType) {
                    case '': limitedSpells.type = SpellTypes.Daily; break;
                    case 'e': limitedSpells.type = SpellTypes.Each; break;
                    default: limitedSpells.type = SpellTypes.Unknown;
                }

                limitedSpells.resource = resourceLimit;
                spellcasting.daily[key].forEach(x => limitedSpells.spells.push(x));
                model.withResources.push(limitedSpells);
            }
        }

        if (spellcasting.spells !== undefined) {
            for (const key in spellcasting.spells){
                let limitedSpells: KnownSpellsModel = new KnownSpellsModel();
                limitedSpells.type = SpellTypes.Slot;
                limitedSpells.resource = (spellcasting.spells[key].slots ?? 0).toString();
                limitedSpells.level = key;
                spellcasting.spells[key].spells.forEach(x => limitedSpells.spells.push(x));
                model.withResources.push(limitedSpells);
            }
        }

        spells.push(model);
    });
    return spells;
}

export function buildLairActions(lairActions: (string | ComplexLegendaryGroupItem)[]) : SpecialActionModel[] {
    let specialActions: SpecialActionModel[] = [];

    Object.keys(lairActions ?? []).forEach((key, index) => {
        let specialAction: SpecialActionModel = new SpecialActionModel();

        if (typeof lairActions[index] === 'string') {            
            specialAction.type = 'entry';
            specialAction.items = [lairActions[index] as string];
            specialActions.push(specialAction);
        } else {
            let castLairActions = lairActions[index] as ComplexLegendaryGroupItem;

            if (castLairActions.type === 'list') {
                specialAction.type = 'list';

                Object.keys(castLairActions.items ?? []).forEach((actionKey, actionIndex) => {
                    if (typeof castLairActions.items[actionIndex] === 'string') {
                        specialAction.items.push(castLairActions.items[actionIndex])
                    } else {
                        let innerLairAction = castLairActions.items[actionIndex] as ComplexLegendaryGroupItem;
                        specialAction.type = 'list';
                        specialAction.items.push(`${innerLairAction.name}: ${innerLairAction.entry}`);
                    }
                });
                specialActions.push(specialAction);
            } else if (castLairActions.type === 'entries') {
                let innerSpecialActions = buildLairActions(castLairActions.entries);
                innerSpecialActions.forEach(x => { 
                    if (x.type === 'entry') x.type = 'additional';
                    specialActions.push(x); 
                });
            }
        }
    });
    
    return specialActions;
}

export function builsSavingThrows(saves: Save | null): SkillModifierModel[] {
    let model: SkillModifierModel[] = [];

    if (saves) {
        if (saves.str) model.push(new SkillModifierModel("str", parseInt(saves.str)));
        if (saves.dex) model.push(new SkillModifierModel("dex", parseInt(saves.dex)));
        if (saves.con) model.push(new SkillModifierModel("con", parseInt(saves.con)));
        if (saves.int) model.push(new SkillModifierModel("int", parseInt(saves.int)));
        if (saves.wis) model.push(new SkillModifierModel("wis", parseInt(saves.wis)));
        if (saves.cha) model.push(new SkillModifierModel("cha", parseInt(saves.cha)));
    }

    return model;
}

export function buildActionGroupActionsFromTraits(groupName: string, actions: Trait[]): ActionGroupModel {
    let model: ActionGroupModel = new ActionGroupModel();
    model.name = groupName;

    actions.forEach(action => { 
        let actionItems: (string | SpecialActionModel)[] = [];

        Object.keys(action.entries ?? []).forEach((key, index) => {
            if (typeof action.entries[index] === 'string') {            
                actionItems.push(action.entries[index] as string);
            } else {
                let castTrait = action.entries[index] as ComplexTrait;
                let complexAction: SpecialActionModel = new SpecialActionModel();
                complexAction.type = castTrait.type;

                Object.keys(castTrait.items ?? []).forEach((innerKey, innerIndex) => {
                    if (typeof castTrait.items[innerIndex] === 'string') {
                        complexAction.type = 'entry';
                        complexAction.items.push(castTrait.items[innerIndex] as string);
                    } else {
                        let castInnerTrait = castTrait.items[innerIndex] as ComplexTrait;
                        

                        if (castInnerTrait.type === 'item') {
                            let entries: string[] = [];
                            entries.push(castInnerTrait.entry);

                            complexAction.items.push({
                                type: 'list-entry',
                                name: castInnerTrait.name,
                                items: entries
                            });
                        }
                    }
                });

                actionItems.push(complexAction);
            }
        });

        model.items.push({
            type: 'entry',
            name: action.name,
            items: actionItems
        });
    });

    return model;
}

export function buildActionGroupActionsFromSpellcasting(groupName: string, spellcasting: Spellcasting): ActionGroupModel {
    let model: ActionGroupModel = new ActionGroupModel();
    model.name = groupName;

    model.items.push({name: 'Spellcasting Ability', type: 'ability', items: [spellcasting.ability]})
    model.items.push({name: '', type: 'entry', items: spellcasting.headerEntries.concat(spellcasting.footerEntries ?? [])});

    let spellsModel: SpecialActionModel = new SpecialActionModel();
    spellsModel.type = 'list';

    if (spellcasting.will && spellcasting.will.length > 0) {
        spellsModel.items.push({name: 'At Will', type: 'list-item-inline', items: spellcasting.will});
    }

    if (spellcasting.daily !== undefined) {
        for (const key in spellcasting.daily){
            let limitedModel: SpecialActionModel = new SpecialActionModel();
            limitedModel.type = 'list-item-inline';

            let matches = key.matchAll(/(\n?)(\w?)/g);
            let resourceLimit: string = '';
            let resourceLimitType: string = '';

            for (const match of matches) {
                if (match.index === 0) {
                    resourceLimit = match[0];
                }
                if (match.index === 1) {
                    resourceLimitType = match[0];
                }
            }
            
            limitedModel.name = `Daily (${resourceLimit}${resourceLimitType === 'e' ? ' each' : ''})`;
            spellcasting.daily[key].forEach(x => limitedModel.items.push(x));
            
            spellsModel.items.push(limitedModel);
        }
    }

    if (spellcasting.spells !== undefined) {
        for (const key in spellcasting.spells){
            let knownModel: SpecialActionModel = new SpecialActionModel();
            knownModel.type = 'list-item-inline';
            knownModel.name = key === '0' ? 'Cantrips' : `Level ${key} (${(spellcasting.spells[key].slots ?? 0)})`;
            spellcasting.spells[key].spells.forEach(x => knownModel.items.push(x));
            
            spellsModel.items.push(knownModel);
        }
    }

    model.items.push(spellsModel);

    return model;
}

export function buildActionGroupActionsFromLegendaryGroupActions(groupName: string, legendaryActions: (string | ComplexLegendaryGroupItem)[]) : ActionGroupModel {
    let model: ActionGroupModel = new ActionGroupModel();
    model.name = groupName;

    Object.keys(legendaryActions ?? []).forEach((key, index) => {
        model.items.push(...buildActionsFromLegendaryGroupAction(legendaryActions[index]));
    });

    return model;
}

export function buildActionsFromLegendaryGroupAction(legendaryAction: (string | ComplexLegendaryGroupItem)): SpecialActionModel[] {
    let specialActions: SpecialActionModel[] = [];

    let specialAction: SpecialActionModel = new SpecialActionModel();
    if (typeof legendaryAction === 'string') {            
        specialAction.type = 'entry';
        specialAction.items = [legendaryAction as string];
        specialActions.push(specialAction);
    } else {
        let castLairActions = legendaryAction as ComplexLegendaryGroupItem;

        if (castLairActions.type === 'list') {
            specialAction.type = 'list';

            Object.keys(castLairActions.items ?? []).forEach((actionKey, actionIndex) => {
                if (typeof castLairActions.items[actionIndex] === 'string') {
                    specialAction.items.push(castLairActions.items[actionIndex])
                } else {
                    let innerLairAction = castLairActions.items[actionIndex] as ComplexLegendaryGroupItem;
                    specialAction.items.push({
                        name: innerLairAction.name,
                        type: 'list-entry',
                        items: [innerLairAction.entry]
                    });
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