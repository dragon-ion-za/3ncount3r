import { Avatar, Card, CardContent, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { CreatureViewModel } from '../../../../view-models/creature.view-model.ts';
import { getCreatureToken, parseAlignment } from '../../../services/creature.service.ts';
import { searchResultPaperStyles, searchResultAvatarStyles, smallFontStyle } from './searchCreatureListItem.styles.ts'

interface SearchCreatureListItemProps {
    viewModel: CreatureViewModel;
    selectCreature: (viewModel: CreatureViewModel) => {};
}

const SearchCreatureListItem : React.FC<SearchCreatureListItemProps> = ({viewModel, selectCreature}) => { 

    return (
        <>
            <Paper sx={searchResultPaperStyles} onClick={() => selectCreature(viewModel)}>
                <Grid container>
                    <Grid xs={2}>
                        <Avatar src={getCreatureToken(viewModel.sourceId, viewModel.name)} sx={searchResultAvatarStyles} />
                    </Grid>
                    <Grid xs={8}>
                        <Typography variant='subtitle1'>{viewModel.type} {parseAlignment(viewModel.alignment)}</Typography>
                        <Typography variant="h2">{viewModel.name}</Typography>
                        <Typography variant='subtitle1'>
                            {viewModel.hitpointSpecial 
                                ? viewModel.hitpointSpecial 
                                : `${viewModel.hitpointAverage} (${viewModel.hitpointFormula})`
                            }
                        </Typography>          
                    </Grid>
                    <Grid xs={2}>
                        <Avatar sx={searchResultAvatarStyles}>{viewModel.challengeRating}</Avatar>                        
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
}

export default SearchCreatureListItem;