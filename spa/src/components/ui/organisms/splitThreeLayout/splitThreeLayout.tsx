import React, { ReactNode } from 'react';
import Grid from '@mui/material/Unstable_Grid2';

export interface SplitThreeLayoutProps {
    longBarComponent: ReactNode;
    topRightComponent: ReactNode;
};

const SplitThreeLayout : React.FC<SplitThreeLayoutProps> = ({longBarComponent, topRightComponent}) => {

    return(
        <>
            <Grid container direction='row' sx={{marginLeft: '64px', width: '95vw', height: 'calc(100vh - 64px)'}}>
                <Grid 
                xs={4} 
                sx={{}}
                >
                    {longBarComponent}
                </Grid>
                <Grid container xs={8} direction='column'>
                    <Grid xs 
                    sx={{height: '60vh', overflowY: 'auto'}}
                    >
                        {topRightComponent}
                    </Grid>
                    <Grid xs
                    sx={{height: '40vh', overflowY: 'auto'}}
                    >
                    
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default SplitThreeLayout;