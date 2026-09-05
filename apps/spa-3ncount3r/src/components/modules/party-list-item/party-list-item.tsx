import React, { useEffect } from "react";
import { Card, CardContent, Typography, Avatar, Stack } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';

import { PartyViewModel } from "apps/spa-3ncount3r/src/view-models/party.view-model";
import { creatureAvatarStyle, encounterCreatureCardStyles, selectedCreatureStyles } from "../encounter-creature-list-item/encounter-creature-list-item.styles";

interface PartyListItemProps {
    viewModel: PartyViewModel;
    index: number;
    isSelected: boolean;
    handleSelection: (index: number) => void;
}

export const PartyListItem : React.FC<PartyListItemProps> = ({viewModel, index, isSelected, handleSelection}) => {

    useEffect(() => {}, []);

    return (
        <>
            <Card sx={{...encounterCreatureCardStyles, ...(isSelected ? selectedCreatureStyles : {}) }} onClick={() => { handleSelection(index) }} >
                <CardContent>                     
                    <Grid container>
                        <Grid xs={2}>                                 
                            <Avatar sx={creatureAvatarStyle}>{viewModel.name.substring(0, Math.min(3, viewModel.name.length))}</Avatar>
                        </Grid>
                        <Grid xs={8}>
                            <Stack>
                                <Typography variant="h2">{viewModel.name}</Typography>
                            </Stack>
                        </Grid>
                        <Grid xs={2}>
                            <Stack>
                            </Stack>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </>
    );
}