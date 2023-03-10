import { Chip, Link, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { actionItemContainerStyle, spellChipsStyle } from "../../../../styles/details.styles";
import { DamageConditionType } from "../damageConditionType/damageConditionType";
import { DiceIcon } from "../diceIcon/diceIcon";

export interface RichTextEntryProps {
    key: string;
    entryIndex: number;
    entryText: string;
    isHeading?: boolean;
}

export const RichTextEntry : React.FC<RichTextEntryProps> = ({key, entryIndex, entryText, isHeading = false}) => { 

    const parseText = (text: string) : JSX.Element => {

        let splits = text.split(/(\{@\w+?\s.*?\})/)

        return (
            <>
                {splits.map(x => {
                    if (x.startsWith('{@')) {
                        let parts = x.replace('{', '').replace('}', '').match(/(@\w+?)\s(.*)/);

                        if (parts !== null) {
                            let text: string = '';
                            switch (parts[1]) {
                                case '@damage':
                                case '@dice': return renderDiceFormula(parts[2]);
                                
                                case '@condition': return <DamageConditionType key='' type={parts[2]} condition='' />;
                                case '@spell': return <Chip sx={{textTransform: 'capitalize', ...spellChipsStyle}} label={parts[2]} />

                                case '@skill': return <Typography variant="body1" display='inline'><Link href='#'>{parts[2]}</Link></Typography>;
                                case '@sense': return <Typography variant="body1" display='inline'><Link href='#'>{parts[2]}</Link></Typography>;
                                case '@book': 
                                    let split = parts[2].split('|');
                                    return <Typography variant="body1" display='inline'><Link href='#'>{split.reverse()[0]}</Link></Typography>;
                                case '@creature': 
                                    let cuttoffIndex = parts[2].indexOf('||');
                                    return <Typography variant="body1" display='inline'><Link href='#'>{parts[2].substring(0, cuttoffIndex)}</Link></Typography>;

                                case '@atk': text = translateAttackType(parts[2]); break;
                                case '@hit': text = translateToHit(parts[2]); break;
                                case '@dc': text = `DC ${parts[2]}`; break;
                                case '@chance': text = translateChance(parts[2]); break;
                                case '@recharge': text = `(recharges on ${parts[2]})`; break;
                                case '@i': text = parts[2]; break;
                                default: text = `${parts[1]} ${parts[2]}`; break;
                            }

                            return <Typography key={key} variant="body1" display='inline'><strong>{text}</strong></Typography>;
                        }
                    } else {
                        return <Typography key={key} variant='body1' display='inline'>
                                {isHeading ? (<strong>{x}</strong>) : x}
                            </Typography>;
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

    const translateChance = (chance: string): string => {
        let match = chance.match(/percent\|(.*%)/);

        if (match !== null) {
            return match[1];
        }

        return '';
    }

    const renderDiceFormula = (diceFormula: string) : JSX.Element => {
        let forumlaParts = diceFormula.match(/(\d+)(d\d\d?)(.*)/);

        return (
            <>
                {forumlaParts !== null && (
                    <>
                        <Typography variant="body1" display='inline'><strong>{forumlaParts[1]}</strong></Typography>
                        <DiceIcon dice={forumlaParts[2]} />
                        <Typography variant="body1" display='inline'><strong>{forumlaParts[3]}</strong></Typography>
                    </>
                )}
            </>
        );
    }

    return (
        <>
            <Container sx={{display: entryIndex === 0 ? 'inline' : 'block', ...actionItemContainerStyle}}>
                {parseText(entryText)}
            </Container>            
        </>
    );
}