import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Drawer, Typography } from "@mui/material";

import SplitThreeLayout from "../../layouts/splitThreeLayout/splitThreeLayout";
import HeaderBar from "../../layouts/headerBar/headerBar";

import EncountersMenu from "../../modules/encounters-menu/encounters-menu";
import { useBusyLoadingContext } from "apps/spa-3ncount3r/src/providers/busy-loading-context/busy-loading.context-provider";
import { getPartyList } from "apps/spa-3ncount3r/src/services/party.service";
import { usePartyContext } from "apps/spa-3ncount3r/src/providers/party-context/party.context-provider";
import { PartyList } from "../../modules/party-list/party-list";
import { PartyDetails } from "../../modules/party-details/party-details";
import SearchCharacters from "../../modules/search-characters/search-characters";

export const PartyPage : React.FC = () => {
    const { getAccessTokenSilently, isAuthenticated } = useAuth0();
    const partyContext = usePartyContext();
        
    const loadingContext = useBusyLoadingContext();

    useEffect(() => {
        (async () => {
            try {
                loadingContext.setIsLoading(true);
                
                if (isAuthenticated) {
                    let accessToken = await getAccessTokenSilently({ authorizationParams: { audience: 'https://api.3ncount3r.co.za' } });
                    let partyList = await getPartyList(accessToken);
                    partyContext.setParties(partyList);
                }
            } finally {
                loadingContext.setIsLoading(false);
            }
            
        })();
    }, [isAuthenticated]);

    return (<> 
        <HeaderBar leftComponent={<></>} middleShortComponent={<></>} middleLongComponent={<></>} rightComponent={<SearchCharacters></SearchCharacters>} />
        <Drawer variant='permanent'>
            <EncountersMenu isExpanded={false} />
        </Drawer>
        <SplitThreeLayout longBarComponent={<PartyList></PartyList>} topRightComponent={<PartyDetails></PartyDetails>} />
    </>);
}