import { Stack } from "@mui/material";
import React, { useContext, useEffect } from "react";

import { useEncounterContext } from "../../../contexts/encounter.context-provider";
import { EncounterCreatureListItem } from "../encounterCreatureListItem/encounterCreatureListItem";

import { EncounterCreatureViewModel } from "../../../../view-models/encounter-creature.view-model";

export const EncounterCreatures : React.FC = () => {

    const encounterContext = useEncounterContext();

    useEffect(() => {
    }, encounterContext.creatures)

    return (
        <>
            {
                <Stack>
                    {encounterContext.creatures?.map((creature: EncounterCreatureViewModel) => (
                        <EncounterCreatureListItem key={creature.id} viewModel={creature} />
                    ))}
                </Stack>
            }
        </>
    );
}