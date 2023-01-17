import { Container, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { h3Override } from "../../../../styles/details.styles.ts";
import { CreatureTraitViewModel } from "../../../../view-models/creature.view-model.ts";

interface TraitDetailsProps {
    traits: CreatureTraitViewModel[];
}

export const TraitDetails : React.FC<TraitDetailsProps> = ({traits}) => { 

    useEffect(() => {}, [traits]);

    return (
        <>
            <Typography variant="h3" sx={h3Override}>Traits</Typography>
            <Container>
                {traits.map((trait: CreatureTraitViewModel, index) => 
                    (<Typography key={`trait_${index}`} variant="body1"><strong>{trait.name}: </strong>
                    {trait.entries.map((x, innerIndex) => <Typography key={`trait_inner_${innerIndex}`} variant="body1" display="inline" component="span">{x}</Typography>)}</Typography>)
                )}
            </Container>
        </>
    );
}