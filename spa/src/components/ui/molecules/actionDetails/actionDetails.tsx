import { Container, Typography } from "@mui/material";
import React, { useEffect } from "react";

import { CreatureTraitViewModel } from "../../../../view-models/shared.view-model";

import { h3Override } from "../../../../styles/details.styles";

interface ActionDetailsProps {
    actions: CreatureTraitViewModel[];
}

export const ActionDetails : React.FC<ActionDetailsProps> = ({actions}) => { 

    useEffect(() => {}, [actions]);

    return (
        <>
            <Typography variant="h3" sx={h3Override}>Actions</Typography>
            <Container>
                {actions.map((trait: CreatureTraitViewModel) => 
                    (<Typography variant="body1">
                        <strong>{trait.name}:</strong> {trait.entries.map(x => (<Typography variant="body1" display="inline">{x}</Typography>))}
                    </Typography>)
                )}
            </Container>
        </>
    );
}