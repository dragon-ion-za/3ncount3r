import { Stack, Typography } from "@mui/material";
import { useEncounterContext } from "apps/spa-3ncount3r/src/providers/encounterContext/encounter.context-provider";
import React, { useEffect } from "react";

export const EncounterTitle : React.FC = () => {     
    const encounterContext = useEncounterContext();

    useEffect(() => {}, [encounterContext]);

    return (
    <>
        <Stack>
            <Typography variant="h3">{encounterContext.encounterName}</Typography>
            <Typography variant="h4">{encounterContext.selectedParty}</Typography>
        </Stack>
    </>);
}