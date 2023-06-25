import { Box, Grid, Typography, Button, TextField } from "@mui/material";
import React, { forwardRef, useEffect, useState } from "react";


import { modalContainerWide } from "../../../../styles/modals.styles";

export interface SaveEncounterModalProps {
    currentEncounterName: string;
    handleAccept: (encounterName: string) => void;
    handleCancel: () => void;
}

export const SaveEncounterModal : React.FC<SaveEncounterModalProps> = forwardRef(({ currentEncounterName, handleAccept, handleCancel }, ref) => {
    const [encounterName, setEncounterName] = useState<string>(currentEncounterName);

    useEffect(() => {}, [encounterName]);

    const updateEncounterName = (event: any) => {
        setEncounterName(event.target.value);
    }
    
    return (
        <>
        <Box sx={modalContainerWide}>
            <Grid container direction='row'>
                <Grid xs={12}>
                    <Typography variant="h5">Save</Typography>
                </Grid>
                <Grid xs={12}>
                    <TextField
                        label="Encounter Name"
                        variant="standard"
                        value={encounterName}
                        onChange={(e) => { updateEncounterName(e) }} />
                </Grid>
                <Grid xs={12}>
                    <Button variant="outlined" onClick={() => handleAccept(encounterName)}>Save</Button>
                    <Button variant="outlined" onClick={handleCancel}>Cancel</Button>
                </Grid>
            </Grid>
        </Box>
        </>
    );
});