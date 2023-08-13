import { useEffect, useState } from "react";
import { Paper } from "@mui/material";

import { useEncounterContext } from "apps/spa-3ncount3r/src/providers/encounterContext/encounter.context-provider";

const EncounterActions : React.FC = () => {
    const [totalXp, setTotalXp] = useState(0);
    const [partyXp, setPartyXp] = useState(0);

    const encounterContext = useEncounterContext();

    useEffect(() => {
        let xp: number = 0;
        encounterContext.creatures.filter(x => !x.isPlayerCharacter).reduce((sum, x) => sum += x.challengeRating?.experience ?? 0, 0);
        setTotalXp(xp);
        setPartyXp(xp / Math.max(encounterContext.creatures.filter(x => !x.isPlayerCharacter).length, 1));

    }, [encounterContext.creatures])
    
    return (<> 
        <Paper sx={{ position: 'fixed', bottom: 16, left: "calc(50vw - 300px)", width: "600px", margin: "auto", height: "64px", padding: "16px"}} elevation={3}>
            {totalXp}
        </Paper>
    </>);
}

export default EncounterActions;