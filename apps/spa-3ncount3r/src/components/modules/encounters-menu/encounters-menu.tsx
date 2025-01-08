import React, { useState } from "react";
import { DialogContent, IconButton, Modal } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router";
import { Download } from "@mui/icons-material";
import { LoadEncounterModal } from "../../modals/load-encounter/load-encounter.modal";
import { useAuth0 } from "@auth0/auth0-react";

interface EncountersMenuProps {
    isExpanded: boolean;
}

const EncountersMenu : React.FC<EncountersMenuProps> = (props: EncountersMenuProps) => {
    const [open, setOpen] = useState(false);
    const { isAuthenticated } = useAuth0();

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
        routeChange(`/${encounterId}`);
    }

    return (
        <>
            <IconButton aria-label="add" onClick={() => {routeChange('/'); return;}}>
                <AddIcon />
            </IconButton>
            {isAuthenticated && (
                <IconButton aria-label="add" onClick={() => {toggleModal(true)}}>
                    <Download />
                </IconButton>
            )}
            
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