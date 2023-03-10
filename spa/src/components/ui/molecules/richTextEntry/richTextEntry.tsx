import { Typography } from "@mui/material";
import React from "react";
import { DamageConditionType } from "../damageConditionType/damageConditionType";
import { DiceIcon } from "../diceIcon/diceIcon";

export interface RichTextEntryProps {
    key: string;
    entryIndex: number;
    entryText: string;
}

export const RichTextEntry : React.FC<RichTextEntryProps> = ({key, entryIndex, entryText}) => { 

    const parseText = (text: string) : JSX.Element => {

        let splits = text.split(/(\{@\w+?\s.*?\})/)

        return (
            <>
                {splits.map(x => {
                    if (x.startsWith('{@')) {
                        let parts = x.replace('{', '').replace('}', '').match(/(@\w+?)\s(.*)/);

                        if (parts !== null) {
                            switch (parts[1]) {
                                case '@atk': return <Typography display='inline'>{translateAttackType(parts[2])}</Typography>;
                                case '@hit': return <Typography display='inline'>{translateToHit(parts[2])}</Typography>;
                                case '@damage': return renderDiceFormula(parts[2]);
                                case '@dc': return <Typography display='inline'><strong>{`DC ${parts[2]}`}</strong></Typography>;
                                case '@condition': return <DamageConditionType key='' type={parts[2]} condition='' />;
                                case '@skill': return <Typography display='inline'><strong>{parts[2]}</strong></Typography>;
                                default: return <Typography display='inline'><strong>{`${parts[1]} ${parts[2]}`}</strong></Typography>
                            }
                        }
                    } else {
                        return (<Typography display='inline'>{x}</Typography>);
                    }
                })}
                
            </>
        );
    };

    const translateAttackType = (typeCode: string) : string => {
        switch (typeCode) {
            case 'mw': return 'Melee Attack';
            case 'rw': return 'Ranged Attack';
            default: return '';
        }
    }

    const translateToHit = (toHitValue: string): string => {
        return toHitValue.startsWith('-') ? toHitValue : `+${toHitValue}`;
    }

    const renderDiceFormula = (diceFormula: string) : JSX.Element => {
        let forumlaParts = diceFormula.match(/(\d+)(d\d\d?)(.*)/);

        return (
            <>
                {forumlaParts !== null && (
                    <>
                        <Typography display='inline'>{forumlaParts[1]}</Typography>
                        <DiceIcon dice={forumlaParts[2]} />
                        <Typography display='inline'>{forumlaParts[3]}</Typography>
                    </>
                )}
            </>
        );
    }

    return (
        <Typography key={key} variant="body1" display={entryIndex === 0 ? 'inline' : 'block'}>{parseText(entryText)}</Typography>
    );
}