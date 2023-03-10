import React, { useState } from "react";
import { Button, DialogContent, IconButton, Modal } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router";
import { Download, FileOpen } from "@mui/icons-material";
import { LoadEncounterModal } from "../modals/loadEncounter.modal";
import { EncounterViewModel } from "../../../../view-models/encounter.view-model";

interface EncountersMenuProps {
    isExpanded: boolean;
}

const EncountersMenu : React.FC<EncountersMenuProps> = (props: EncountersMenuProps) => {
    const [open, setOpen] = useState(false);

    let navigate = useNavigate(); 
    const routeChange = (target: string) => { 
        let path = target; 
        navigate(path);
        return;
    }

    const toggleModal = (toggle: boolean) => {
        setOpen(toggle);
    };

    const handleAccept = (encounterId: string) => {
        toggleModal(false);
        routeChange(`encounter/${encounterId}`);
    }

    return (
        <>
            {!props.isExpanded ? 
                <>
                    <IconButton aria-label="add" onClick={() => {routeChange('encounter'); return;}}>
                        <AddIcon />
                    </IconButton>
                    <IconButton aria-label="add" onClick={() => {toggleModal(true)}}>
                        <Download />
                    </IconButton>
                </>
            : <>
                <Button variant="outlined" startIcon={<AddIcon />} onClick={() => {routeChange('encounter'); return;}}>Add Encounter</Button>
            </>}

            <Modal 
                open={open}
                disablePortal>
                    <DialogContent>
                        <LoadEncounterModal
                            handleCancel={() => toggleModal(false)} 
                            handleAccept={handleAccept} />
                    </DialogContent>
            </Modal>
        </>
    );
};

export default EncountersMenu;