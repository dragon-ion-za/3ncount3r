import React, { useState, useEffect } from "react";
import { Avatar, Container, Divider, Stack, Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';

import { getCreatureToken} from "../../../services/creature.service";
import { useEncounterContext } from '../../../contexts/encounter.context-provider';
import { DamageConditionType } from "../../molecules/damageConditionType/damageConditionType";
import { ActionDetails } from "../../molecules/actionDetails/actionDetails";

import { KeyValuePair, ResistanceViewModel } from "../../../../view-models/shared.view-model";
import { AttributeDetails } from "../../molecules/attributeDetails/attributeDetails";

export const CreatureDetails : React.FC = () => { 

    const encounterContext = useEncounterContext();
    const [attributeList, setAttributeList] = useState<KeyValuePair<string,number>[]>([]);

    useEffect(() => {        
        let attr: KeyValuePair<string,number>[] = [];
        attr.push({ key: 'STR', value: encounterContext.selectedCreature?.attributeStr ?? 0 })
        attr.push({ key: 'DEX', value: encounterContext.selectedCreature?.attributeDex ?? 0 })
        attr.push({ key: 'CON', value: encounterContext.selectedCreature?.attributeCon ?? 0 })
        attr.push({ key: 'INT', value: encounterContext.selectedCreature?.attributeInt ?? 0 })
        attr.push({ key: 'WIS', value: encounterContext.selectedCreature?.attributeWis ?? 0 })
        attr.push({ key: 'CHA', value: encounterContext.selectedCreature?.attributeCha ?? 0 })
        setAttributeList(attr);

    }, [encounterContext.selectedCreature])

    return (
        <>
            {encounterContext.selectedCreature &&
            (
                <Grid container direction='row' sx={{height: '100%'}}>
                    <Grid xs={2}>
                        <Avatar 
                            src={encounterContext.selectedCreature.imageUrl} 
                            sx={{width: 128, height: 128, margin: 'auto', top: 'calc(50% - 64px)'}} />
                    </Grid>
                    <Grid xs={5}>
                        <Stack>
                            <Typography variant="h1">{encounterContext.selectedCreature.name}</Typography>
                            
                            <Divider />

                            <AttributeDetails attributeList={attributeList} />

                            <Divider />

                            <Typography variant="body1">
                                <strong>Passive Perception:</strong> {encounterContext.selectedCreature.passivePerception}
                            </Typography>

                            {encounterContext.selectedCreature.languages?.length > 0 &&
                            (
                                <Typography variant="body1">
                                    <strong>Languages:</strong> {encounterContext.selectedCreature.languages.join(', ')}
                                </Typography>
                            )}

                            {encounterContext.selectedCreature.senses?.length > 0 &&
                            (
                                <Typography variant="body1">
                                    <strong>Senses:</strong> {encounterContext.selectedCreature.senses.join(', ')}
                                </Typography>
                            )}

                            {encounterContext.selectedCreature.savingThrows?.length > 0 &&
                            (
                                <Typography variant="body1">
                                    <strong>Saving Throws:</strong> {encounterContext.selectedCreature.savingThrows
                                                                        .map(x => `${x.skillName} ${x.modifier > 0 ? '+' : ''}${x.modifier}`)
                                                                        .join(', ')}
                                </Typography>
                            )}

                            <Divider />

                            {encounterContext.selectedCreature.resistances?.length > 0 && 
                            (
                                <>
                                    <Typography variant="h3">Resistances</Typography>
                                    <Container>
                                        {encounterContext.selectedCreature.resistances.map((resistance: ResistanceViewModel) => 
                                            (<DamageConditionType key={`res_${resistance.resistantTo}`} type={resistance.resistantTo} condition={resistance.condition} />)
                                        )}
                                    </Container>
                                </>
                                
                            )}

                            {encounterContext.selectedCreature.immunities?.length > 0 && 
                            (
                                <>
                                    <Typography variant="h3">Immunities</Typography>
                                    <Container>
                                        {encounterContext.selectedCreature.immunities.map((immunity: ResistanceViewModel) => 
                                            (<DamageConditionType key={`imm_${immunity.resistantTo}`} type={immunity.resistantTo} condition={immunity.condition} />)
                                        )}
                                    </Container>
                                </>
                                
                            )}

                        </Stack>
                    </Grid>
                    <Grid xs={5}>
                        <ActionDetails actionGroups={encounterContext.selectedCreature.actionGroups} />
                    </Grid>
                </Grid>
            )}
        </>
    );
};