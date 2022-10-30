import { Button, IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import React from "react";
import { useNavigate } from "react-router";

interface EncountersMenuProps {
    isExpanded: boolean;
}

const EncountersMenu : React.FC<EncountersMenuProps> = (props: EncountersMenuProps) => {

    let navigate = useNavigate(); 
    const routeChange = (target: string) =>{ 
        let path = target; 
        navigate(path);
        return;
    }

    return (!props.isExpanded ? 
        <>
            <IconButton aria-label="delete">
                <AddIcon />
            </IconButton>
        </>
    : <>
        <Button variant="outlined" startIcon={<AddIcon />} onClick={() => {routeChange('encounter'); return;}}>Add Encounter</Button>
    </>);
};

export default EncountersMenu;