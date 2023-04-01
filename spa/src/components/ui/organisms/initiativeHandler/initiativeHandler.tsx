import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Button, Modal, DialogContent } from "@mui/material";

import { useEncounterContext } from "../../../contexts/encounter.context-provider";
import { InitiativeModal } from "../modals/initiative.modal";
import { EncounterCreatureViewModel } from "../../../../view-models/encounter-creature.view-model";

import { initiativeButtonStyles } from "./initiativeHandler.styles";
import { saveEncounter, updateEncounter } from "../../../services/encounter.service";

export const InitiativeHandler : React.FC = () => { 
    const [open, setOpen] = useState(false);
    const encounterContext = useEncounterContext();

    let navigate = useNavigate();

    const handleAccept = async (creatures: EncounterCreatureViewModel[], partyName: string) => {
        // Store an 'is new' value before setting anything so that we know if this needs to be a new encounter
        // from a template or an update to an existing encounter
        let isNew: boolean = encounterContext.selectedParty !== undefined || encounterContext.selectedParty !== '';

        encounterContext.setCreatures(creatures);
        encounterContext.setSelectedParty(partyName);

        let encounterId: string = '';
        if (isNew) {
            encounterId = await saveEncounter(encounterContext.encounterName, encounterContext.creatures, encounterContext.selectedParty);

            if (encounterId !== '') {
                encounterContext.setEncounterId(encounterId);
            } else {
                console.log('save failed!!!');
            }
        } else {
            encounterId = await updateEncounter(encounterContext.encounterName, encounterContext.encounterId, encounterContext.creatures, encounterContext.selectedParty);

            if (encounterId === '') {
                console.log('save failed!!!');
            }
        }

        navigate(`/encounter/${encounterId}`);
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