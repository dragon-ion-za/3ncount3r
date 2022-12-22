import { Card, CardContent, Typography, Avatar, Stack, Chip, Container } from "@mui/material";
import { LocalHospital, Shield } from "@mui/icons-material"
import Grid from '@mui/material/Unstable_Grid2';
import { EncounterCreatureViewModel } from "../../../../view-models/encounter-creature.view-model.ts";
import { getCreatureToken, parseAlignment } from "../../../services/creature.service.ts";
import { encounterCreatureCardStyles, encounterCreatureChipStyle, encounterCreatureChipContainer } from './encounterCreatureListItem.styles.ts';
import { InitiativeIcon } from "../../molecules/icons/initiativeOrder.icon.tsx";
import { MovementSpeedIcon } from "../../molecules/icons/movementSpeed.icon.tsx";
import { FlyingSpeedIcon } from "../../molecules/icons/flyingSpeed.icon.tsx";
import { SwimmingSpeedIcon } from "../../molecules/icons/swimmingSpeed.icon.tsx";
import { ClimbingSpeedIcon } from "../../molecules/icons/climbingSpeed.icon.tsx";

interface EncounterCreatureListItemProps {
    viewModel: EncounterCreatureViewModel;
}

export const EncounterCreatureListItem : React.FC<EncounterCreatureListItemProps> = ({viewModel}) => {

    return (
        <> 
            <Card sx={encounterCreatureCardStyles}>
                <CardContent> 
                    <Grid container>
                        <Grid xs={2}> 
                            <Avatar src={getCreatureToken(viewModel.sourceId, viewModel.name)} sx={{width: 64, height: 64, margin: '5px'}} />
                        </Grid>
                        <Grid xs={8}>
                            <Stack>
                                <Typography sx={{ fontSize: 10}}>{viewModel.type} {parseAlignment(viewModel.alignment)}</Typography>
                                <Typography variant="h5">{viewModel.name}</Typography>
                                <Container sx={encounterCreatureChipContainer}>
                                    {(viewModel.walkingSpeed > 0 && <Chip sx={encounterCreatureChipStyle} icon={<MovementSpeedIcon />} label={viewModel.walkingSpeed} />)}
                                    {(viewModel.flyingSpeed > 0 && <Chip sx={encounterCreatureChipStyle} icon={<FlyingSpeedIcon />} label={viewModel.flyingSpeed} />)}
                                    {(viewModel.swimmingSpeed > 0 && <Chip sx={encounterCreatureChipStyle} icon={<SwimmingSpeedIcon />} label={viewModel.swimmingSpeed} />)}
                                    {(viewModel.climbingSpeed > 0 && <Chip sx={encounterCreatureChipStyle} icon={<ClimbingSpeedIcon />} label={viewModel.climbingSpeed} />)}
                                </Container>
                            </Stack>
                        </Grid>
                        <Grid xs={2}>
                            <Stack>
                                <Chip sx={encounterCreatureChipStyle} icon={<LocalHospital />} label={viewModel.currentHitpoints} />
                                <Chip sx={encounterCreatureChipStyle} icon={<Shield />} label={viewModel.armourClass.armourClass} />
                                <Chip sx={encounterCreatureChipStyle} icon={<InitiativeIcon />} label={viewModel.initiative ?? '-'} />
                            </Stack>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </>
    );
}