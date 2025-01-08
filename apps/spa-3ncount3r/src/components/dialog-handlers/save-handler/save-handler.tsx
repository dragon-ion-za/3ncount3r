import React, { useEffect, useState } from "react";
import { Button, DialogContent, Modal, Tooltip } from "@mui/material";

import { useEncounterContext } from "../../../providers/encounterContext/encounter.context-provider";
import { SaveEncounterModal } from "../../modals/save-encounter/save-encounter.modal";

import { initiativeButtonStyles } from "../initiative-handler/initiative-handler.styles";
import { saveEncounter, updateEncounter } from "../../../services/encounter.service";
import { useAuth0 } from "@auth0/auth0-react";
import { useBusyLoadingContext } from "apps/spa-3ncount3r/src/providers/busy-loading-context/busy-loading.context-provider";

export const SaveHandler : React.FC = () => { 
    const [open, setOpen] = useState(false);
    const encounterContext = useEncounterContext();
    const loadingContext = useBusyLoadingContext();

    const { getAccessTokenSilently, isAuthenticated } = useAuth0();

    useEffect(() => {}, [encounterContext.encounterId]);

    const handleAccept = async (campaignName: string, locationName: string, encounterName: string) => {
        try {
            loadingContext.setIsLoading(true);
            let accessToken = await getAccessTokenSilently({ authorizationParams: { audience: 'https://api.3ncount3r.co.za' } });
            encounterContext.setCampaignName(campaignName);
            encounterContext.setLocationName(locationName);
            encounterContext.setEncounterName(encounterName);
    
            if (encounterContext.encounterId === '') {
                let encounterId: string = '';
                
                encounterId = await saveEncounter(accessToken, {
                    id: '',
                    campaign: campaignName,
                    location: locationName, 
                    name: encounterName,
                    creatures: encounterContext.creatures,
                    selectedParty: encounterContext.selectedParty,
                    roundCount: Math.max(encounterContext.roundCounter, 1),
                    currentTurn: Math.max(encounterContext.turnCounter, 1)
                });
    
                if (encounterId !== '') {
                    encounterContext.setEncounterId(encounterId);
                } else {
                    console.log('save failed!!!');
                }
            } else {
                let encounterId: string = '';
    
                await updateEncounter(accessToken, {
                    id: encounterContext.encounterId,
                    campaign: campaignName,
                    location: locationName, 
                    name: encounterName,
                    creatures: encounterContext.creatures,
                    selectedParty: encounterContext.selectedParty,
                    roundCount: Math.max(encounterContext.roundCounter, 1),
                    currentTurn: Math.max(encounterContext.turnCounter, 1)
                });
    
                if (encounterId === '') {
                    console.log('save failed!!!');
                }
            }
            
            toggleModal(false)
        } finally {
            loadingContext.setIsLoading(false);
        }
    };

    const toggleModal = (toggle: boolean) => {
        setOpen(toggle);
    };
    
    return (
        <>
            {isAuthenticated && (
                <Button 
                    sx={initiativeButtonStyles} variant="contained"
                    onClick={() => { toggleModal(true); }}>
                        Save
                </Button>
            )}
            
            {!isAuthenticated && (
                <Tooltip title="Please log in to save the encounter.">
                    <span>
                        <Button 
                            sx={initiativeButtonStyles} variant="contained"
                            onClick={() => { toggleModal(true); }}>
                                Save
                        </Button>
                    </span>
                </Tooltip>
                
            )}

            <Modal 
                open={open}
                disablePortal>
                    <DialogContent>
                        <SaveEncounterModal
                            currentCampaignName={encounterContext.campaignName}
                            currentLocationName={encounterContext.locationName}
                            currentEncounterName={encounterContext.encounterName}
                            handleCancel={() => toggleModal(false)} 
                            handleAccept={handleAccept} />
                    </DialogContent>
            </Modal>
        </>
    );
}