import { Container } from "@mui/system";
import React from "react";

import { DiceD10Icon } from "../../icons/dice.d10.icon";
import { DiceD12Icon } from "../../icons/dice.d12.icon";
import { DiceD20Icon } from "../../icons/dice.d20.icon";
import { DiceD4Icon } from "../../icons/dice.d4.icon";
import { DiceD6Icon } from "../../icons/dice.d6.icon";
import { DiceD8Icon } from "../../icons/dice.d8.icon";

import { diceContainerStyle } from "../../../styles/details.styles";

export interface DiceDisplayProps {
    dice: string;
}

export const DiceDisplay : React.FC<DiceDisplayProps> = ({dice}) => { 
    const renderDiceDisplay = () : JSX.Element => {
        switch (dice) {
            case 'd4': return <DiceD4Icon />;
            case 'd6': return <DiceD6Icon />;
            case 'd8': return <DiceD8Icon />;
            case 'd10': return <DiceD10Icon />;
            case 'd12': return <DiceD12Icon />;
            case 'd20': return <DiceD20Icon />;
            default: return <></>
        }
    }

    return (
        <>
            <Container sx={diceContainerStyle}>
                {renderDiceDisplay()}
            </Container>
        </>
    );
}