import React, { useEffect, useState } from "react";
import Grid from '@mui/material/Unstable_Grid2';
import { KeyValuePair } from "../../../../view-models/shared.view-model";
import { Stack, Typography } from "@mui/material";
import { calculateAbilityScoreModifier } from "../../../services/creature.service";

export interface AttributeDetailsProps{
    attributeList: KeyValuePair<string, number>[];
}

export const AttributeDetails : React.FC<AttributeDetailsProps> = ({attributeList}) => { 
    const [itemSize, setItemSize] = useState<number>(0);

    useEffect(() => {
        if (attributeList.length > 0) {
            setItemSize(12/attributeList.length);
        }
    },[attributeList]);

    const buildAttributeDetails = (attributeValue: number): string => {
        let modifier: number = calculateAbilityScoreModifier(attributeValue);
        return `${attributeValue} (${modifier > 0 ? '+' : ''}${modifier})`;
    }

    return (
        <Grid container>
            {attributeList.map(attr => (
                <Grid key={attr.key} xs={itemSize}>
                    <Stack>
                        <Typography variant="subtitle2">{attr.key}</Typography>
                        <Typography variant="subtitle2">{buildAttributeDetails(attr.value)}</Typography>
                    </Stack>
                </Grid>
            ))}
        </Grid>
    );
}