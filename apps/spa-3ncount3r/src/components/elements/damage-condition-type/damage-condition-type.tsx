import React from "react";
import { Chip, SvgIcon } from "@mui/material";

import { NecroticDamageIcon } from "../../icons/damage-type.necrotic.icon";
import { ColdDamageIcon } from "../../icons/damage-type.cold.icon";
import { LightningDamageIcon } from "../../icons/damage-type.lightning.icon";
import { BludgeoningDamageIcon } from "../../icons/damage-type.bludgeoning.icon";
import { PiercingDamageIcon } from "../../icons/damage-type.piercing.icon";
import { SlashingDamageIcon } from "../../icons/damage-type.slashing.icon";
import { MagicalBludgeoningDamageIcon } from "../../icons/damage-type.bludgeoning.magical.icon";
import { MagicalPiercingDamageIcon } from "../../icons/damage-type.piercing.magical.icon";
import { MagicalSlashingDamageIcon } from "../../icons/damage-type.slashing.magical.icon";
import { PoisonDamageIcon } from "../../icons/damage-type.poison.icon";
import { PsychicDamageIcon } from "../../icons/damage-type.psychic.icon";
import { CharmedDamageIcon } from "../../icons/damage-type.charmed.icon";
import { DeafenedDamageIcon } from "../../icons/damage-type.deafened.icon";
import { ExhaustionDamageIcon } from "../../icons/damage-type.exhaustion.icon";
import { FrightenedDamageIcon } from "../../icons/damage-type.frightened.icon";
import { ParalyzedDamageIcon } from "../../icons/damage-type.paralyzed.icon";
import { PetrifiedDamageIcon } from "../../icons/damage-type.petrified.icon";
import { PoisonedDamageIcon } from "../../icons/damage-type.poisoned.icon";
import { ProneDamageIcon } from "../../icons/damage-type.prone.icon";
import { StunnedDamageIcon } from "../../icons/damage-type.stunned.icon";
import { AcidDamageIcon } from "../../icons/damage-type.acid.icon";
import { FireDamageIcon } from "../../icons/damage-type.fire.icon";
import { RestrainedDamageIcon } from "../../icons/damage-type.restrained.icon";
import { BlindedDamageIcon } from "../../icons/damage-type.blinded.icon";

import { damageConditionChips } from "../../../styles/details.styles";

interface DamageConditionTypeProps {
    key: string;
    type: string;
    condition: string;
}

export const DamageConditionType : React.FC<DamageConditionTypeProps> = ({key, type, condition}) => { 

    const getDamageTypeIcon = (damageType: string, isMagical: boolean = false) => {
        switch (damageType) {
            case 'acid': return (<AcidDamageIcon />);
            case 'blinded': return (<BlindedDamageIcon />);
            case 'bludgeoning': return isMagical ? (<MagicalBludgeoningDamageIcon />) : (<BludgeoningDamageIcon />);
            case 'charmed': return (<CharmedDamageIcon />);
            case 'cold': return (<ColdDamageIcon />);
            case 'deafened': return (<DeafenedDamageIcon />);
            case 'exhaustion': return (<ExhaustionDamageIcon />);
            case 'fire': return (<FireDamageIcon />);
            case 'frightened': return (<FrightenedDamageIcon />);
            case 'lightning': return (<LightningDamageIcon />);
            case 'necrotic': return (<NecroticDamageIcon />);
            case 'paralyzed': return (<ParalyzedDamageIcon />);
            case 'petrified': return (<PetrifiedDamageIcon />);
            case 'piercing': return isMagical ? (<MagicalPiercingDamageIcon />) : (<PiercingDamageIcon />);
            case 'poison': return (<PoisonDamageIcon />);
            case 'poisoned': return (<PoisonedDamageIcon />);
            case 'prone': return (<ProneDamageIcon />);
            case 'psychic': return (<PsychicDamageIcon />);
            case 'restrained': return (<RestrainedDamageIcon />);
            case 'slashing': return isMagical ? (<MagicalSlashingDamageIcon />) : (<SlashingDamageIcon />);
            case 'stunned': return (<StunnedDamageIcon />);

            default: console.log(`unknown damage/condition type: ${damageType}`); return (<SvgIcon />);
        }
    };

    return (
        <>
            <Chip sx={damageConditionChips} key={key} icon={getDamageTypeIcon(type, condition === 'from magic weapons')} />
        </>
    );
}