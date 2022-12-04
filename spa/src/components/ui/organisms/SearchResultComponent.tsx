import { Avatar, Card, CardContent, css, Typography, Modal } from '@mui/material';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { useContext, useState } from 'react';
import { CreatureViewModel } from '../../../view-models/creature.view-model.ts';
import { EncounterCreatureViewModel } from '../../../view-models/encounter-creature.view-model.ts';
import { EncounterContextModel } from '../../contexts/encounter.context-model.ts';
import { EncounterContext } from '../../contexts/encounter.context-provider.tsx';
import { ConfigureCreatureModal } from './modals/ConfigureCreatureModal.tsx';

interface SearchResultComponentProps {
    viewModel: CreatureViewModel;
}

const SearchResultComponent : React.FC<SearchResultComponentProps> = ({viewModel}) => { 

    const { encounterState, setEncounterState } = useContext<EncounterContextModel>(EncounterContext);
    const [open, setOpen] = useState(false);

    const imagePath: string = `http://localhost:5001/creatures/image/${viewModel.sourceId}/${viewModel.name}`;

    const toggleModal = (open: boolean) => {
        setOpen(open);
    }

    const acceptHandler = (encounterCreature: EncounterCreatureViewModel) => {
        let contextState = encounterState;
        contextState.creatures.push(encounterCreature);
        setEncounterState({...contextState});
        toggleModal(false);
    };

    function renderAlignment(alignment: string[]): string {
        let expandedAlignment: string = '';

        alignment.forEach(x => {
            switch(x) {
                case 'N': expandedAlignment += ' Neutral'; break;
                case 'E': expandedAlignment += ' Evil'; break;
                case 'G': expandedAlignment += ' Good'; break;
                case 'C': expandedAlignment += ' Chaotic'; break;
                case 'L': expandedAlignment += ' Lawful'; break;
                deafult: break;
            }
        });

        return expandedAlignment.trim();
    }

    return (
        <>
            <Paper sx={{":hover":{ backgroundColor: '#efefef' }}} onClick={() => toggleModal(true)}>
                <Grid container>
                    <Grid xs={2}>
                        <Avatar src={imagePath} sx={{width: 64, height: 64, margin: '5px'}} />
                    </Grid>
                    <Grid xs={8}>
                        <Card>
                            <CardContent>
                                <Typography sx={{ fontSize: 10}}>{viewModel.type} {renderAlignment(viewModel.alignment)}</Typography>
                                <Typography variant="h5">{viewModel.name}</Typography>
                                <Typography sx={{ fontSize: 10}}>
                                    {viewModel.hitpointSpecial 
                                        ? viewModel.hitpointSpecial 
                                        : `${viewModel.hitpointAverage} (${viewModel.hitpointFormula})`
                                    }
                                </Typography>                                
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid xs={2}>
                        <Avatar sx={{width: 64, height: 64, margin: '5px'}}>{viewModel.challengeRating}</Avatar>                        
                    </Grid>
                </Grid>
            </Paper>
            <Modal
                open={open}>
                <ConfigureCreatureModal 
                    viewModel={viewModel} 
                    handleCancel={() => toggleModal(false)} 
                    handleAccept={acceptHandler}/>
            </Modal>
        </>
    );
}

export default SearchResultComponent;