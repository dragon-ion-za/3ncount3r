import React, { useState, useEffect } from "react";
import { Button, Divider, Stack, TextField, Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';

import { usePartyContext } from "apps/spa-3ncount3r/src/providers/party-context/party.context-provider";
import { PartyViewModel } from "apps/spa-3ncount3r/src/view-models/party.view-model";
import { useBusyLoadingContext } from "apps/spa-3ncount3r/src/providers/busy-loading-context/busy-loading.context-provider";
import { useAuth0 } from "@auth0/auth0-react";
import { getPartyList, saveParty, updateParty } from "apps/spa-3ncount3r/src/services/party.service";

export const PartyDetails : React.FC = () => {
    const partyContext = usePartyContext();
    const loadingContext = useBusyLoadingContext();

    const { getAccessTokenSilently } = useAuth0();

    const [model, setModel] = useState<PartyViewModel>(partyContext.getSelectedParty());

    useEffect(() => {
        if (partyContext.selectedPartyIndex === -2) {
            setModel({ id: '', name: 'Unnamed Party', characterIds: [], characters: [] });
        } else {
            const selectedParty = partyContext.getSelectedParty();
            setModel(selectedParty);
        }
    }, [partyContext.selectedPartyIndex])

    useEffect(() => {}, [model]);

    const updatePartyName = (event: any) => {
        setModel({ ...model, name: event.target.value });
    }

    const savePartyDetails = async () => {
        try {
            loadingContext.setIsLoading(true);
            let accessToken = await getAccessTokenSilently({ authorizationParams: { audience: 'https://api.3ncount3r.co.za' } });
            let partyId: string = '';

            if (partyContext.selectedPartyIndex === -2) {
                partyId = await saveParty(accessToken, {
                    id: '',
                    name: model.name,
                    characterIds: model.characters.map(x => x.id),
                    characters: []
                });
    
                if (partyId === '') {
                    console.log('save failed!!!');
                }
            } else {
                partyId = model.id;
                await updateParty(accessToken, {
                    id: model.id,
                    name: model.name,
                    characterIds: model.characters.map(x => x.id),
                    characters: []
                });
    
                if (partyId === '') {
                    console.log('save failed!!!');
                }
            }

            let partyList = await getPartyList(accessToken);
            partyContext.setParties(partyList);
            partyContext.setSelectedPartyIndex(partyContext.parties.findIndex(x => x.id === partyId));
        } finally {
            loadingContext.setIsLoading(false);
        }
    }

    return (
        <>
            {model && (partyContext.selectedPartyIndex > -1 || partyContext.selectedPartyIndex === -2) &&
            (
                <Grid container direction='row' sx={{height: '100%'}}>
                    <Grid xs={7}>
                        <Stack>
                            <Typography variant="h1">{model.name}</Typography>
                            <Typography variant='subtitle1'>No Campaign Assigned</Typography>
                            <Divider />
                            <TextField
                                fullWidth
                                label="Party Name"
                                variant="standard"
                                value={model.name}
                                onChange={(e) => { updatePartyName(e) }} />
                            <Divider />
                            <Grid xs={12}>
                                <Button variant="outlined" onClick={() => savePartyDetails()}>Save</Button>
                                <Button variant="outlined" onClick={() => partyContext.setSelectedPartyIndex(-1)}>Cancel</Button>
                            </Grid>
                        </Stack>
                    </Grid>
                    <Grid xs={5} sx={{maxHeight: '100%', overflow: 'auto'}}>
                        <Stack>
                            <Typography variant="h2">Party Members</Typography>
                            <Divider />
                        </Stack>
                    </Grid>
                </Grid>
            )}
        </>
    );
};