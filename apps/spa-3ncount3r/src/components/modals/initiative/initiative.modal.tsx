import React, { forwardRef, useEffect, useState } from "react";
import { Box, Grid, Typography, Button, Table, TableHead, TableRow, TableCell, TableBody, TextField, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Checkbox, TableContainer } from "@mui/material";

import { EncounterCreatureViewModel } from "../../../view-models/encounter-creature.view-model";
import { doDiceFormulaCalculation } from "../../../services/dice.service";
import { calculateAbilityScoreModifier } from "../../../services/creature.service";
import { getPartyList } from "../../../services/party.service";

import { PartyViewModel } from "../../../view-models/party.view-model";
import { CharacterViewModel } from "../../../view-models/character.view-model";

import { modalContainerWide } from "../../../styles/modals.styles";
import { convertCharacterToEncounterCreatureViewModel } from "../../../converters/characterToCreature.converter";

export interface InitiativeModalProps {
    creaturesList: EncounterCreatureViewModel[];
    partyName: string;
    handleAccept: (creatures: EncounterCreatureViewModel[], partyName: string) => void;
    handleCancel: () => void;
}

export const InitiativeModal : React.FC<InitiativeModalProps> = forwardRef(({ creaturesList, partyName, handleAccept, handleCancel }, ref) => {
    const [creatures, setCreatures] = useState<EncounterCreatureViewModel[]>(creaturesList);
    let [parties, setParties] = useState<PartyViewModel[]>([]);
    let [selectedParty, setSelectedPary] = useState<string>(partyName);

    const rollInitiativeForCreature = (index: number) => {
        let state = [...creatures];
        state[index].initiative = doDiceFormulaCalculation(`1d20 + ${calculateAbilityScoreModifier(state[index].attributeDex)}`);
        setCreatures(state);
    }

    const manuallyUpdateInitiative = (event: any, index: number) => {
        let state = [...creatures];
        state[index].initiative = parseInt(event.target.value);
        setCreatures(state);
    }

    const manuallyUpdateRolledInitiative = (event: any, index: number) => {
        let state = [...creatures];
        state[index].initiative = parseInt(event.target.value) + calculateAbilityScoreModifier(state[index].attributeDex);
        setCreatures(state);
    }

    const toggleIsActive = (index: number, checked: boolean) => {
        let state = [...creatures];
        state[index].isActive = checked;
        setCreatures(state);
    }

    const handlePartySelection = (partyName: string) => {
        setSelectedPary(partyName);
        let selectedParty = parties.find(x => x.name === partyName ?? '');
        let partyMembers: CharacterViewModel[] = selectedParty!.characters;

        let state = [...creatures];
            
        partyMembers.forEach((member: CharacterViewModel) => {
            state.push(convertCharacterToEncounterCreatureViewModel(member));
        });
        
        setCreatures(state);
    }

    useEffect(() => {
        getPartyList().then(partyList => {
            setParties(partyList);
        });
    }, []);

    useEffect(() => {}, [creatures, parties, selectedParty]);

    return (
        <>
            <Box sx={modalContainerWide}>
                <Grid container direction='row'>
                    <Grid xs={12}>
                        <Typography variant="h5">Initiative Order</Typography>
                    </Grid>
                    <Grid xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="party_label">Add Adventuring Party?</InputLabel>
                            <Select 
                                labelId="party_label"
                                disabled={selectedParty !== ''}
                                value={selectedParty}
                                onChange={(event: SelectChangeEvent) => {handlePartySelection(event.target.value)}}>
                                {parties && parties.map(x => (<MenuItem key={x.name} value={x.name}>{x.name}</MenuItem>))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid xs={12}>
                        <TableContainer sx={{ maxHeight: "70vh"}}>
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Active</TableCell>
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
                                            <TableCell>
                                                <Checkbox checked={creature.isActive} onChange={(e, checked) => toggleIsActive(index, checked)} />
                                            </TableCell>
                                            <TableCell>{creature.name}</TableCell>
                                            <TableCell>{calculateAbilityScoreModifier(creature.attributeDex)}</TableCell>
                                            <TableCell>
                                                <TextField
                                                    type="number"
                                                    variant="standard"
                                                    value={creature.initiative - calculateAbilityScoreModifier(creature.attributeDex)}
                                                    onChange={(e) => { manuallyUpdateRolledInitiative(e, index) }} disabled={!creature.isActive} />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    type="number"
                                                    variant="standard"
                                                    value={creature.initiative}
                                                    onChange={(e) => { manuallyUpdateInitiative(e, index) }} disabled={!creature.isActive} />                                            
                                            </TableCell>
                                            <TableCell>
                                                <Button variant="outlined" onClick={() => rollInitiativeForCreature(index)} disabled={!creature.isActive}>Roll</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid xs={12}>
                        <Button variant="outlined" onClick={() => handleAccept(creatures, selectedParty)}>Accept</Button>
                        <Button variant="outlined" onClick={handleCancel}>Cancel</Button>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
});