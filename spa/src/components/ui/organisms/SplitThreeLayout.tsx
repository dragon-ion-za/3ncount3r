import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';

const SplitThreeLayout : React.FC = () => {

    return(
        <>
            <Grid container direction='row' sx={{width: '100vw', height: '100vh'}}>
                <Grid item 
                xs={4} 
                sx={{backgroundColor: 'primary.dark'}}
                >
                </Grid>
                <Grid container xs direction='column'>
                    <Grid item xs 
                    sx={{backgroundColor: 'primary.light'}}
                    >
                    
                    </Grid>
                    <Grid item xs 
                    sx={{backgroundColor: 'secondary.light'}}
                    >
                    
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default SplitThreeLayout;