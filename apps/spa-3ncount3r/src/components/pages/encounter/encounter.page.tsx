import React from "react";

import SplitThreeLayout from "../../layouts/splitThreeLayout/splitThreeLayout";
import HeaderBar from "../../layouts/headerBar/headerBar";

import { EncounterContextProvider } from "apps/spa-3ncount3r/src/providers/encounterContext/encounter.context-provider";

import { EncounterCreatures } from "../../modules/encounterCreatures/encounterCreatures";
import { CreatureDetails } from "../../modules/creatureDetails/creatureDetails";
import { InitiativeHandler } from "../../dialog-handlers/initiative-handler/initiative-handler";
import { SaveHandler } from "../../dialog-handlers/save-handler/save-handler";
import SearchCreatures from "../../modules/search-creatures/search-creatures";
import { Drawer } from "@mui/material";
import EncountersMenu from "../../modules/encounters-menu/encounters-menu";
import EncounterActions from "../../modules/encounter-actions/encounter-actions";

export const EncounterPage : React.FC = () => {

    return (<> 
        <EncounterContextProvider>
            <HeaderBar leftComponent={<InitiativeHandler />} middleShortComponent={<SaveHandler />} middleLongComponent={<></>} rightComponent={<SearchCreatures />} />
            <Drawer variant='permanent'>
                <EncountersMenu isExpanded={false} />
            </Drawer>
            <SplitThreeLayout longBarComponent={<EncounterCreatures />} topRightComponent={<CreatureDetails />} />
            <EncounterActions />            
        </EncounterContextProvider>
    </>);
}