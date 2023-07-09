import { Box, Grid, Typography, Button, TextField } from "@mui/material";
import React, { forwardRef, useState } from "react";

import { modalButtonsContainer, modalContainerWide } from "../../../styles/modals.styles";

export interface HitpointManagementModalProps {
    maxHitpoints: number;
    currentHitpoints: number;
    handleAccept: (newHitpoints: number) => void;
    handleCancel: () => void;
}

export const HitpointManagementModal : React.FC<HitpointManagementModalProps> = forwardRef(({ maxHitpoints, currentHitpoints, handleAccept, handleCancel }, ref) => {
    const [newHitpoints, setNewHitpoints] = useState<number>(currentHitpoints);

    const updateHitpoints = (event: any) => {
        setNewHitpoints(parseInt(event.target.value));
    }

    return (
        <>
            <Box sx={modalContainerWide}>
                <Grid container direction='row'>
                    <Grid xs={12}>
                        <Typography variant="h5">Manage Hitpoints</Typography>
                    </Grid>
                    <Grid xs={12}>
                        <Typography variant="body1"><strong>Hitpoint Maximum: </strong>{maxHitpoints}</Typography>
                    </Grid>
                    <Grid xs={12}>
                        <Typography variant="body1"><strong>Current Hitpoints: </strong>{currentHitpoints}</Typography>
                    </Grid>
                    <Grid xs={12}>
                        <TextField
                            label="New Hitpoints"
                            type="number"
                            variant="standard"
                            value={newHitpoints}
                            onChange={(e) => { updateHitpoints(e) }} />
                    </Grid>
                    <Grid sx={modalButtonsContainer} xs={12}>
                        <Button variant="outlined" onClick={() => { handleAccept(newHitpoints) }}>Accept</Button>
                        <Button variant="outlined" onClick={handleCancel}>Cancel</Button>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
});