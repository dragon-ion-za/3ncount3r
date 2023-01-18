import React from "react";
import { Button, IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router";

interface EncountersMenuProps {
    isExpanded: boolean;
}

const EncountersMenu : React.FC<EncountersMenuProps> = (props: EncountersMenuProps) => {

    let navigate = useNavigate(); 
    const routeChange = (target: string) => { 
        let path = target; 
        navigate(path);
        return;
    }

    return (!props.isExpanded ? 
        <>
            <IconButton aria-label="add" onClick={() => {routeChange('encounter'); return;}}>
                <AddIcon />
            </IconButton>
        </>
    : <>
        <Button variant="outlined" startIcon={<AddIcon />} onClick={() => {routeChange('encounter'); return;}}>Add Encounter</Button>
    </>);
};

export default EncountersMenu;