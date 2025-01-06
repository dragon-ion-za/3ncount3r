import React, { forwardRef, SyntheticEvent, useEffect, useState } from "react";
import { Box, Grid, Typography, FormControl, InputLabel, Select, SelectChangeEvent, MenuItem, List, ListSubheader } from "@mui/material";
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';

import { EncounterViewModel } from "../../../view-models/encounter.view-model";
import { getEncounters } from "../../../services/encounter.service";

import { modalContainerWide } from "../../../styles/modals.styles";
import { useAuth0 } from "@auth0/auth0-react";

export interface LoadEncounterModalProps {
    handleAccept: (encounterId: string) => void;
    handleCancel: () => void;
}

class CampaignListItemViewModel { 
    campaign: string = '';
    locations: LocationListItemViewModel[] = [];
}

class LocationListItemViewModel {
    location: string = '';
    encounters: EncounterViewModel[] = [];
}

export const LoadEncounterModal : React.FC<LoadEncounterModalProps> = forwardRef(({ handleAccept, handleCancel }, ref) => {
    const [encounters, setEncounters] = useState<CampaignListItemViewModel[]>([]);
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        (async () => { 
            let accessToken = await getAccessTokenSilently({ authorizationParams: { audience: 'https://api.3ncount3r.co.za' } });
            let encounters = await getEncounters(accessToken);
            let groupedEncounters: CampaignListItemViewModel[] = [];

            encounters.forEach((x: EncounterViewModel) => {
                let campaignIndex = groupedEncounters.findIndex(y => y.campaign === x.campaign);

                if (campaignIndex < 0) {
                    campaignIndex = groupedEncounters.push({ campaign: x.campaign, locations: [] }) - 1;
                }

                let locationIndex = groupedEncounters[campaignIndex].locations.findIndex(y => y.location === x.location);

                if (locationIndex < 0) {
                    locationIndex = groupedEncounters[campaignIndex].locations.push({ location: x.location, encounters: [] }) - 1;
                }

                groupedEncounters[campaignIndex].locations[locationIndex].encounters.push(x);
            });

            setEncounters(groupedEncounters);
        })();
    }, []);

    useEffect(()=>{}, [encounters]);

    const doAccept = (itemId: string) => {
        handleAccept(itemId);
    }

    return (
        <>
        <Box sx={modalContainerWide}>
            <Grid container direction='row'>
                <Grid xs={12}>
                    <Typography variant="h5">Load Encounter</Typography>
                </Grid>
                <Grid xs={12}>
                    <FormControl fullWidth>
                        <SimpleTreeView onSelectedItemsChange={(event: SyntheticEvent, itemIds: string | null) => {doAccept(itemIds ?? '')}}>
                            {encounters && encounters.map((x: any) => (
                                <TreeItem itemId={x.campaign} label={x.campaign}>
                                    {x.locations && x.locations.map((y: any) => (
                                        <TreeItem itemId={y.location} label={y.location}>
                                            {y.encounters && y.encounters.map((z: any) => (
                                                <TreeItem itemId={z.id} label={`${z.name}${z.selectedParty ? '(' + z.selectedParty + ')' : ''}`}></TreeItem>
                                            ))}
                                        </TreeItem>
                                    ))}
                                </TreeItem>
                            ))}
                        </SimpleTreeView>
                    </FormControl>
                </Grid>
            </Grid>
        </Box>
        </>
    );
});