import { Container, Typography } from "@mui/material";
import React, { useEffect } from "react";

import { CreatureTraitViewModel } from "../../../../view-models/shared.view-model";

import { h3Override } from "../../../../styles/details.styles";


interface LegendaryActionDetailsProps {
    legendaryActions: CreatureTraitViewModel[];
    actionCount: number;
}

export const LegendaryActionDetails : React.FC<LegendaryActionDetailsProps> = ({legendaryActions, actionCount}) => { 

    useEffect(() => {}, [legendaryActions]);

    return (
        <>
            <Typography variant="h3" sx={h3Override}>Legendary Actions</Typography>
            <Container>
            <Typography variant="body1">This creature can take {actionCount} legendary actions, choosing from the options below. Only one legendary action can be used at a time and only at the end of another creature's turn. This creature regains spent legendary actions at the start of its turn.</Typography>
            <br />
                {legendaryActions.map((trait: CreatureTraitViewModel) => 
                    (<Typography variant="body1">
                        <strong>{trait.name}:</strong> {trait.entries.map(x => (<Typography variant="body1" display="inline">{x}</Typography>))}
                    </Typography>)
                )}
            </Container>
        </>
    );
}