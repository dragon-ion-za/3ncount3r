import { Accordion, AccordionDetails, AccordionSummary, Container, List, ListItem, ListItemText, Typography } from "@mui/material";
import React, { SyntheticEvent, useEffect, useState } from "react";

import { RichTextEntry } from "../richTextEntry/richTextEntry";

import { ActionGroupViewModel, SpecialActionViewModel } from "../../../view-models/shared.view-model";

import { actionItemContainerStyle, h3Override } from "../../../styles/details.styles";

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
                                <RichTextEntry key={`${specialAction.name}_heading`} isHeading={true} entryIndex={0} entryText={`${specialAction.name}: `} />
                                {specialAction.items.map(
                                    (x, entryIndex) => {
                                        if (typeof x === 'string') {
                                            return (<RichTextEntry key={`${specialAction.name}_body_${entryIndex}`} entryIndex={entryIndex} entryText={x as string} />);
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
                        specialAction.items.forEach((x, entryIndex) => detailsNodes.push(<RichTextEntry key={`${index}_no-name_${entryIndex}`} entryIndex={entryIndex} entryText={x as string} />))
                    }
                break;

                case 'list': 
                    detailsNodes.push(
                        <List dense={true} sx={{zIndex: -1}}>
                            {specialAction.items.map((x, entryIndex) => {
                                if (typeof x === 'string') {
                                    return (
                                        <ListItem key={`${index}_list-item_${entryIndex}`}>
                                            <ListItemText>
                                                <RichTextEntry key='' entryIndex={entryIndex} entryText={`- ${x}`} />
                                            </ListItemText>
                                        </ListItem>
                                    )                                            
                                } else {
                                    let castAction: SpecialActionViewModel = x;
                                    return (
                                        <ListItem key={`${castAction.name}_container_${entryIndex}`}>
                                            <ListItemText>
                                                <Container sx={actionItemContainerStyle}>
                                                    <RichTextEntry key={`${castAction.name}_heading_${entryIndex}`} isHeading={true} entryIndex={1} entryText={`${castAction.name}: `} />
                                                    {castAction.items.map(
                                                        (innerEntry, innerEntryIndex) => {
                                                            let display: number = 1;

                                                            if (castAction.type === 'list-entry') {
                                                                display = innerEntryIndex;
                                                            } else if (castAction.type === 'list-item-inline') {
                                                                display = 0;
                                                            }

                                                            return (
                                                                <RichTextEntry key={`${castAction.name}_body_${innerEntryIndex}`} entryIndex={display} entryText={innerEntry as string} />
                                                            );
                                                        }
                                                    )}
                                                </Container>
                                            </ListItemText>
                                        </ListItem>
                                    );
                                }
                            })}
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