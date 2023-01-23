import { Accordion, AccordionDetails, AccordionSummary, Container, Typography } from "@mui/material";
import React, { useEffect } from "react";

import { CreatureTraitViewModel } from "../../../../view-models/shared.view-model";

import { actionItemContainerStyle, h3Override } from "../../../../styles/details.styles";

interface ActionDetailsProps {
    actions: CreatureTraitViewModel[];
    title: string;
}

export const ActionDetails : React.FC<ActionDetailsProps> = ({actions, title}) => { 

    useEffect(() => {console.log(actions)}, [actions]);

    return (
        <>
            <Accordion>
                <AccordionSummary>
                    <Typography variant="h3" sx={h3Override}>{title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {actions.map((trait: CreatureTraitViewModel) => 
                        (
                            <Container sx={actionItemContainerStyle}>
                                <Typography variant="body1" display='inline'><strong>{trait.name}:</strong></Typography>
                                {trait.entries.map((x, index) => (<Typography variant="body1" display={index === 0 ? 'inline' : 'block'}>{x}</Typography>))}
                            </Container>
                        )
                    )}
                </AccordionDetails>
            </Accordion>
        </>
    );
}