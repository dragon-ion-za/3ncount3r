import { Accordion, AccordionDetails, AccordionSummary, Container, Typography } from "@mui/material";
import React, { useEffect } from "react";


import { CreatureTraitViewModel } from "../../../../view-models/shared.view-model";

import { h3Override } from "../../../../styles/details.styles";

interface TraitDetailsProps {
    traits: CreatureTraitViewModel[];
}

export const TraitDetails : React.FC<TraitDetailsProps> = ({traits}) => { 

    useEffect(() => {}, [traits]);

    return (
        <>
            <Accordion>
                <AccordionSummary>
                    <Typography variant="h3" sx={h3Override}>Traits</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {traits.map((trait: CreatureTraitViewModel, index) => 
                        (<Typography key={`trait_${index}`} variant="body1"><strong>{trait.name}: </strong>
                        {trait.entries.map((x: string, innerIndex: number) => <Typography key={`trait_inner_${innerIndex}`} variant="body1" display="inline" component="span">{x}</Typography>)}</Typography>)
                    )}
                </AccordionDetails>
            </Accordion>
        </>
    );
}