import React, { useContext, useEffect } from "react";
import SplitThreeLayout from '../ui/organisms/SplitThreeLayout.tsx'
import HeaderBar from '../ui/organisms/HeaderBar.tsx'
import { EncounterCreaturesComponent } from "../ui/organisms/EncounterCreaturesComponent.tsx";
import { EncounterContextProvider } from "../contexts/encounter.context-provider.tsx";

export const EncounterPage : React.FC = () => {

    return (<>
        <EncounterContextProvider>
            <HeaderBar />
            <SplitThreeLayout longBarComponent={<EncounterCreaturesComponent />} />
        </EncounterContextProvider>
    </>);
}