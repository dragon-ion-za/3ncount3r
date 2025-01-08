import React from 'react';
import { Avatar, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';

import { CharacterViewModel } from 'apps/spa-3ncount3r/src/view-models/character.view-model';
import { searchResultAvatarStyles, searchResultPaperStyles } from '../search-creature-list-item/search-creature-list-item.styles';

interface SearchCharacterListItemProps {
    viewModel: CharacterViewModel;
    selectCreature: (viewModel: CharacterViewModel) => void;
}

const SearchCharacterListItem : React.FC<SearchCharacterListItemProps> = ({viewModel, selectCreature}) => { 

    return (
        <>
            <Paper sx={searchResultPaperStyles} onClick={() => selectCreature(viewModel)}>
                <Grid container>
                    <Grid xs={2}>
                        <Avatar sx={searchResultAvatarStyles} />
                    </Grid>
                    <Grid xs={7}>
                        <Typography variant='subtitle1'>{viewModel.classes.map(x => `Level ${x.level} ${x.name}`)}</Typography>
                        <Typography variant="h2">{viewModel.name}</Typography>        
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
}

export default SearchCharacterListItem;