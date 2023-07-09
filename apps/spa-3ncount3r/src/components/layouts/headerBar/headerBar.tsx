import React, { ReactNode } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { Box } from '@mui/material';

export interface HeaderBarProps {
    leftComponent: ReactNode;
    middleShortComponent: ReactNode;
    middleLongComponent: ReactNode;
    rightComponent: ReactNode;
};

const HeaderBar : React.FC<HeaderBarProps> = ({leftComponent, middleShortComponent, middleLongComponent, rightComponent}) => {
    return (
        <>
            <Box sx={{
                backgroundColor: 'rgba(150, 150, 150, 0.5)',
            }}>
                <Grid container direction='row' sx={{marginLeft: '64px', width: '95vw', height: '64px'}}>
                    <Grid xs={1}>
                        { leftComponent }
                    </Grid>
                    <Grid xs={1}>
                        { middleShortComponent }
                    </Grid>
                    <Grid xs={6}>
                        { middleLongComponent }
                    </Grid>
                    <Grid xs={4}>
                        { rightComponent }
                    </Grid>
                </Grid>
            </Box>
        </>
    );

}

export default HeaderBar;