import { Accordion, AccordionDetails, AccordionSummary, Container, Typography } from "@mui/material";
import React, { useEffect } from "react";

import { CreatureTraitViewModel } from "../../../../view-models/shared.view-model";

import { h3Override } from "../../../../styles/details.styles";

interface ActionDetailsProps {
    actions: CreatureTraitViewModel[];
    title: string;
}

export const ActionDetails : React.FC<ActionDetailsProps> = ({actions, title}) => { 

    useEffect(() => {}, [actions]);

    return (
        <>
            <Accordion>
                <AccordionSummary>
                    <Typography variant="h3" sx={h3Override}>{title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {actions.map((trait: CreatureTraitViewModel) => 
                        (<Typography variant="body1">
                            <strong>{trait.name}:</strong> {trait.entries.map(x => (<Typography variant="body1" display="inline">{x}</Typography>))}
                        </Typography>)
                    )}
                </AccordionDetails>
            </Accordion>
        </>
    );
}