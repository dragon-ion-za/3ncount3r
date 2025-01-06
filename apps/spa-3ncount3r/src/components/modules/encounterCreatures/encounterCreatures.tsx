import React, { useEffect, useState } from "react";
import { Badge, DialogContent, Modal, Stack } from "@mui/material";

import { useEncounterContext } from "../../../providers/encounterContext/encounter.context-provider";
import { EncounterCreatureListItem } from "../encounter-creature-list-item/encounter-creature-list-item";

import { EncounterCreatureViewModel } from "../../../view-models/encounter-creature.view-model";
import { HitpointManagementModal } from "../../modals/hitpoint-management/hitpoint-management.modal";

export const EncounterCreatures : React.FC = () => {
    const [open, setOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState<number>(-1);
    const [activeCreatures, setActiveCreatures] = useState<EncounterCreatureViewModel[]>([]);
    
    const encounterContext = useEncounterContext();

    useEffect(() => {
        setActiveCreatures(encounterContext.creatures?.filter(x => x.isActive));
    }, [encounterContext])

    const doHitpointManagement = () => {
        setOpen(true);
    };

    const updateHitpoints = (newHitpoints: number) => {
        encounterContext.getSelectedCreature().currentHitpoints = newHitpoints;
        setOpen(false);
    };

    const handleCreatureSelection = (index: number) => {
        let contextIndex = encounterContext.creatures.indexOf(activeCreatures[index]);
        setSelectedIndex(contextIndex);
        encounterContext.setSelectedCreatureIndex(contextIndex);
    };

    return (
        <>
            <Stack sx={{maxHeight: '90vh', overflowY: 'auto', overflowX: 'hidden'}}>
                {activeCreatures.map((creature: EncounterCreatureViewModel, index: number) => (
                    <Badge color="secondary" variant='dot' invisible={index === (encounterContext.turnCounter - 1) ? false : true} component={"div"}>
                        <EncounterCreatureListItem key={creature.id} viewModel={creature} index={index}
                            handleSelection={handleCreatureSelection} manageHitpoints={doHitpointManagement} 
                            isSelected={activeCreatures.indexOf(encounterContext.creatures[selectedIndex]) === index} />
                    </Badge>
                ))}
            </Stack>
            
            <Modal 
              open={open}
              disablePortal>
                <DialogContent>
                    {selectedIndex > -1 && 
                        <HitpointManagementModal 
                            maxHitpoints={encounterContext.creatures[selectedIndex]?.hitpointMax ?? 0} 
                            currentHitpoints={encounterContext.creatures[selectedIndex]?.currentHitpoints ?? 0} 
                            handleAccept={updateHitpoints} handleCancel={() => { setOpen(false); }} />
                    }
                </DialogContent>
            </Modal>
        </>
    );
}