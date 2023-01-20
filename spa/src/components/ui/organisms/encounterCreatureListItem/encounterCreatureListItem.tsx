import React, { useContext } from "react";
import { Card, CardContent, Typography, Avatar, Stack, Chip, Container } from "@mui/material";
import { LocalHospital, Shield } from "@mui/icons-material"
import Grid from '@mui/material/Unstable_Grid2';

import { EncounterCreatureViewModel } from "../../../../view-models/encounter-creature.view-model";
import { getCreatureToken, parseAlignment } from "../../../services/creature.service";
import { useEncounterContext } from '../../../contexts/encounter.context-provider';
import { InitiativeIcon } from "../../molecules/icons/initiativeOrder.icon";
import { MovementSpeedIcon } from "../../molecules/icons/movementSpeed.icon";
import { FlyingSpeedIcon } from "../../molecules/icons/flyingSpeed.icon";
import { SwimmingSpeedIcon } from "../../molecules/icons/swimmingSpeed.icon";
import { ClimbingSpeedIcon } from "../../molecules/icons/climbingSpeed.icon";
import { BurrowingSpeedIcon } from "../../molecules/icons/burrowingSpeed.icon";

import { encounterCreatureCardStyles, encounterCreatureChipStyle, encounterCreatureChipContainer } from './encounterCreatureListItem.styles';

interface EncounterCreatureListItemProps {
    viewModel: EncounterCreatureViewModel;
}

export const EncounterCreatureListItem : React.FC<EncounterCreatureListItemProps> = ({viewModel}) => {
    const encounterContext = useEncounterContext();
    
    const handleCreatureSelection = () => {
        encounterContext.setSelectedCreature(viewModel);
    };

    return (
        <> 
            <Card sx={encounterCreatureCardStyles} onClick={() => { handleCreatureSelection() }}>
                <CardContent> 
                    <Grid container>
                        <Grid xs={2}> 
                            <Avatar src={getCreatureToken(viewModel.sourceId, 
                                                            viewModel.isPlayerCharacter ? viewModel.id : viewModel.name, 
                                                            viewModel.isPlayerCharacter)} sx={{width: 64, height: 64, margin: '5px'}} />
                        </Grid>
                        <Grid xs={8}>
                            <Stack>
                                <Typography variant='subtitle1'>{viewModel.type} {parseAlignment(viewModel.alignment)}</Typography>
                                <Typography variant="h2">{viewModel.name}</Typography>
                                <Container sx={encounterCreatureChipContainer}>
                                    {(viewModel.walkingSpeed > 0 && <Chip sx={encounterCreatureChipStyle} icon={<MovementSpeedIcon />} label={viewModel.walkingSpeed} />)}
                                    {(viewModel.flyingSpeed > 0 && <Chip sx={encounterCreatureChipStyle} icon={<FlyingSpeedIcon />} label={viewModel.flyingSpeed} />)}
                                    {(viewModel.swimmingSpeed > 0 && <Chip sx={encounterCreatureChipStyle} icon={<SwimmingSpeedIcon />} label={viewModel.swimmingSpeed} />)}
                                    {(viewModel.climbingSpeed > 0 && <Chip sx={encounterCreatureChipStyle} icon={<ClimbingSpeedIcon />} label={viewModel.climbingSpeed} />)}
                                    {(viewModel.burrowingSpeed > 0 && <Chip sx={encounterCreatureChipStyle} icon={<BurrowingSpeedIcon />} label={viewModel.burrowingSpeed} />)}
                                </Container>
                            </Stack>
                        </Grid>
                        <Grid xs={2}>
                            <Stack>
                                <Chip sx={encounterCreatureChipStyle} icon={<LocalHospital />} label={viewModel.currentHitpoints} />
                                <Chip sx={encounterCreatureChipStyle} icon={<Shield />} label={viewModel.armourClass?.armourClass ?? '-'} />
                                <Chip sx={encounterCreatureChipStyle} icon={<InitiativeIcon />} label={viewModel.initiative ?? '-'} />
                            </Stack>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </>
    );
}