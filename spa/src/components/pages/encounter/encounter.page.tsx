import React from "react";
import SplitThreeLayout from '../../ui/organisms/splitThreeLayout/splitThreeLayout.tsx'
import HeaderBar from '../../ui/organisms/headerBar/headerBar.tsx'
import { EncounterCreatures } from "../../ui/organisms/encounterCreatures/encounterCreatures.tsx";
import { EncounterContextProvider } from "../../contexts/encounter.context-provider.tsx";
import { CreatureDetails } from "../../ui/organisms/creatureDetails/creatureDetails.tsx";

export const EncounterPage : React.FC = () => {

    return (<>
        <EncounterContextProvider>
            <HeaderBar />
            <SplitThreeLayout longBarComponent={<EncounterCreatures />} topRightComponent={<CreatureDetails />} />
        </EncounterContextProvider>
    </>);
}