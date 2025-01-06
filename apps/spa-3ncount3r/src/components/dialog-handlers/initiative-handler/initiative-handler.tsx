import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Button, Modal, DialogContent } from "@mui/material";

import { useEncounterContext } from "../../../providers/encounterContext/encounter.context-provider";
import { InitiativeModal } from "../../modals/initiative/initiative.modal";
import { EncounterCreatureViewModel } from "../../../view-models/encounter-creature.view-model";

import { initiativeButtonStyles } from "./initiative-handler.styles";
import { saveEncounter, updateEncounter } from "../../../services/encounter.service";
import { useAuth0 } from "@auth0/auth0-react";

export const InitiativeHandler : React.FC = () => { 
    const [open, setOpen] = useState(false);
    const encounterContext = useEncounterContext();
    const { getAccessTokenSilently } = useAuth0();

    let navigate = useNavigate();

    const handleAccept = async (creatures: EncounterCreatureViewModel[], partyName: string) => {
        // Store an 'is new' value before setting anything so that we know if this needs to be a new encounter
        // from a template or an update to an existing encounter
        let isNew: boolean = !encounterContext.selectedParty;

        let accessToken = await getAccessTokenSilently({ authorizationParams: { audience: 'https://api.3ncount3r.co.za' } });
        let encounterId: string = '';
        if (isNew) {
            encounterId = await saveEncounter(accessToken, {
                id: '',
                campaign: encounterContext.campaignName,
                location: encounterContext.locationName, 
                name: encounterContext.encounterName,
                creatures: creatures,
                selectedParty: partyName,
                roundCount: encounterContext.roundCounter,
                currentTurn: encounterContext.turnCounter
            });

            if (encounterId !== '') {
                encounterContext.setEncounterId(encounterId);
            } else {
                console.log('save failed!!!');
            }
        } else {
            encounterId = await updateEncounter(accessToken, {
                id: encounterContext.encounterId,
                campaign: encounterContext.campaignName,
                location: encounterContext.locationName, 
                name: encounterContext.encounterName,
                creatures: creatures,
                selectedParty: partyName,
                roundCount: encounterContext.roundCounter,
                currentTurn: encounterContext.turnCounter
            });

            if (encounterId === '') {
                console.log('save failed!!!');
            }
        }

        encounterContext.setCreatures(creatures);
        navigate(`/${encounterId}`);
        toggleModal(false);
    };

    const toggleModal = (toggle: boolean) => {
        setOpen(toggle);
    };

    return (
        <>
            <Button 
                sx={initiativeButtonStyles} variant="contained" 
                disabled={encounterContext.creatures.length === 0}
                onClick={() => { toggleModal(true); }}>
                    Roll Initiative!
            </Button>

            <Modal 
                open={open}
                disablePortal>
                    <DialogContent>
                        <InitiativeModal
                            creaturesList={encounterContext.creatures} 
                            partyName={encounterContext.selectedParty}
                            handleCancel={() => toggleModal(false)} 
                            handleAccept={handleAccept} />
                    </DialogContent>
            </Modal>
        </>
    );
};