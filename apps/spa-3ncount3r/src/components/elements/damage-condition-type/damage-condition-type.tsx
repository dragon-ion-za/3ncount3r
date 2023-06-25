import React from "react";
import { Chip, SvgIcon } from "@mui/material";

import { NecroticDamageIcon } from "../../icons/damageType.necrotic.icon";
import { ColdDamageIcon } from "../../icons/damageType.cold.icon";
import { LightningDamageIcon } from "../../icons/damageType.lightning.icon";
import { BludgeoningDamageIcon } from "../../icons/damageType.bludgeoning.icon";
import { PiercingDamageIcon } from "../../icons/damageType.piercing.icon";
import { SlashingDamageIcon } from "../../icons/damageType.slashing.icon";
import { MagicalBludgeoningDamageIcon } from "../../icons/damageType.bludgeoning.magical.icon";
import { MagicalPiercingDamageIcon } from "../../icons/damageType.piercing.magical.icon";
import { MagicalSlashingDamageIcon } from "../../icons/damageType.slashing.magical.icon";
import { PoisonDamageIcon } from "../../icons/damageType.poison.icon";
import { PsychicDamageIcon } from "../../icons/damageType.psychic.icon";
import { CharmedDamageIcon } from "../../icons/damageType.charmed.icon";
import { DeafenedDamageIcon } from "../../icons/damageType.deafened.icon";
import { ExhaustionDamageIcon } from "../../icons/damageType.exhaustion.icon";
import { FrightenedDamageIcon } from "../../icons/damageType.frightened.icon";
import { ParalyzedDamageIcon } from "../../icons/damageType.paralyzed.icon";
import { PetrifiedDamageIcon } from "../../icons/damageType.petrified.icon";
import { PoisonedDamageIcon } from "../../icons/damageType.poisoned.icon";
import { ProneDamageIcon } from "../../icons/damageType.prone.icon";
import { StunnedDamageIcon } from "../../icons/damageType.stunned.icon";
import { AcidDamageIcon } from "../../icons/damageType.acid.icon";
import { FireDamageIcon } from "../../icons/damageType.fire.icon";
import { RestrainedDamageIcon } from "../../icons/damageType.restrained.icon";
import { BlindedDamageIcon } from "../../icons/damageType.blinded.icon";

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