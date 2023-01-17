import React from "react";
import { Chip, SvgIcon } from "@mui/material";

import { NecroticDamageIcon } from "../icons/damageType.necrotic.icon.tsx";
import { ColdDamageIcon } from "../icons/damageType.cold.icon.tsx";
import { LightningDamageIcon } from "../icons/damageType.lightning.icon.tsx";
import { BludgeoningDamageIcon } from "../icons/damageType.bludgeoning.icon.tsx";
import { PiercingDamageIcon } from "../icons/damageType.piercing.icon.tsx";
import { SlashingDamageIcon } from "../icons/damageType.slashing.icon.tsx";
import { MagicalBludgeoningDamageIcon } from "../icons/damageType.bludgeoning.magical.icon.tsx";
import { MagicalPiercingDamageIcon } from "../icons/damageType.piercing.magical.icon.tsx";
import { MagicalSlashingDamageIcon } from "../icons/damageType.slashing.magical.icon.tsx";
import { PoisonDamageIcon } from "../icons/damageType.poison.icon.tsx";
import { PsychicDamageIcon } from "../icons/damageType.psychic.icon.tsx";
import { CharmedDamageIcon } from "../icons/damageType.charmed.icon.tsx";
import { DeafenedDamageIcon } from "../icons/damageType.deafened.icon.tsx";
import { ExhaustionDamageIcon } from "../icons/damageType.exhaustion.icon.tsx";
import { FrightenedDamageIcon } from "../icons/damageType.frightened.icon.tsx";
import { ParalyzedDamageIcon } from "../icons/damageType.paralyzed.icon.tsx";
import { PetrifiedDamageIcon } from "../icons/damageType.petrified.icon.tsx";
import { PoisonedDamageIcon } from "../icons/damageType.poisoned.icon.tsx";
import { ProneDamageIcon } from "../icons/damageType.prone.icon.tsx";
import { StunnedDamageIcon } from "../icons/damageType.stunned.icon.tsx";
import { AcidDamageIcon } from "../icons/damageType.acid.icon.tsx";
import { FireDamageIcon } from "../icons/damageType.fire.icon.tsx";
import { damageConditionChips } from "../../../../styles/details.styles.ts";

interface DamageConditionTypeProps {
    key: string;
    type: string;
    condition: string;
}

export const DamageConditionType : React.FC<DamageConditionTypeProps> = ({key, type, condition}) => { 

    const getDamageTypeIcon = (damageType: string, isMagical: boolean = false) => {
        switch (damageType) {
            case 'acid': return (<AcidDamageIcon />);
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