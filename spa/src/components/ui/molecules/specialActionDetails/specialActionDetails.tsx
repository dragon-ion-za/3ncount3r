import { Container, List, ListItem, ListItemText, Typography } from "@mui/material";
import React, { useEffect } from "react";

import { SpecialActionViewModel } from "../../../../view-models/creature.view-model";

import { h3Override } from "../../../../styles/details.styles";

interface SpecialActionDetailsProps {
    specialActions: SpecialActionViewModel[];
    title: string;
}

export const SpecialActionDetails : React.FC<SpecialActionDetailsProps> = ({specialActions, title}) => { 

    useEffect(() => {}, [specialActions]);

    return (
        <>
            <Typography variant="h3" sx={h3Override}>{title}</Typography>
            <Container>
                {specialActions.map((specialAction: SpecialActionViewModel) => {
                    switch(specialAction.type) {
                        case 'additional':
                        case 'entry': return specialAction.items.map(x => <Typography variant="body1">{x}</Typography>);

                        case 'list': return (<List dense={true} sx={{zIndex: -1}}>
                                                <ListItem>
                                                    <ListItemText>
                                                        {specialAction.items.map(x => {return (<Typography variant="body1">{`- ${x}`}</Typography>)})}
                                                    </ListItemText>
                                                </ListItem>
                                            </List>);
                    }

                    return (<></>);
                }
                )}
            </Container>
        </>
    );
}