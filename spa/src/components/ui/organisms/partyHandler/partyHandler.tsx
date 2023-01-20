import React, { useState } from "react";
import { Button, Modal, DialogContent } from "@mui/material";

import { useEncounterContext } from "../../../contexts/encounter.context-provider";
import { EncounterCreatureViewModel } from "../../../../view-models/encounter-creature.view-model";

import { initiativeButtonStyles } from "../initiativeHandler/initiativeHandler.styles";
import { PartyExplorerModal } from "../modals/partyExplorer.modal";

export const PartyHandler : React.FC = () => { 
    const [open, setOpen] = useState(false);
    const encounterContext = useEncounterContext();

    const handleSelectedParty = (partyName: string) => {
        if (!partyName) {
            
        }
    };

    const toggleModal = (toggle: boolean) => {
        setOpen(toggle);
    };

    return (
        <>
            <Button 
                sx={initiativeButtonStyles} variant="contained"
                onClick={() => { toggleModal(true); }}>
                    Add Party
            </Button>

            <Modal 
                open={open}
                disablePortal>
                    <DialogContent>
                        <PartyExplorerModal
                            handleCancel={() => toggleModal(false)} 
                            handleAccept={handleSelectedParty} />
                    </DialogContent>
            </Modal>
        </>
    );
};