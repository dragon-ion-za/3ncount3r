import { Accordion, AccordionDetails, AccordionSummary, Container, List, ListItem, ListItemText, Typography } from "@mui/material";
import React, { SyntheticEvent, useEffect, useState } from "react";

import { ActionGroupViewModel, SpecialActionViewModel } from "../../../../view-models/shared.view-model";

import { actionItemContainerStyle, h3Override } from "../../../../styles/details.styles";

interface ActionDetailsProps {
    actionGroups: ActionGroupViewModel[];
}

export const ActionDetails : React.FC<ActionDetailsProps> = ({actionGroups}) => { 
    const [currentPanel, setCurrentPanel] = useState<string>('');

    useEffect(() => {}, [actionGroups]);

    const renderDetails = (actions: SpecialActionViewModel[]): JSX.Element[] => {
        let detailsNodes: JSX.Element[] = [];
        actions.forEach((specialAction: SpecialActionViewModel, index) => {
            switch(specialAction.type) {
                case 'additional':
                case 'entry':
                    if (specialAction.name) {
                        detailsNodes.push(
                            <Container sx={actionItemContainerStyle}>
                                <Typography variant="body1" display='inline'><strong>{specialAction.name}: </strong></Typography>
                                {specialAction.items.map(
                                    (x, entryIndex) => {
                                        if (typeof x === 'string') {
                                            return (<Typography key={`${specialAction.name}_body_${entryIndex}`} variant="body1" display={entryIndex === 0 ? 'inline' : 'block'}>{x as string}</Typography>);
                                        }
                                        else {
                                            let castAction: SpecialActionViewModel = x;
                                            return (renderDetails([castAction]));
                                        }
                                    }
                                )}
                            </Container>
                        );
                    } else {
                        specialAction.items.forEach((x, entryIndex) => detailsNodes.push(<Typography key={`${index}_no-name_${entryIndex}`} variant="body1">{x as string}</Typography>))
                    }
                break;

                case 'list': 
                    detailsNodes.push(
                        <List dense={true} sx={{zIndex: -1}}>
                            <ListItem>
                                <ListItemText>
                                    {specialAction.items.map((x, entryIndex) => {
                                        if (typeof x === 'string') {
                                            return (<Typography key={`${index}_list-item_${entryIndex}`} variant="body1">{`- ${x}`}</Typography>)
                                        } else {
                                            let castAction: SpecialActionViewModel = x;
                                            return (
                                                <Container key={`${castAction.name}_container_${entryIndex}`} sx={actionItemContainerStyle}>
                                                    <Typography variant="body1" display='inline'><strong>{castAction.name}: </strong></Typography>
                                                    {castAction.items.map(
                                                        (innerEntry, innerEntryIndex) => {
                                                            let display: string = 'block';

                                                            if (castAction.type === 'list-entry') {
                                                                display = innerEntryIndex === 0 ? 'inline' : 'block';
                                                            }

                                                            return (
                                                                <Typography variant="body1" display={display}>{innerEntry as string}</Typography>
                                                            );
                                                        }
                                                    )}
                                                </Container>
                                            );
                                        }
                                    })}
                                </ListItemText>
                            </ListItem>
                        </List>
                    );
                break;
            }

            return (<></>);
        });

        return detailsNodes;
    };

    const togglePanel = (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
        setCurrentPanel(isExpanded ? panel : '');
    }

    return (
        <>
            {actionGroups && (actionGroups.map((actionGroup) => {
                if (actionGroup.items.length === 0) return (<></>);

                return (
                    <Accordion key={actionGroup.name} expanded={currentPanel === actionGroup.name} onChange={togglePanel(actionGroup.name)}>
                        <AccordionSummary>
                            <Typography variant="h3" sx={h3Override}>{actionGroup.name}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {renderDetails(actionGroup.items)}
                        </AccordionDetails>
                    </Accordion>
                );
            }))}
        </>
    );
}