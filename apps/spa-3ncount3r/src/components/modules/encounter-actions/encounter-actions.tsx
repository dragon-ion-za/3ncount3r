import { useEffect, useState } from "react";
import { Avatar, Paper } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';

import { useEncounterContext } from "apps/spa-3ncount3r/src/providers/encounterContext/encounter.context-provider";

const EncounterActions : React.FC = () => {
    const [totalXp, setTotalXp] = useState(0);
    const [partyXp, setPartyXp] = useState(0);
    const [roundCount, setRoundCount] = useState(0);
    const [turnCount, setTurnCount] = useState(0);
    const [turnMax, setTurnMax] = useState(0);

    const encounterContext = useEncounterContext();

    useEffect(() => {
        let xp: number = 0;
        encounterContext.creatures.filter(x => !x.isPlayerCharacter).reduce((sum, x) => sum += x.challengeRating?.experience ?? 0, 0);
        setTotalXp(xp);
        setPartyXp(xp / Math.max(encounterContext.creatures.filter(x => !x.isPlayerCharacter).length, 1));
        setTurnMax(encounterContext.creatures.length);
    }, [encounterContext.creatures])
    
    return (<> 
        <Paper sx={{ position: 'fixed', bottom: 16, left: "calc(50vw - 300px)", width: "600px", margin: "auto", height: "64px", padding: "16px"}} elevation={3}>
            <Grid container>
                <Grid xs={3}>
                    <Grid container direction="column">
                        <Grid>
                            Total XP: {totalXp}
                        </Grid>
                        <Grid>
                            Party XP: {partyXp}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid xs={6}>
                    <Grid container>
                        <Grid>Next Round</Grid>
                        <Grid>
                            <Avatar>{roundCount}<br />{turnCount} of {turnMax}</Avatar>
                        </Grid>
                        <Grid>Next Turn</Grid>
                    </Grid>
                </Grid>
                <Grid xs={3}></Grid>
            </Grid>            
        </Paper>
    </>);
}

export default EncounterActions;