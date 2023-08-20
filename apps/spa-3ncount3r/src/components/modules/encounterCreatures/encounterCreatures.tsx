import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { DialogContent, Modal, Stack } from "@mui/material";

import { useEncounterContext } from "../../../providers/encounterContext/encounter.context-provider";
import { EncounterCreatureListItem } from "../encounter-creature-list-item/encounter-creature-list-item";

import { EncounterCreatureViewModel } from "../../../view-models/encounter-creature.view-model";
import { HitpointManagementModal } from "../../modals/hitpoint-management/hitpoint-management.modal";

import { getEncounterById, getEncounterTemplateById } from "../../../services/encounter.service";

export const EncounterCreatures : React.FC = () => {
    const [open, setOpen] = useState(false);
    const [, setIsTemplate] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState<number>(-1);
    
    const encounterContext = useEncounterContext();

    const {id} = useParams();
    const location = useLocation();

    useEffect(() => {
        encounterContext.setCreatures([]);
        encounterContext.setEncounterId('');
        encounterContext.setEncounterName('');
        encounterContext.setSelectedParty('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (id) {
            let segments = location.pathname.split('/');
            
            if (segments[segments.length-1] === 'template') {
                setIsTemplate(true);
                getEncounterTemplateById(id).then(x => {
                    encounterContext.setCreatures(x.creatures);
                    encounterContext.setEncounterId(x.id);
                    encounterContext.setEncounterName(x.name);
                    encounterContext.setSelectedParty('');
                });
            } else {
                getEncounterById(id).then(x => {
                    encounterContext.setCreatures(x.creatures);
                    encounterContext.setEncounterId(x.id);
                    encounterContext.setEncounterName(x.name);
                    encounterContext.setSelectedParty(x.selectedParty);
                });
            }
        } else {
            encounterContext.setCreatures([]);
            encounterContext.setEncounterId('');
            encounterContext.setEncounterName('');
            encounterContext.setSelectedParty('');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
    }, [encounterContext.creatures])

    const doHitpointManagement = () => {
        setOpen(true);
    };

    const updateHitpoints = (newHitpoints: number) => {
        encounterContext.selectedCreature!.currentHitpoints = newHitpoints;
        setOpen(false);
    };

    const handleCreatureSelection = (index: number) => {
        setSelectedIndex(index);
        encounterContext.setSelectedCreatureIndex(index);
    };

    return (
        <>
            <Stack>
                {encounterContext.creatures?.map((creature: EncounterCreatureViewModel, index: number) => (
                    <EncounterCreatureListItem key={creature.id} viewModel={creature} index={index}
                     handleSelection={handleCreatureSelection} manageHitpoints={doHitpointManagement} isSelected={selectedIndex === index} />
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