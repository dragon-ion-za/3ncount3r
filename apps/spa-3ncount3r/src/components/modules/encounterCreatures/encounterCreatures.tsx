import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { Badge, DialogContent, Divider, Modal, Stack } from "@mui/material";

import { useEncounterContext } from "../../../providers/encounterContext/encounter.context-provider";
import { EncounterCreatureListItem } from "../encounter-creature-list-item/encounter-creature-list-item";

import { EncounterCreatureViewModel } from "../../../view-models/encounter-creature.view-model";
import { HitpointManagementModal } from "../../modals/hitpoint-management/hitpoint-management.modal";

import { getEncounterById, getEncounterTemplateById } from "../../../services/encounter.service";
import { EncounterViewModel } from "apps/spa-3ncount3r/src/view-models/encounter.view-model";

export const EncounterCreatures : React.FC = () => {
    const [open, setOpen] = useState(false);
    const [, setIsTemplate] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState<number>(-1);
    const [activeCreatures, setActiveCreatures] = useState<EncounterCreatureViewModel[]>([]);
    
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
                getEncounterTemplateById(id).then((x: EncounterViewModel) => {
                    encounterContext.setCreatures(x.creatures);
                    encounterContext.setEncounterId(x.id);
                    encounterContext.setEncounterName(x.name);
                    encounterContext.setSelectedParty('');
                    encounterContext.setRoundCounter(0);
                    encounterContext.setTurnCounter(0);
                });
            } else {
                getEncounterById(id).then((x: EncounterViewModel) => {
                    encounterContext.setCreatures(x.creatures);
                    encounterContext.setEncounterId(x.id);
                    encounterContext.setEncounterName(x.name);
                    encounterContext.setSelectedParty(x.selectedParty);
                    encounterContext.setRoundCounter(Math.max(x.roundCount, 1));
                    encounterContext.setTurnCounter(Math.max(x.currentTurn, 1));
                });
            }
        } else {
            encounterContext.setCreatures([]);
            encounterContext.setEncounterId('');
            encounterContext.setEncounterName('');
            encounterContext.setSelectedParty('');
            encounterContext.setRoundCounter(0);
            encounterContext.setTurnCounter(0);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        setActiveCreatures(encounterContext.creatures?.filter(x => x.isActive));
    }, [encounterContext.creatures])

    const doHitpointManagement = () => {
        setOpen(true);
    };

    const updateHitpoints = (newHitpoints: number) => {
        encounterContext.getSelectedCreature().currentHitpoints = newHitpoints;
        setOpen(false);
    };

    const handleCreatureSelection = (index: number) => {
        setSelectedIndex(index);
        encounterContext.setSelectedCreatureIndex(index);
    };

    return (
        <>
            <Stack>
                {activeCreatures?.filter(x => x.isActive).map((creature: EncounterCreatureViewModel, index: number) => (
                    <Badge color="secondary" variant='dot' invisible={index === (encounterContext.turnCounter - 1) ? false : true} component={"div"}>
                        <EncounterCreatureListItem key={creature.id} viewModel={creature} index={encounterContext.creatures.indexOf(activeCreatures[index])}
                            handleSelection={handleCreatureSelection} manageHitpoints={doHitpointManagement} isSelected={selectedIndex === index} />
                    </Badge>
                ))}
            </Stack>
            
            <Stack>
                
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