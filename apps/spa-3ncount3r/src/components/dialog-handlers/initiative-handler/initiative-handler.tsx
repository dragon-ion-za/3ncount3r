import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Button, Modal, DialogContent, Tooltip } from "@mui/material";

import { useEncounterContext } from "../../../providers/encounterContext/encounter.context-provider";
import { InitiativeModal } from "../../modals/initiative/initiative.modal";
import { EncounterCreatureViewModel } from "../../../view-models/encounter-creature.view-model";

import { initiativeButtonStyles } from "./initiative-handler.styles";
import { saveEncounter, updateEncounter } from "../../../services/encounter.service";
import { useAuth0 } from "@auth0/auth0-react";
import { useBusyLoadingContext } from "apps/spa-3ncount3r/src/providers/busy-loading-context/busy-loading.context-provider";
import { EncounterViewModel } from "apps/spa-3ncount3r/src/view-models/encounter.view-model";

export const InitiativeHandler : React.FC = () => { 
    const [open, setOpen] = useState(false);
    const encounterContext = useEncounterContext();
    const loadingContext = useBusyLoadingContext();

    const { getAccessTokenSilently } = useAuth0();

    let navigate = useNavigate();

    const handleAccept = async (creatures: EncounterCreatureViewModel[], partyName: string) => {
        try {
            loadingContext.setIsLoading(true);
            let accessToken = await getAccessTokenSilently({ authorizationParams: { audience: 'https://api.3ncount3r.co.za' } });
            let encounter: EncounterViewModel;
            if (encounterContext.encounterId === '') {
                encounter = await saveEncounter(accessToken, {
                    id: '',
                    campaign: encounterContext.campaignName,
                    location: encounterContext.locationName, 
                    name: encounterContext.encounterName,
                    creatures: creatures,
                    selectedParty: partyName,
                    roundCount: encounterContext.roundCounter,
                    currentTurn: encounterContext.turnCounter
                });

                if (encounter !== undefined) {
                    encounterContext.setEncounterId(encounter.id);
                } else {
                    console.log('save failed!!!');
                }
            } else {
                encounter = await updateEncounter(accessToken, {
                    id: encounterContext.encounterId,
                    campaign: encounterContext.campaignName,
                    location: encounterContext.locationName, 
                    name: encounterContext.encounterName,
                    creatures: creatures,
                    selectedParty: partyName,
                    roundCount: encounterContext.roundCounter,
                    currentTurn: encounterContext.turnCounter
                });

                if (encounter === undefined) {
                    console.log('save failed!!!');
                }
            }

            encounterContext.setCreatures(creatures);
            navigate(`/${encounter.id}`);
            toggleModal(false);
        } finally {
            loadingContext.setIsLoading(false);
        }
    };

    const toggleModal = (toggle: boolean) => {
        setOpen(toggle);
    };

    return (
        <>
            {(encounterContext.creatures.length === 0) && (
                <Tooltip title="Add a creature to start the encounter.">
                    <span>
                        <Button 
                            sx={initiativeButtonStyles} variant="contained" 
                            disabled>
                                Roll Initiative!
                        </Button>
                    </span>
                </Tooltip>
                
            )}
            {(encounterContext.creatures.length > 0) && (
                <Button 
                    sx={initiativeButtonStyles} variant="contained" 
                    disabled={encounterContext.creatures.length === 0}
                    onClick={() => { toggleModal(true); }}>
                        Roll Initiative!
                </Button>
            )}

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