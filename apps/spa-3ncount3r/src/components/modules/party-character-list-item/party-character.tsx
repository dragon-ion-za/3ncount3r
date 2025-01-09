import React, { useEffect } from "react";
import { Card, CardContent, Typography, Avatar, Stack, Chip, Container, Badge } from "@mui/material";
import { Delete, LocalHospital, Shield } from "@mui/icons-material"
import Grid from '@mui/material/Unstable_Grid2';

import { MovementSpeedIcon } from "../../icons/speed.movement.icon";
import { FlyingSpeedIcon } from "../../icons/speed.flying.icon";
import { SwimmingSpeedIcon } from "../../icons/speed.swimming.icon";
import { ClimbingSpeedIcon } from "../../icons/speed.climbing.icon";
import { BurrowingSpeedIcon } from "../../icons/speed.burrowing.icon";

import { useEncounterContext } from "apps/spa-3ncount3r/src/providers/encounterContext/encounter.context-provider";
import { CharacterViewModel } from "apps/spa-3ncount3r/src/view-models/character.view-model";
import { creatureAvatarStyle, encounterCreatureCardStyles, encounterCreatureChipContainer, encounterCreatureChipStyle, selectedCreatureStyles } from "../encounter-creature-list-item/encounter-creature-list-item.styles";

interface PartyCharacterListItemProps {
    viewModel: CharacterViewModel;
    index: number;
    handleRemoveCharacter: (index: number) => void;
}

export const PartyCharacterListItem : React.FC<PartyCharacterListItemProps> = ({viewModel, index, handleRemoveCharacter}) => {
    const encounterContext = useEncounterContext();

    useEffect(() => {}, [encounterContext.turnCounter]);

    return (
        <>
            <Card sx={{...encounterCreatureCardStyles }} >
                <CardContent>                     
                    <Grid container>
                        <Grid xs={2}>                                 
                            <Avatar sx={creatureAvatarStyle} />
                        </Grid>
                        <Grid xs={8}>
                            <Stack>
                                <Typography variant='subtitle1'>{viewModel.classes?.map(x => `Level ${x.level} ${x.name}`)}</Typography>
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
                                <Chip sx={encounterCreatureChipStyle} icon={<LocalHospital />} label={viewModel.hitpointMaximum} />
                                <Chip sx={encounterCreatureChipStyle} icon={<Shield />} label={viewModel.armourClass?.armourClass ?? '-'} />
                                <Chip sx={encounterCreatureChipStyle} icon={<Delete />} onClick={() => { handleRemoveCharacter(index); }} />
                            </Stack>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </>
    );
}