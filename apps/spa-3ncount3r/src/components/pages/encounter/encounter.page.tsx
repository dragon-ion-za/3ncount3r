import React from "react";

import SplitThreeLayout from "../../layouts/splitThreeLayout/splitThreeLayout";
import HeaderBar from '../../ui/organisms/headerBar/headerBar'

import { EncounterCreatures } from "../../modules/encounterCreatures/encounterCreatures";
import { CreatureDetails } from "../../modules/creatureDetails/creatureDetails";
import { EncounterContextProvider } from "apps/spa-3ncount3r/src/providers/encounterContext/encounter.context-provider";


export const EncounterPage : React.FC = () => {

    return (<>
        <EncounterContextProvider>
            <HeaderBar />
            <SplitThreeLayout longBarComponent={<EncounterCreatures />} topRightComponent={<CreatureDetails />} />
        </EncounterContextProvider>
    </>);
}