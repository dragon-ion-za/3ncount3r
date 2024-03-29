import React from 'react';
import { Avatar, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';

import { parseAlignment } from '../../../services/creature.service';

import { CreatureViewModel } from '../../../view-models/creature.view-model';

import { searchResultPaperStyles, searchResultAvatarStyles } from './search-creature-list-item.styles'

interface SearchCreatureListItemProps {
    viewModel: CreatureViewModel;
    selectCreature: (viewModel: CreatureViewModel) => void;
}

const SearchCreatureListItem : React.FC<SearchCreatureListItemProps> = ({viewModel, selectCreature}) => { 

    return (
        <>
            <Paper sx={searchResultPaperStyles} onClick={() => selectCreature(viewModel)}>
                <Grid container>
                    <Grid xs={2}>
                        <Avatar src={viewModel.imageUrl} sx={searchResultAvatarStyles} />
                    </Grid>
                    <Grid xs={7}>
                        <Typography variant='subtitle1'>{viewModel.type} {parseAlignment(viewModel.alignment)}</Typography>
                        <Typography variant="h2">{viewModel.name}</Typography>
                        <Typography variant='subtitle1'>
                            {viewModel.hitpointSpecial 
                                ? viewModel.hitpointSpecial 
                                : `${viewModel.hitpointAverage} (${viewModel.hitpointFormula})`
                            }
                        </Typography>          
                    </Grid>
                    <Grid xs={1}>
                        <Typography variant='subtitle1'>{viewModel.byoapiId}</Typography>
                    </Grid>
                    <Grid xs={2}>
                        <Avatar sx={searchResultAvatarStyles}>{viewModel.challengeRating?.rating ?? 0}</Avatar>                        
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
}

export default SearchCreatureListItem;