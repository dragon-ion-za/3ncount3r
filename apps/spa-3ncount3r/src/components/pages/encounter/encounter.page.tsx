import React from "react";

import SplitThreeLayout from '../../ui/organisms/splitThreeLayout/splitThreeLayout'
import HeaderBar from '../../ui/organisms/headerBar/headerBar'
import { EncounterCreatures } from "../../ui/organisms/encounterCreatures/encounterCreatures";
import { EncounterContextProvider } from "../../contexts/encounter.context-provider";
import { CreatureDetails } from "../../ui/organisms/creatureDetails/creatureDetails";

export const EncounterPage : React.FC = () => {

    return (<>
        <EncounterContextProvider>
            <HeaderBar />
            <SplitThreeLayout longBarComponent={<EncounterCreatures />} topRightComponent={<CreatureDetails />} />
        </EncounterContextProvider>
    </>);
}