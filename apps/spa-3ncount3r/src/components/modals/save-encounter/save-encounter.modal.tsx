import { Box, Grid, Typography, Button, TextField } from "@mui/material";
import React, { forwardRef, useEffect, useState } from "react";


import { modalContainerWide } from "../../../styles/modals.styles";

export interface SaveEncounterModalProps {
    currentCampaignName: string;
    currentLocationName: string;
    currentEncounterName: string;
    handleAccept: (campaignName: string, locationName: string, encounterName: string) => void;
    handleCancel: () => void;
}

export const SaveEncounterModal : React.FC<SaveEncounterModalProps> = forwardRef(({ currentCampaignName, currentLocationName, currentEncounterName, handleAccept, handleCancel }, ref) => {
    const [campaignName, setCampaignName] = useState<string>(currentCampaignName);
    const [locationName, setLocationName] = useState<string>(currentLocationName);
    const [encounterName, setEncounterName] = useState<string>(currentEncounterName);

    useEffect(() => {}, [encounterName]);

    const updateEncounterName = (event: any) => {
        setEncounterName(event.target.value);
    }

    const updateCampaignName = (event: any) => {
        setCampaignName(event.target.value);
    }

    const updateLocationName = (event: any) => {
        setLocationName(event.target.value);
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
                        fullWidth
                        label="Campaign Name"
                        variant="standard"
                        value={campaignName}
                        onChange={(e) => { updateCampaignName(e) }} />
                    <TextField 
                        fullWidth
                        label="Location Name"
                        variant="standard"
                        value={locationName}
                        onChange={(e) => { updateLocationName(e) }} />
                    <TextField 
                        fullWidth
                        label="Encounter Name"
                        variant="standard"
                        value={encounterName}
                        onChange={(e) => { updateEncounterName(e) }} />
                </Grid>
                <Grid xs={12}>&nbsp;</Grid>
                <Grid xs={12}>
                    <Button variant="outlined" onClick={() => handleAccept(campaignName, locationName, encounterName)}>Save</Button>
                    <Button variant="outlined" onClick={handleCancel}>Cancel</Button>
                </Grid>
            </Grid>
        </Box>
        </>
    );
});