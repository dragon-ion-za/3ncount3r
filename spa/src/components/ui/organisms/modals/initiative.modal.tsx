import React, { forwardRef, useEffect, useState } from "react";
import { Box, Grid, Typography, Button, Table, TableHead, TableRow, TableCell, TableBody, TextField } from "@mui/material";

import { EncounterCreatureViewModel } from "../../../../view-models/encounter-creature.view-model";
import { doDiceFormulaCalculation } from "../../../services/dice.service";
import { calculateAbilityScoreModifier } from "../../../services/creature.service";

import { modalContainerWide } from "../../../../styles/modals.styles";

export interface InitiativeModalProps {
    creaturesList: EncounterCreatureViewModel[];
    handleAccept: (creatures: EncounterCreatureViewModel[]) => void;
    handleCancel: () => void;
}

export const InitiativeModal : React.FC<InitiativeModalProps> = forwardRef(({ creaturesList, handleAccept, handleCancel }, ref) => {
    const [creatures, setCreatures] = useState<EncounterCreatureViewModel[]>(creaturesList);

    const rollInitiativeForCreature = (index: number) => {
        let state = [...creatures];
        state[index].initiative = doDiceFormulaCalculation(`1d20 + ${calculateAbilityScoreModifier(state[index].attributeDex)}`);
        setCreatures(state);
    }

    const manualyUpdateInitiative = (event: any, index: number) => {
        let state = [...creatures];
        state[index].initiative = parseInt(event.target.value);
        setCreatures(state);
    }

    useEffect(() => {}, [creatures]);

    return (
        <>
            <Box sx={modalContainerWide}>
                <Grid container direction='row'>
                    <Grid xs={12}>
                        <Typography variant="h5">Initiative Order</Typography>
                    </Grid>
                    <Grid xs={12}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Creature</TableCell>
                                    <TableCell>Modifier</TableCell>
                                    <TableCell>Rolled</TableCell>
                                    <TableCell>Initiative</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {creatures.map((creature, index) => (
                                    <TableRow key={`creature_${index}`}>
                                        <TableCell>{creature.name}</TableCell>
                                        <TableCell>{calculateAbilityScoreModifier(creature.attributeDex)}</TableCell>
                                        <TableCell>{creature.initiative - calculateAbilityScoreModifier(creature.attributeDex)}</TableCell>
                                        <TableCell>
                                            <TextField
                                                type="number"
                                                variant="standard"
                                                value={creature.initiative}
                                                onChange={(e) => { manualyUpdateInitiative(e, index) }} />                                            
                                        </TableCell>
                                        <TableCell>
                                        <Button variant="outlined" onClick={() => rollInitiativeForCreature(index)}>Roll</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Grid>
                    <Grid xs={12}>
                        <Button variant="outlined" onClick={() => handleAccept(creatures)}>Accept</Button>
                        <Button variant="outlined" onClick={handleCancel}>Cancel</Button>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
});