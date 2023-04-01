import React, { forwardRef, useEffect, useState } from "react";
import { Box, Grid, Typography, FormControl, InputLabel, Select, SelectChangeEvent, MenuItem } from "@mui/material";

import { EncounterViewModel } from "../../../../view-models/encounter.view-model";
import { getEncounters } from "../../../services/encounter.service";

import { modalContainerWide } from "../../../../styles/modals.styles";

export interface LoadEncounterModalProps {
    handleAccept: (encounterId: string, isTemplate: boolean) => void;
    handleCancel: () => void;
}

export const LoadEncounterModal : React.FC<LoadEncounterModalProps> = forwardRef(({ handleAccept, handleCancel }, ref) => {
    const [encounters, setEncounters] = useState<EncounterViewModel[]>([]);

    useEffect(() => {
        getEncounters().then(x => setEncounters(x));
    }, []);

    useEffect(() => {}, [encounters])

    return (
        <>
        <Box sx={modalContainerWide}>
            <Grid container direction='row'>
                <Grid xs={12}>
                    <Typography variant="h5">Load Encounter</Typography>
                </Grid>
                <Grid xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="party_label">Select Encounter</InputLabel>
                        <Select 
                            labelId="party_label"
                            onChange={(event: SelectChangeEvent) => {handleAccept(event.target.value, true)}}>
                            {encounters && encounters.map((x: EncounterViewModel) => (
                                <MenuItem key={x.id} value={x.id}>
                                    {`${x.name}${x.selectedParty !== undefined && x.selectedParty !== '' ? '(' + x.selectedParty + ')' : ''}`}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </Box>
        </>
    );
});