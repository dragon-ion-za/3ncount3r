import React, { useEffect, useState } from "react";
import { Button, DialogContent, Modal } from "@mui/material";

import { useEncounterContext } from "../../../providers/encounterContext/encounter.context-provider";
import { SaveEncounterModal } from "../../modals/save-encounter/save-encounter.modal";

import { initiativeButtonStyles } from "../initiative-handler/initiative-handler.styles";
import { saveEncounter, saveEncounterTemplate, updateEncounter, updateEncounterTemplate } from "../../../services/encounter.service";

export const SaveHandler : React.FC = () => { 
    const [open, setOpen] = useState(false);
    const encounterContext = useEncounterContext();

    useEffect(() => {}, [encounterContext.encounterId]);

    const handleAccept = async (encounterName: string) => {
        encounterContext.setEncounterName(encounterName);

        if (encounterContext.encounterId === '') {
            let encounterId: string = '';
            
            if (encounterContext.selectedParty === undefined || encounterContext.selectedParty === '') {
                await saveEncounterTemplate(encounterName, encounterContext.creatures);
            } else {
                await saveEncounter(encounterName, encounterContext.creatures, encounterContext.selectedParty);
            }

            if (encounterId !== '') {
                encounterContext.setEncounterId(encounterId);
            } else {
                console.log('save failed!!!');
            }
        } else {
            let encounterId: string = '';

            if (encounterContext.selectedParty === undefined || encounterContext.selectedParty === '') {
                await updateEncounterTemplate(encounterName, encounterContext.encounterId, encounterContext.creatures);
            } else {
                await updateEncounter(encounterName, encounterContext.encounterId, encounterContext.creatures, encounterContext.selectedParty);
            }

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
                            currentEncounterName={encounterContext.encounterName}
                            handleCancel={() => toggleModal(false)} 
                            handleAccept={handleAccept} />
                    </DialogContent>
            </Modal>
        </>
    );
}