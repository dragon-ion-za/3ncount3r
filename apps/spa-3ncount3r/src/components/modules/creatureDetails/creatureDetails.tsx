import React, { useState, useEffect } from "react";
import { Avatar, Container, Divider, Stack, Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';

import { useEncounterContext } from '../../../providers/encounterContext/encounter.context-provider';
import { DamageConditionType } from "../../elements/damage-condition-type/damage-condition-type";
import { ActionDetails } from "../../elements/action-details/action-details";

import { KeyValuePair, ResistanceViewModel } from "../../../view-models/shared.view-model";
import { AttributeDetails } from "../../elements/attribute-details/attribute-details";
import { EncounterCreatureViewModel } from "apps/spa-3ncount3r/src/view-models/encounter-creature.view-model";

export const CreatureDetails : React.FC = () => {
    const encounterContext = useEncounterContext();
    const [attributeList, setAttributeList] = useState<KeyValuePair<string,number>[]>([]);
    const [model, setModel] = useState<EncounterCreatureViewModel>(encounterContext.getSelectedCreature());

    useEffect(() => {        
        setModel(encounterContext.getSelectedCreature());
        if (model !== null) {
            let attr: KeyValuePair<string,number>[] = [];
            attr.push({ key: 'STR', value: model.attributeStr ?? 0 })
            attr.push({ key: 'DEX', value: model.attributeDex ?? 0 })
            attr.push({ key: 'CON', value: model.attributeCon ?? 0 })
            attr.push({ key: 'INT', value: model.attributeInt ?? 0 })
            attr.push({ key: 'WIS', value: model.attributeWis ?? 0 })
            attr.push({ key: 'CHA', value: model.attributeCha ?? 0 })
            setAttributeList(attr);
        }
    }, [encounterContext.getSelectedCreature])

    return (
        <>
            {model &&
            (
                <Grid container direction='row' sx={{height: '100%'}}>
                    <Grid xs={2}>
                        <Avatar 
                            src={model.imageUrl} 
                            sx={{width: 128, height: 128, margin: 'auto', top: 'calc(50% - 64px)'}} />
                    </Grid>
                    <Grid xs={5}>
                        <Stack>
                            <Typography variant="h1">{model.name}</Typography>
                            
                            <Divider />

                            <AttributeDetails attributeList={attributeList} />

                            <Divider />

                            <Typography variant="body1">
                                <strong>Passive Perception:</strong> {model.passivePerception}
                            </Typography>

                            {model.languages?.length > 0 &&
                            (
                                <Typography variant="body1">
                                    <strong>Languages:</strong> {model.languages.join(', ')}
                                </Typography>
                            )}

                            {model.senses?.length > 0 &&
                            (
                                <Typography variant="body1">
                                    <strong>Senses:</strong> {model.senses.join(', ')}
                                </Typography>
                            )}

                            {model.savingThrows?.length > 0 &&
                            (
                                <Typography variant="body1">
                                    <strong>Saving Throws:</strong> {model.savingThrows
                                                                        .map(x => `${x.skillName} ${x.modifier > 0 ? '+' : ''}${x.modifier}`)
                                                                        .join(', ')}
                                </Typography>
                            )}

                            <Typography variant="body1">
                                <strong>Challenge Rating:</strong> {model.challengeRating?.rating ?? 0} ({model.challengeRating?.experience ?? 0} XP)
                            </Typography>

                            <Divider />

                            {model.resistances?.length > 0 && 
                            (
                                <>
                                    <Typography variant="h3">Resistances</Typography>
                                    <Container>
                                        {model.resistances.map((resistance: ResistanceViewModel) => 
                                            (<DamageConditionType key={`res_${resistance.resistantTo}`} type={resistance.resistantTo} condition={resistance.condition} />)
                                        )}
                                    </Container>
                                </>
                                
                            )}

                            {model.immunities?.length > 0 && 
                            (
                                <>
                                    <Typography variant="h3">Immunities</Typography>
                                    <Container>
                                        {model.immunities.map((immunity: ResistanceViewModel) => 
                                            (<DamageConditionType key={`imm_${immunity.resistantTo}`} type={immunity.resistantTo} condition={immunity.condition} />)
                                        )}
                                    </Container>
                                </>
                                
                            )}

                        </Stack>
                    </Grid>
                    <Grid xs={5}>
                        <ActionDetails actionGroups={model.actionGroups} />
                    </Grid>
                </Grid>
            )}
        </>
    );
};