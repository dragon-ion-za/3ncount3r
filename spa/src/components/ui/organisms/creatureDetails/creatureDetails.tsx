import React, { ReactElement, useState } from "react";
import { Avatar, Box, Container, Divider, Stack, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import Grid from '@mui/material/Unstable_Grid2';

import { getCreatureToken} from "../../../services/creature.service.ts";
import { EncounterContextModel } from "../../../contexts/encounter.context-model.ts";
import { EncounterContext } from '../../../contexts/encounter.context-provider.tsx';
import { ResistanceViewModel } from "../../../../view-models/creature.view-model.ts";
import { DamageConditionType } from "../../molecules/damageConditionType/damageConditionType.tsx";
import { SpellcastingDetails } from "../../molecules/spellcastingDetails/spellcastingDetails.tsx";
import { actionBox } from "./creatureDetails.styles.ts";
import { TraitDetails } from "../../molecules/traitDetails/traitDetails.tsx";
import { ActionDetails } from "../../molecules/actionDetails/actionDetails.tsx";
import { LegendaryActionDetails } from "../../molecules/legendaryActionDetails/legendaryActionDetails.tsx";
import { SpecialActionDetails } from "../../molecules/specialActionDetails/specialActionDetails.tsx";

export const CreatureDetails : React.FC = () => { 

    const encounterContext = useContext<EncounterContextModel>(EncounterContext);
    const [activeDetailElement, setActiveDetailElement] = useState<ReactElement | null>();
    const [actionsList, setActionsList] = useState<Record<string, string>>({});

    useEffect(() => {
        if (encounterContext.encounterState.selectedCreature) {

            let actions : Record<string, string> = {};

            actions.traits = 'Traits';

            if (encounterContext.encounterState.selectedCreature.spellcasting.some(x => {return x.name === 'Innate Spellcasting'}))
                actions.innatespellcasting = 'Innate Spellcasting';

            if (encounterContext.encounterState.selectedCreature.spellcasting.some(x => {return x.name === 'Spellcasting'}))
                actions.spellcasting = 'Spellcasting';

                actions.actions = 'Actions';

            if (encounterContext.encounterState.selectedCreature.reactions && encounterContext.encounterState.selectedCreature.reactions.length > 0)
                actions.reactions = 'Reactions';

            if (encounterContext.encounterState.selectedCreature.legendaryActions && encounterContext.encounterState.selectedCreature.legendaryActions.length > 0)
                actions.legendary = 'Legendary Actions';

            if (encounterContext.encounterState.selectedCreature.lairActions && encounterContext.encounterState.selectedCreature.lairActions.length > 0)
                actions.lair = 'Lair Actions';

            if (encounterContext.encounterState.selectedCreature.regionalEffects && encounterContext.encounterState.selectedCreature.regionalEffects.length > 0)
                actions.regional = 'Regional Effects';

            if (encounterContext.encounterState.selectedCreature.mythicalEncounter && encounterContext.encounterState.selectedCreature.mythicalEncounter.length > 0)
                actions.mythic = 'Mythical Encounter';

            setActionsList(actions);

            setActiveDetailElement(<TraitDetails traits={encounterContext.encounterState.selectedCreature.traits} />);
        }
    }, [encounterContext.encounterState.selectedCreature])

    const displayDetails = (type: string) => {
        switch (type){
            case 'traits': 
                setActiveDetailElement(<TraitDetails traits={encounterContext.encounterState.selectedCreature.traits} />); 
                break;

            case 'innatespellcasting': 
                setActiveDetailElement(<SpellcastingDetails spellcasting={encounterContext.encounterState.selectedCreature.spellcasting.filter(x => {return x.name === 'Innate Spellcasting'})[0]} />); 
                break;

            case 'spellcasting': 
                setActiveDetailElement(<SpellcastingDetails spellcasting={encounterContext.encounterState.selectedCreature.spellcasting.filter(x => {return x.name === 'Spellcasting'})[0]} />); 
                break;

            case 'actions': 
                setActiveDetailElement(<ActionDetails actions={encounterContext.encounterState.selectedCreature.actions} />); 
                break;

            case 'reactions': 
                setActiveDetailElement(<ActionDetails actions={encounterContext.encounterState.selectedCreature.reactions} />); 
                break;

            case 'legendary': 
                setActiveDetailElement(<LegendaryActionDetails legendaryActions={encounterContext.encounterState.selectedCreature.legendaryActions} actionCount={encounterContext.encounterState.selectedCreature.legendaryCount} />); 
                break;

            case 'lair': 
                setActiveDetailElement(<SpecialActionDetails specialActions={encounterContext.encounterState.selectedCreature.lairActions} title='Lair Actions' />); 
                break;

            case 'regional': 
                setActiveDetailElement(<SpecialActionDetails specialActions={encounterContext.encounterState.selectedCreature.regionalEffects} title='Regional Effects' />); 
                break;

            case 'mythic': 
                setActiveDetailElement(<SpecialActionDetails specialActions={encounterContext.encounterState.selectedCreature.mythicEncounter} title='Mythic Encounter' />); 
                break;
        };
    };

    return (
        <>
            {encounterContext.encounterState.selectedCreature &&
            (
                <Grid container direction='row' sx={{height: '100%'}}>
                    <Grid item xs={2}>
                        <Avatar 
                            src={getCreatureToken(encounterContext.encounterState.selectedCreature.sourceId, encounterContext.encounterState.selectedCreature.name)} 
                            sx={{width: 128, height: 128, margin: 'auto', top: 'calc(50% - 64px)'}} />
                    </Grid>
                    <Grid item xs={5}>
                        <Stack>
                            <Typography variant="h1">{encounterContext.encounterState.selectedCreature.name}</Typography>

                            {encounterContext.encounterState.selectedCreature.resistances.length > 0 && 
                            (
                                <>
                                    <Typography variant="h3">Resistances</Typography>
                                    <Container>
                                        {encounterContext.encounterState.selectedCreature.resistances.map((resistance: ResistanceViewModel) => 
                                            (<DamageConditionType key={`res_${resistance.resistantTo}`} type={resistance.resistantTo} condition={resistance.condition} />)
                                        )}
                                    </Container>
                                </>
                                
                            )}

                            {encounterContext.encounterState.selectedCreature.immunities.length > 0 && 
                            (
                                <>
                                    <Typography variant="h3">Immunities</Typography>
                                    <Container>
                                        {encounterContext.encounterState.selectedCreature.immunities.map((immunity: ResistanceViewModel) => 
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
                    <Grid item xs={5}>
                        {activeDetailElement}
                    </Grid>
                </Grid>
            )}
        </>
    );
};