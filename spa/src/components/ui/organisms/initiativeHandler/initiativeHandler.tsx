import React, { useState } from "react";
import { Button, Modal, DialogContent } from "@mui/material";

import { useEncounterContext } from "../../../contexts/encounter.context-provider";
import { InitiativeModal } from "../modals/initiative.modal";
import { EncounterCreatureViewModel } from "../../../../view-models/encounter-creature.view-model";

import { initiativeButtonStyles } from "./initiativeHandler.styles";

export const InitiativeHandler : React.FC = () => { 
    const [open, setOpen] = useState(false);
    const encounterContext = useEncounterContext();

    const handleAccept = (creatures: EncounterCreatureViewModel[], partyName: string) => {
        encounterContext.setCreatures(creatures);
        encounterContext.setSelectedParty(partyName);
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