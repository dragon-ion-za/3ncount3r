import { createContext, useState } from "react";
import { EncounterContextModel } from "./encounter.context-model.ts";

export const EncounterContext = createContext<EncounterContextModel>(new EncounterContextModel());

export const EncounterContextProvider = ({children}) => {

    const [encounterState, setEncounterState] = useState<EncounterContextModel>(new EncounterContextModel());
    const controls = {
        encounterState,
        setEncounterState
    }

    return (<>
        <EncounterContext.Provider value={controls}>
            {children}
        </EncounterContext.Provider>        
    </>);
}