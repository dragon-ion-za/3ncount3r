import React, { ReactElement, useState } from "react";
import { Avatar, Box, Container, Divider, Stack, Typography } from "@mui/material";
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
    const [activeDetailElement, setActiveDetailElement] = useState<ReactElement | null>();
    const [actionsList, setActionsList] = useState<Record<string, string>>({});

    useEffect(() => {
        if (encounterContext.selectedCreature) {

            let actions : Record<string, string> = {};

            actions.traits = 'Traits';

            if (encounterContext.selectedCreature.spellcasting.some(x => {return x.name === 'Innate Spellcasting'}))
                actions.innatespellcasting = 'Innate Spellcasting';

            if (encounterContext.selectedCreature.spellcasting.some(x => {return x.name === 'Spellcasting'}))
                actions.spellcasting = 'Spellcasting';

                actions.actions = 'Actions';

            if (encounterContext.selectedCreature.reactions && encounterContext.selectedCreature.reactions.length > 0)
                actions.reactions = 'Reactions';

            if (encounterContext.selectedCreature.legendaryActions && encounterContext.selectedCreature.legendaryActions.length > 0)
                actions.legendary = 'Legendary Actions';

            if (encounterContext.selectedCreature.lairActions && encounterContext.selectedCreature.lairActions.length > 0)
                actions.lair = 'Lair Actions';

            if (encounterContext.selectedCreature.regionalEffects && encounterContext.selectedCreature.regionalEffects.length > 0)
                actions.regional = 'Regional Effects';

            if (encounterContext.selectedCreature.mythicEncounter && encounterContext.selectedCreature.mythicEncounter.length > 0)
                actions.mythic = 'Mythical Encounter';

            setActionsList(actions);

            setActiveDetailElement(<TraitDetails traits={encounterContext.selectedCreature.traits} />);
        }
    }, [encounterContext.selectedCreature])

    const displayDetails = (type: string) => {
        if (!encounterContext.selectedCreature) return;

        switch (type){
            case 'traits': 
                setActiveDetailElement(<TraitDetails traits={encounterContext.selectedCreature.traits} />); 
                break;

            case 'innatespellcasting': 
                setActiveDetailElement(<SpellcastingDetails spellcasting={encounterContext.selectedCreature.spellcasting.filter(x => {return x.name === 'Innate Spellcasting'})[0]} />); 
                break;

            case 'spellcasting': 
                setActiveDetailElement(<SpellcastingDetails spellcasting={encounterContext.selectedCreature.spellcasting.filter(x => {return x.name === 'Spellcasting'})[0]} />); 
                break;

            case 'actions': 
                setActiveDetailElement(<ActionDetails actions={encounterContext.selectedCreature.actions} />); 
                break;

            case 'reactions': 
                setActiveDetailElement(<ActionDetails actions={encounterContext.selectedCreature.reactions} />); 
                break;

            case 'legendary': 
                setActiveDetailElement(<LegendaryActionDetails legendaryActions={encounterContext.selectedCreature.legendaryActions} actionCount={encounterContext.selectedCreature.legendaryCount} />); 
                break;

            case 'lair': 
                setActiveDetailElement(<SpecialActionDetails specialActions={encounterContext.selectedCreature.lairActions} title='Lair Actions' />); 
                break;

            case 'regional': 
                setActiveDetailElement(<SpecialActionDetails specialActions={encounterContext.selectedCreature.regionalEffects} title='Regional Effects' />); 
                break;

            case 'mythic': 
                setActiveDetailElement(<SpecialActionDetails specialActions={encounterContext.selectedCreature.mythicEncounter} title='Mythic Encounter' />); 
                break;
        };
    };

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

                            <Container>
                                {Object.entries(actionsList).map(([k,v]) => (<Box key={k} sx={actionBox} onClick={() => {displayDetails(k)}}>{v}</Box>))}
                            </Container>
                        </Stack>
                    </Grid>
                    <Grid xs={5}>
                        {activeDetailElement}
                    </Grid>
                </Grid>
            )}
        </>
    );
};