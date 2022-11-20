import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';

const SplitThreeLayout : React.FC = () => {

    return(
        <>
            <Grid container direction='row' sx={{width: '100vw', height: '100vh'}}>
                <Grid item 
                xs={4} 
                sx={{}}
                >
                </Grid>
                <Grid container xs direction='column'>
                    <Grid item xs 
                    sx={{}}
                    >
                    
                    </Grid>
                    <Grid item xs 
                    sx={{}}
                    >
                    
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default SplitThreeLayout;