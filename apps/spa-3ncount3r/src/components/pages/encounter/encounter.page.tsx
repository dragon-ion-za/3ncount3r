import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router";
import { Drawer, Typography } from "@mui/material";

import SplitThreeLayout from "../../layouts/splitThreeLayout/splitThreeLayout";
import HeaderBar from "../../layouts/headerBar/headerBar";

import { InitiativeHandler } from "../../dialog-handlers/initiative-handler/initiative-handler";
import { SaveHandler } from "../../dialog-handlers/save-handler/save-handler";

import SearchCreatures from "../../modules/search-creatures/search-creatures";
import EncountersMenu from "../../modules/encounters-menu/encounters-menu";
import { EncounterCreatures } from "../../modules/encounterCreatures/encounterCreatures";
import { CreatureDetails } from "../../modules/creatureDetails/creatureDetails";
import EncounterActions from "../../modules/encounter-actions/encounter-actions";

import { useEncounterContext } from "apps/spa-3ncount3r/src/providers/encounterContext/encounter.context-provider";
import { getEncounterById } from "apps/spa-3ncount3r/src/services/encounter.service";

import { EncounterViewModel } from "apps/spa-3ncount3r/src/view-models/encounter.view-model";
import { EncounterTitle } from "../../modules/encounter-title/encounter-title";
import { useBusyLoadingContext } from "apps/spa-3ncount3r/src/providers/busy-loading-context/busy-loading.context-provider";

export const EncounterPage : React.FC = () => {
    const { getAccessTokenSilently, isAuthenticated } = useAuth0();
        
    const encounterContext = useEncounterContext();
    const loadingContext = useBusyLoadingContext();

    const {id} = useParams();

    useEffect(() => {
        encounterContext.setCreatures([]);
        encounterContext.setEncounterId('');
        encounterContext.setCampaignName('');
        encounterContext.setLocationName('');
        encounterContext.setEncounterName('');
        encounterContext.setPartyId('');
        encounterContext.setSelectedParty('');
        encounterContext.setRoundCounter(0);
        encounterContext.setTurnCounter(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        (async () => {
            try {
                loadingContext.setIsLoading(true);
                
                if (isAuthenticated) {
                    let accessToken = await getAccessTokenSilently({ authorizationParams: { audience: 'https://api.3ncount3r.co.za' } });
                    if (id) {            
                        getEncounterById(accessToken, id).then((x: EncounterViewModel) => {
                            encounterContext.setCreatures(x.creatures ?? []);
                            encounterContext.setEncounterId(x.id);
                            encounterContext.setCampaignName(x.campaign);
                            encounterContext.setLocationName(x.location);
                            encounterContext.setEncounterName(x.name);
                            encounterContext.setPartyId(x.partyId);
                            encounterContext.setSelectedParty(x.selectedParty);
                            encounterContext.setRoundCounter(Math.max(x.roundCount ?? 0, 1));
                            encounterContext.setTurnCounter(Math.max(x.currentTurn ?? 0, 1));
                        });
                    } else {
                        encounterContext.setCreatures([]);
                        encounterContext.setEncounterId('');
                        encounterContext.setCampaignName('');
                        encounterContext.setLocationName('');
                        encounterContext.setEncounterName('');
                        encounterContext.setPartyId('');
                        encounterContext.setSelectedParty('');
                        encounterContext.setRoundCounter(0);
                        encounterContext.setTurnCounter(0);
                    }
                }
            } finally {
                loadingContext.setIsLoading(false);
            }
            
        })();
    }, [isAuthenticated, id]);

    return (<> 
        <HeaderBar leftComponent={<InitiativeHandler />} middleShortComponent={<SaveHandler />} middleLongComponent={<EncounterTitle />} rightComponent={<SearchCreatures />} />
        <Drawer variant='permanent'>
            <EncountersMenu isExpanded={false} />
        </Drawer>
        <SplitThreeLayout longBarComponent={<EncounterCreatures />} topRightComponent={<CreatureDetails />} />
        <EncounterActions />
    </>);
}