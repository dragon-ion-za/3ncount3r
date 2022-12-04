import { Box, ToggleButtonGroup, ToggleButton, Button, Typography, Stack, Modal } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2';
import { useState } from 'react';
import { CreatureViewModel } from '../../../view-models/creature.view-model.ts';
import { EncounterCreatureViewModel } from '../../../view-models/encounter-creature.view-model.ts';

interface ConfigureCreatureModalProps {
    viewModel: CreatureViewModel;
    handleAccept: (encounterCreature: EncounterCreatureViewModel) => {};
    handleCancel: () => {};
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    textAlign: 'center'
  };

export const ConfigureCreatureModal : React.FC<ConfigureCreatureModalProps> = ({ viewModel, handleAccept, handleCancel }) => {
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
                setRolledHitpoints(parseInt(viewModel.hitpointAverage));
                break;
            case 'dice':
                setShowAvg(false);
                setShowDice(true);
                break;
        }
      };

    const handleDiceRoll = () => {
        let formulaPieces: string[] = viewModel.hitpointFormula.split('+');
        console.log(formulaPieces);

        let calculatedHitPoints: number = 0;
        formulaPieces.forEach((expression) => {
            if (expression.indexOf('d') > 0) {
                let diceExpression: string[] = expression.split('d');
                let diceValue: number = parseInt(diceExpression[1]);
                for (let n = 0; n < parseInt(diceExpression[0]); n++) {
                    let diceResult: number = Math.floor(Math.random() * diceValue) + 1;
                    calculatedHitPoints += diceResult;
                    console.log(diceResult);
                }
            } else {
                calculatedHitPoints += parseInt(expression);
            }
        });

        setRolledHitpoints(calculatedHitPoints);
    };

    const acceptConfiguration = () : EncounterCreatureViewModel => {
        let encounterCreature: EncounterCreatureViewModel = {...viewModel} as EncounterCreatureViewModel;

        encounterCreature.hitpointMax = encounterCreature.currentHitpoints = rolledHitpoints;

        return encounterCreature;
    }

    return (
        <>
            <Box sx={style}>
                <Grid container direction='row'>
                    <Grid item xs={12}>
                        <Typography variant="h5">{viewModel.name}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <ToggleButtonGroup
                            color="primary"
                            exclusive
                            onChange={handleChange}
                            >
                            <ToggleButton value="avg">Use Average</ToggleButton>
                            <ToggleButton value="dice">Roll Hit Points</ToggleButton>
                        </ToggleButtonGroup>
                    </Grid>
                    <Grid item xs={12} sx={showAvg ? {'display': 'block'} : {'display': 'none'}}>
                        {viewModel.hitpointAverage}
                    </Grid>
                    <Grid item xs={12} sx={showDice ? {'display': 'block'} : {'display': 'none'}}>
                        <Stack>
                            {viewModel.hitpointFormula}
                            <Button variant="outlined" onClick={handleDiceRoll}>Roll!</Button>
                            {rolledHitpoints}
                        </Stack>                        
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="outlined" 
                            disabled={showAvg || (showDice && rolledHitpoints > 0) ? null : 'disabled'}
                            onClick={() => handleAccept(acceptConfiguration())}>Accept</Button>
                        <Button variant="outlined" onClick={handleCancel}>Cancel</Button>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};