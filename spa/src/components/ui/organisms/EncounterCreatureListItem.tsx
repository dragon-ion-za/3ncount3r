import { Card, CardContent, Stack, Typography, Avatar } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import { EncounterCreatureViewModel } from "../../../view-models/encounter-creature.view-model.ts";

interface EncounterCreatureListItemProps {
    viewModel: EncounterCreatureViewModel;
}

export const EncounterCreatureListItem : React.FC<EncounterCreatureListItemProps> = ({viewModel}) => {
    const imagePath: string = `http://localhost:5001/creatures/image/${viewModel.sourceId}/${viewModel.name}`;

    function renderAlignment(alignment: string[]): string {
        let expandedAlignment: string = '';

        alignment.forEach(x => {
            switch(x) {
                case 'N': expandedAlignment += ' Neutral'; break;
                case 'E': expandedAlignment += ' Evil'; break;
                case 'G': expandedAlignment += ' Good'; break;
                case 'C': expandedAlignment += ' Chaotic'; break;
                case 'L': expandedAlignment += ' Lawful'; break;
                deafult: break;
            }
        });

        return expandedAlignment.trim();
    }

    return (
        <>
            <Card>
                <CardContent>
                    <Grid container>
                        <Grid xs={2}>
                            <Avatar src={imagePath} sx={{width: 64, height: 64, margin: '5px'}} />
                        </Grid>
                        <Grid xs={8}>
                            <Card>
                                <CardContent>
                                    <Typography sx={{ fontSize: 10}}>{viewModel.type} {renderAlignment(viewModel.alignment)}</Typography>
                                    <Typography variant="h5">{viewModel.name}</Typography>
                                    <Typography sx={{ fontSize: 10}}>
                                    </Typography>                                
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