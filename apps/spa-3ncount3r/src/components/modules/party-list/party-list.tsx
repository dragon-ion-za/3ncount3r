import React, { useEffect, useState } from "react";
import { Badge, Card, CardContent, DialogContent, Grid, Icon, Modal, Stack } from "@mui/material";

import { encounterCreatureCardStyles } from "../encounter-creature-list-item/encounter-creature-list-item.styles";
import { Add } from "@mui/icons-material";
import { usePartyContext } from "apps/spa-3ncount3r/src/providers/party-context/party.context-provider";
import { PartyViewModel } from "apps/spa-3ncount3r/src/view-models/party.view-model";
import { PartyListItem } from "../party-list-item/party-list-item";

export const PartyList : React.FC = () => {
    const partyContext = usePartyContext();

    const handleNewParty = () => {
        partyContext.setSelectedPartyIndex(-2);
    };

    const handlePartySelection = (index: number) => {
        partyContext.setSelectedPartyIndex(index);
    };

    return (
        <>
            <Stack sx={{maxHeight: '90vh', overflowY: 'auto', overflowX: 'hidden'}}>
                <Card sx={{...encounterCreatureCardStyles }} onClick={() => { handleNewParty() }}>
                    <CardContent> 
                        <Add sx={{ marginLeft: 'auto', marginRight: 'auto', display: 'block' }} />
                    </CardContent>
                </Card>
                {partyContext.parties.map((party: PartyViewModel, index: number) => (
                    <PartyListItem key={party.id} viewModel={party} index={index}
                        handleSelection={handlePartySelection}
                        isSelected={partyContext.selectedPartyIndex === index} />
                ))}
            </Stack>
        </>
    );
}