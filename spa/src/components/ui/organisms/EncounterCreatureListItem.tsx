import { Card, CardContent, Stack, Typography } from "@mui/material";
import { CreatureViewModel } from '../../../view-models/creature.view-model.ts';

interface EncounterCreatureListItemProps {
    viewModel: CreatureViewModel;
}

export const EncounterCreatureListItem : React.FC<EncounterCreatureListItemProps> = ({viewModel}) => {
    return (
        <>
            <Card>
                <CardContent>
                    <Typography variant="h5">{viewModel.name}</Typography>                             
                </CardContent>
            </Card>
        </>
    );
}