import React, { useEffect, useState } from "react";
import { Button, DialogContent, Modal } from "@mui/material";

import { useEncounterContext } from "../../../providers/encounterContext/encounter.context-provider";
import { SaveEncounterModal } from "../../modals/save-encounter/save-encounter.modal";

import { initiativeButtonStyles } from "../initiative-handler/initiative-handler.styles";
import { saveEncounter, updateEncounter } from "../../../services/encounter.service";
import { useAuth0 } from "@auth0/auth0-react";

export const SaveHandler : React.FC = () => { 
    const [open, setOpen] = useState(false);
    const encounterContext = useEncounterContext();
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {}, [encounterContext.encounterId]);

    const handleAccept = async (campaignName: string, locationName: string, encounterName: string) => {
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

            await updateEncounter(accessToken, encounterName, encounterContext.encounterId, encounterContext.creatures, 
                encounterContext.selectedParty, encounterContext.roundCounter, encounterContext.turnCounter);

            if (encounterId === '') {
                console.log('save failed!!!');
            }
        }
        
        toggleModal(false)
    };

    const toggleModal = (toggle: boolean) => {
        setOpen(toggle);
    };
    
    return (
        <>
            <Button 
                sx={initiativeButtonStyles} variant="contained"
                onClick={() => { toggleModal(true); }}>
                    Save
            </Button>

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