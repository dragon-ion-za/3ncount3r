import React, { useEffect, useState } from "react";
import { Button, DialogContent, Modal } from "@mui/material";

import { useEncounterContext } from "../../../contexts/encounter.context-provider";
import { SaveEncounterModal } from "../modals/saveEncounter.modal";

import { initiativeButtonStyles } from "../initiativeHandler/initiativeHandler.styles";
import { saveEncounter } from "../../../services/encounter.service";

export const SaveHandler : React.FC = () => { 
    const [open, setOpen] = useState(false);
    const encounterContext = useEncounterContext();

    const handleAccept = async (encounterName: string) => {
        encounterContext.setEncounterName(encounterName);

        let encounterId:string = await saveEncounter(encounterName, encounterContext.creatures, encounterContext.selectedParty);

        if (encounterId !== 'FAILED') {
            encounterContext.setEncounterId(encounterId);
        } else {
            console.log('save failed!!!');
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
                        currentEncounterName={encounterContext.encounterName}
                            handleCancel={() => toggleModal(false)} 
                            handleAccept={handleAccept} />
                    </DialogContent>
            </Modal>
        </>
    );
}