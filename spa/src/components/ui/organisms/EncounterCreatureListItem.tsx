import { Card, CardContent, Typography, Avatar } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import { EncounterCreatureViewModel } from "../../../view-models/encounter-creature.view-model.ts";
import { getCreatureToken, parseAlignment } from "../../services/creature.service.ts";

interface EncounterCreatureListItemProps {
    viewModel: EncounterCreatureViewModel;
}

export const EncounterCreatureListItem : React.FC<EncounterCreatureListItemProps> = ({viewModel}) => {

    return (
        <>
            <Card>
                <CardContent>
                    <Grid container>
                        <Grid xs={2}>
                            <Avatar src={getCreatureToken(viewModel.sourceId, viewModel.name)} sx={{width: 64, height: 64, margin: '5px'}} />
                        </Grid>
                        <Grid xs={8}>
                            <Card>
                                <CardContent>
                                    <Typography sx={{ fontSize: 10}}>{viewModel.type} {parseAlignment(viewModel.alignment)}</Typography>
                                    <Typography variant="h5">{viewModel.name}</Typography>
                                    <Typography sx={{ fontSize: 10}}></Typography>                                
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid xs={2}>
                            {viewModel.currentHitpoints}
                        </Grid>
                    </Grid>                            
                </CardContent>
            </Card>
        </>
    );
}