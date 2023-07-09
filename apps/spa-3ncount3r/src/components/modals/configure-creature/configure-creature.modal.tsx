import React, { forwardRef, useState } from 'react';
import { Box, ToggleButtonGroup, ToggleButton, Button, Typography, Stack } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2';
import { v4 as uuid } from 'uuid';

import { doDiceFormulaCalculation } from '../../../services/dice.service';

import { CreatureViewModel } from '../../../view-models/creature.view-model';
import { EncounterCreatureViewModel } from '../../../view-models/encounter-creature.view-model';

import { modalContainer } from '../../../styles/modals.styles';

interface ConfigureCreatureModalProps {
    viewModel: CreatureViewModel;
    handleAccept: (encounterCreature: EncounterCreatureViewModel) => void;
    handleCancel: () => void;
}

export const ConfigureCreatureModal : React.FC<ConfigureCreatureModalProps> = forwardRef(({ viewModel, handleAccept, handleCancel }, ref) => {
    const [showAvg, setShowAvg] = useState(false);
    const [showDice, setShowDice] = useState(false);
    const [rolledHitpoints, setRolledHitpoints] = useState(0);

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        hitPointType: string,
      ) => {
        switch (hitPointType) {
            case 'avg':
                setShowAvg(true);
                setShowDice(false);
                setRolledHitpoints(viewModel.hitpointAverage);
                break;
            case 'dice':
                setShowAvg(false);
                setShowDice(true);
                setRolledHitpoints(0);
                break;
        }
      };

    const handleDiceRoll = () => {
        setRolledHitpoints(doDiceFormulaCalculation(viewModel.hitpointFormula));
    };

    const acceptConfiguration = () : EncounterCreatureViewModel => {
        let encounterCreature: EncounterCreatureViewModel = {...viewModel} as EncounterCreatureViewModel;
        encounterCreature.hitpointMax = encounterCreature.currentHitpoints = rolledHitpoints;
        encounterCreature.id = uuid();
        return encounterCreature;
    }

    return (
        <>
            <Box sx={modalContainer}>
                <Grid container direction='row'>
                    <Grid xs={12}>
                        <Typography variant="h5">{viewModel.name}</Typography>
                    </Grid>
                    <Grid xs={12}>
                        <ToggleButtonGroup
                            color="primary"
                            exclusive
                            onChange={handleChange}
                            >
                            <ToggleButton value="avg">Use Average</ToggleButton>
                            <ToggleButton value="dice">Roll Hit Points</ToggleButton>
                        </ToggleButtonGroup>
                    </Grid>
                    <Grid xs={12} sx={showAvg ? {'display': 'block'} : {'display': 'none'}}>
                        {viewModel.hitpointAverage}
                    </Grid>
                    <Grid xs={12} sx={showDice ? {'display': 'block'} : {'display': 'none'}}>
                        <Stack>
                            {viewModel.hitpointFormula}
                            <Button variant="outlined" onClick={handleDiceRoll}>Roll!</Button>
                            {rolledHitpoints}
                        </Stack>                        
                    </Grid>
                    <Grid xs={12}>
                        <Button variant="outlined" 
                            disabled={showAvg || (showDice && rolledHitpoints > 0) ? false : true}
                            onClick={() => handleAccept(acceptConfiguration())}>Accept</Button>
                        <Button variant="outlined" onClick={handleCancel}>Cancel</Button>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
});