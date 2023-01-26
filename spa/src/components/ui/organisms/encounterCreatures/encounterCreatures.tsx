import { DialogContent, Modal, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";

import { useEncounterContext } from "../../../contexts/encounter.context-provider";
import { EncounterCreatureListItem } from "../encounterCreatureListItem/encounterCreatureListItem";

import { EncounterCreatureViewModel } from "../../../../view-models/encounter-creature.view-model";
import { ConfigureCreatureModal } from "../modals/configureCreature.modal";
import { HitpointManagementModal } from "../modals/hitpointManagement.modal";

export const EncounterCreatures : React.FC = () => {
    const [open, setOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState<number>(-1);
    
    const encounterContext = useEncounterContext();

    useEffect(() => {
    }, encounterContext.creatures)

    const doHitpointManagement = (index: number) => {
        setSelectedIndex(index);
        setOpen(true);
    }

    const updateHitpoints = (newHitpoints: number) => {
        let creatures: EncounterCreatureViewModel[] = [...encounterContext.creatures];
        creatures[selectedIndex].currentHitpoints = newHitpoints;
        encounterContext.setCreatures(creatures);
        setOpen(false);
        setSelectedIndex(-1);
    }

    return (
        <>
            <Stack>
                {encounterContext.creatures?.map((creature: EncounterCreatureViewModel, index: number) => (
                    <EncounterCreatureListItem key={creature.id} viewModel={creature} index={index} manageHitpoints={doHitpointManagement} />
                ))}
            </Stack>
            
            <Modal 
              open={open}
              disablePortal>
                <DialogContent>
                    <HitpointManagementModal 
                        maxHitpoints={selectedIndex > -1 ? encounterContext.creatures[selectedIndex].hitpointMax : 0} 
                        currentHitpoints={selectedIndex > -1 ? encounterContext.creatures[selectedIndex].currentHitpoints : 0} 
                        handleAccept={updateHitpoints} handleCancel={() => { setOpen(false); }} />
                </DialogContent>
            </Modal>
        </>
    );
}