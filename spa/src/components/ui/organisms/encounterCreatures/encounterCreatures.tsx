import { Stack } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { EncounterContextModel } from '../../../contexts/encounter.context-model.ts';
import { CreatureViewModel } from '../../../../view-models/creature.view-model.ts';
import { EncounterContext } from "../../../contexts/encounter.context-provider.tsx";
import { EncounterCreatureListItem } from "../encounterCreatureListItem/encounterCreatureListItem.tsx";

export const EncounterCreatures : React.FC = () => {

    const encounterContext = useContext<EncounterContextModel>(EncounterContext);

    useEffect(() => {
        console.log(encounterContext);
    }, encounterContext.encounterState.creatures)

    return (
        <>
            {
                <Stack>
                    {encounterContext.encounterState?.creatures?.map((creature: CreatureViewModel) => (
                        <EncounterCreatureListItem key={creature.id} viewModel={creature} />
                    ))}
                </Stack>
            }
        </>
    );
}