import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box'
import SearchComponent from './SearchComponent.tsx';

const HeaderBar : React.FC = () => {

    return (
        <>
        <Box sx={{
            backgroundColor: 'rgba(150, 150, 150, 0.5)',
        }}>
            <Grid container direction='row' sx={{marginLeft: '64px', width: '95vw', height: '64px'}}>
                <Grid item 
                    xs={8}>

                </Grid>
                <Grid item xs={4}>
                    <SearchComponent />
                </Grid>
            </Grid>
        </Box>
        </>
    );

}

export default HeaderBar;