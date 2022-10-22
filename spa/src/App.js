import './App.css';
import Grid from '@mui/material/Unstable_Grid2';

function App() {
  return (
    <Grid container direction='row' sx={{width: '100vw', height: '100vh'}}>
      <Grid item xs={3} sx={{backgroundColor: 'primary.dark'}}>
        <div>1</div>
      </Grid>
      <Grid container xs={9} direction='column'>
        <Grid item xs sx={{backgroundColor: 'primary.light'}}>
          <div>2</div>
        </Grid>
        <Grid item xs sx={{backgroundColor: 'secondary.light'}}>
          <div>3</div>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default App;
