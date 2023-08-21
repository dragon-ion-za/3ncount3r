import React from "react";
import { Card, CardContent, Typography, Avatar, Stack, Chip, Container, Badge } from "@mui/material";
import { LocalHospital, Shield } from "@mui/icons-material"
import Grid from '@mui/material/Unstable_Grid2';

import { EncounterCreatureViewModel } from "../../../view-models/encounter-creature.view-model";
import { parseAlignment } from "../../../services/creature.service";
import { InitiativeIcon } from "../../icons/initiative-order.icon";
import { MovementSpeedIcon } from "../../icons/speed.movement.icon";
import { FlyingSpeedIcon } from "../../icons/speed.flying.icon";
import { SwimmingSpeedIcon } from "../../icons/speed.swimming.icon";
import { ClimbingSpeedIcon } from "../../icons/speed.climbing.icon";
import { BurrowingSpeedIcon } from "../../icons/speed.burrowing.icon";

import { encounterCreatureCardStyles, encounterCreatureChipStyle, encounterCreatureChipContainer, creatureDeathStateStyle, creatureAvatarStyle, selectedCreatureStyles } from './encounter-creature-list-item.styles';

interface EncounterCreatureListItemProps {
    viewModel: EncounterCreatureViewModel;
    index: number;
    isSelected: boolean;
    handleSelection: (index: number) => void;
    manageHitpoints: () => void;
}

export const EncounterCreatureListItem : React.FC<EncounterCreatureListItemProps> = ({viewModel, index, isSelected, handleSelection, manageHitpoints}) => {
    return (
        <>
            <Badge color="secondary" variant='dot' invisible={false} component={"div"}>
                <Card sx={{...encounterCreatureCardStyles, ...(isSelected ? selectedCreatureStyles : {}) }} onClick={() => { handleSelection(index) }} >
                    <CardContent>                     
                        <Grid container>
                            <Grid xs={2}>                                 
                                <Avatar sx={viewModel.currentHitpoints <= 0 ? creatureDeathStateStyle : creatureAvatarStyle} 
                                    src={viewModel.imageUrl} />
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
                                    <Chip sx={encounterCreatureChipStyle} icon={<LocalHospital />} label={viewModel.currentHitpoints} onClick={() => {manageHitpoints()}} />
                                    <Chip sx={encounterCreatureChipStyle} icon={<Shield />} label={viewModel.armourClass?.armourClass ?? '-'} />
                                    <Chip sx={encounterCreatureChipStyle} icon={<InitiativeIcon />} label={viewModel.initiative ?? '-'} />
                                </Stack>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Badge>
        </>
    );
}