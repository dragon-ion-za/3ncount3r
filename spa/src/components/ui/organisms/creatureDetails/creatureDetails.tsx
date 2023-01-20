import React, { ReactElement, useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Box, Container, Divider, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import Grid from '@mui/material/Unstable_Grid2';

import { getCreatureToken} from "../../../services/creature.service";
import { useEncounterContext } from '../../../contexts/encounter.context-provider';
import { DamageConditionType } from "../../molecules/damageConditionType/damageConditionType";
import { SpellcastingDetails } from "../../molecules/spellcastingDetails/spellcastingDetails";
import { TraitDetails } from "../../molecules/traitDetails/traitDetails";
import { ActionDetails } from "../../molecules/actionDetails/actionDetails";
import { LegendaryActionDetails } from "../../molecules/legendaryActionDetails/legendaryActionDetails";
import { SpecialActionDetails } from "../../molecules/specialActionDetails/specialActionDetails";

import { ResistanceViewModel } from "../../../../view-models/shared.view-model";

import { actionBox } from "./creatureDetails.styles";

export const CreatureDetails : React.FC = () => { 

    const encounterContext = useEncounterContext();
    const [actionsList, setActionsList] = useState<Record<string, ReactElement>>({});

    useEffect(() => {
        if (encounterContext.selectedCreature) {

            let actions : Record<string, ReactElement> = {};

            actions.traits = <TraitDetails traits={encounterContext.selectedCreature.traits} />;

            if (encounterContext.selectedCreature.spellcasting.some(x => {return x.name === 'Innate Spellcasting'}))
                actions.innatespellcasting = <SpellcastingDetails spellcasting={encounterContext.selectedCreature.spellcasting.filter(x => {return x.name === 'Innate Spellcasting'})[0]} />;

            if (encounterContext.selectedCreature.spellcasting.some(x => {return x.name === 'Spellcasting'}))
                actions.spellcasting = <SpellcastingDetails spellcasting={encounterContext.selectedCreature.spellcasting.filter(x => {return x.name === 'Spellcasting'})[0]} />;

            actions.actions = <ActionDetails actions={encounterContext.selectedCreature.actions} title='Actions' />;

            if (encounterContext.selectedCreature.reactions && encounterContext.selectedCreature.reactions.length > 0)
                actions.reactions = <ActionDetails actions={encounterContext.selectedCreature.reactions} title='Reactions' />;

            if (encounterContext.selectedCreature.legendaryActions && encounterContext.selectedCreature.legendaryActions.length > 0)
                actions.legendary = <LegendaryActionDetails legendaryActions={encounterContext.selectedCreature.legendaryActions} actionCount={encounterContext.selectedCreature.legendaryCount} />;

            if (encounterContext.selectedCreature.lairActions && encounterContext.selectedCreature.lairActions.length > 0)
                actions.lair = <SpecialActionDetails specialActions={encounterContext.selectedCreature.lairActions} title='Lair Actions' />;

            if (encounterContext.selectedCreature.regionalEffects && encounterContext.selectedCreature.regionalEffects.length > 0)
                actions.regional = <SpecialActionDetails specialActions={encounterContext.selectedCreature.regionalEffects} title='Regional Effects' />;

            if (encounterContext.selectedCreature.mythicEncounter && encounterContext.selectedCreature.mythicEncounter.length > 0)
                actions.mythic = <SpecialActionDetails specialActions={encounterContext.selectedCreature.mythicEncounter} title='Mythic Encounter' />;

            setActionsList(actions);
        }
    }, [encounterContext.selectedCreature])

    return (
        <>
            {encounterContext.selectedCreature &&
            (
                <Grid container direction='row' sx={{height: '100%'}}>
                    <Grid xs={2}>
                        <Avatar 
                            src={getCreatureToken(encounterContext.selectedCreature.sourceId, 
                                                encounterContext.selectedCreature.isPlayerCharacter ? encounterContext.selectedCreature.id : encounterContext.selectedCreature.name, 
                                                encounterContext.selectedCreature.isPlayerCharacter)} 
                            sx={{width: 128, height: 128, margin: 'auto', top: 'calc(50% - 64px)'}} />
                    </Grid>
                    <Grid xs={5}>
                        <Stack>
                            <Typography variant="h1">{encounterContext.selectedCreature.name}</Typography>

                            {encounterContext.selectedCreature.resistances.length > 0 && 
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

                            {encounterContext.selectedCreature.immunities.length > 0 && 
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

                            <Divider />

                        </Stack>
                    </Grid>
                    <Grid xs={5}>
                        {Object.entries(actionsList).map(([k,v]) => 
                        (
                            v
                        ))}                        
                    </Grid>
                </Grid>
            )}
        </>
    );
};