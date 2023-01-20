import React, { forwardRef, useEffect, useState } from "react";
import { Box, Grid, Typography, Button, Table, TableHead, TableRow, TableCell, TableBody, TextField, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from "@mui/material";

import { EncounterCreatureViewModel } from "../../../../view-models/encounter-creature.view-model";

import { modalContainerWide } from "../../../../styles/modals.styles";
import { getPartyList } from "../../../services/party.service";
import { PartyViewModel } from "../../../../view-models/party.view-model";

export interface PartyExplorerModalProps {
    handleAccept: (partyName: string) => void;
    handleCancel: () => void;
}

export const PartyExplorerModal : React.FC<PartyExplorerModalProps> = forwardRef(({ handleAccept, handleCancel }, ref) => {
    let [parties, setParties] = useState<PartyViewModel[]>([]);
    let [selectedParty, setSelectedPary] = useState<string>('');

    useEffect(() => {
        getPartyList().then(partyList => {
            setParties(partyList);
        });
    }, []);

    useEffect(() => {}, [parties]);

    return (
        <>
            <Box sx={modalContainerWide}>
                <Grid container direction='row'>
                    <Grid xs={12}>
                        <Typography variant="h5">Party Explorer</Typography>
                    </Grid>
                    <Grid xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="party_label">Adventuring Party</InputLabel>
                            <Select labelId="party_label" onChange={(event: SelectChangeEvent) => {setSelectedPary(event.target.value)}}>
                                {parties && parties.map(x => (<MenuItem key={x.name} value={x.name}>{x.name}</MenuItem>))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid xs={12}>
                        <Button variant="outlined" onClick={() => { handleAccept(selectedParty) }}>Accept</Button>
                        <Button variant="outlined" onClick={handleCancel}>Cancel</Button>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
});