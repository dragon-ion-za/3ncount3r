import React, { ReactNode } from 'react';
import Grid from '@mui/material/Unstable_Grid2';

export interface SplitThreeLayoutProps {
    longBarComponent: ReactNode;
};

const SplitThreeLayout : React.FC<SplitThreeLayoutProps> = ({longBarComponent}) => {

    return(
        <>
            <Grid container direction='row' sx={{marginLeft: '64px', width: '95vw', height: '100vh'}}>
                <Grid item 
                xs={4} 
                sx={{}}
                >
                    {longBarComponent}
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