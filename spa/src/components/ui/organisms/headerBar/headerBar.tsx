import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { Box } from '@mui/material';

import SearchCreatures from '../searchCreatures/searchCreatures';
import { InitiativeHandler } from '../initiativeHandler/initiativeHandler';

const HeaderBar : React.FC = () => {
    return (
        <>
            <Box sx={{
                backgroundColor: 'rgba(150, 150, 150, 0.5)',
            }}>
                <Grid container direction='row' sx={{marginLeft: '64px', width: '95vw', height: '64px'}}>
                    <Grid xs={1}>
                        <InitiativeHandler />
                    </Grid>
                    <Grid xs={7}>

                    </Grid>
                    <Grid xs={4}>
                        <SearchCreatures />
                    </Grid>
                </Grid>
            </Box>
        </>
    );

}

export default HeaderBar;