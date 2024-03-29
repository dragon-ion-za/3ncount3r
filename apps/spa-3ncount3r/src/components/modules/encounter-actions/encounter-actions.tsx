import { useEffect, useState } from "react";
import { Avatar, Button, Paper, Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';

import { useEncounterContext } from "apps/spa-3ncount3r/src/providers/encounterContext/encounter.context-provider";
import { roundCounterAvatarStyles, roundCounterCellStyles } from "./encounter-actions.styles";

const EncounterActions : React.FC = () => {
    const [totalXp, setTotalXp] = useState(0);
    const [partyXp, setPartyXp] = useState(0);
    const [turnMax, setTurnMax] = useState(0);

    const encounterContext = useEncounterContext();

    useEffect(() => {
        let xp: number = 0;
        xp = encounterContext.creatures.filter(x => !x.isPlayerCharacter).reduce((sum, x) => sum += x.challengeRating?.experience ?? 0, 0);
        setTotalXp(xp);
        setPartyXp(xp / Math.max(encounterContext.creatures.filter(x => x.isPlayerCharacter).length, 1));
        setTurnMax(encounterContext.creatures.filter(x => x.isActive).length);
    }, [encounterContext.creatures]);

    useEffect(() => {}, [encounterContext.turnCounter, encounterContext.roundCounter])

    const handleNextTurn = () => {
        let nextTurnCount = encounterContext.turnCounter + 1;

        if (nextTurnCount > turnMax) {
            nextTurnCount = 1;
            let nextRoundCount = encounterContext.roundCounter + 1;
            encounterContext.setRoundCounter(nextRoundCount);
        }

        encounterContext.setTurnCounter(nextTurnCount);
    };

    const handleNextRound = () => {
        let nextRoundCount = encounterContext.roundCounter + 1;
        encounterContext.setRoundCounter(nextRoundCount);
        encounterContext.setTurnCounter(1);
    };
    
    return (<> 
        <Paper sx={{ position: 'fixed', bottom: 16, left: "calc(50vw - 300px)", width: "600px", margin: "auto", height: "64px"}} elevation={3}>
            <Grid container>
                <Grid xs={3}>
                    <Grid container direction="column" sx={roundCounterCellStyles}>
                        <Grid>
                            Total XP: {totalXp}
                        </Grid>
                        <Grid>
                            Party XP: {partyXp}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid xs={7}>
                    <Grid container>
                        <Grid sx={roundCounterCellStyles}>
                            <Button variant="contained" size="small" onClick={() => { handleNextRound() }}>Next Round</Button>
                        </Grid>
                        <Grid>
                            <Avatar sx={roundCounterAvatarStyles}>
                                <Typography variant='body1' sx={{fontSize: '20px'}}>{encounterContext.roundCounter}<br /><Typography variant='body1'>{encounterContext.turnCounter} of {turnMax}</Typography></Typography>
                            </Avatar>
                        </Grid>
                        <Grid sx={roundCounterCellStyles}>
                            <Button variant="contained" size="small" onClick={() => { handleNextTurn() }}>Next Turn</Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid xs={2}></Grid>
            </Grid>            
        </Paper>
    </>);
}

export default EncounterActions;