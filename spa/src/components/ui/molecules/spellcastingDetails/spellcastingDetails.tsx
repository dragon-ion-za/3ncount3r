import { Chip, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { h3Override } from "../../../../styles/details.styles.ts";
import { KnownSpellsViewModel, SpellcastingViewModel, SpellTypes } from "../../../../view-models/creature.view-model.ts";

interface SpellcastingDetailsProps {
    spellcasting: SpellcastingViewModel;
}

export const SpellcastingDetails : React.FC<SpellcastingDetailsProps> = ({spellcasting}) => { 

    const [spellcastingAbility, setSpellcastingAbility] = useState<string>('');
    const [spellSave, setSpellSave] = useState<string>('');
    const [toHitModifier, setToHitModifier] = useState<number | null>(null);
    const [slotSpells, setSlotSpells] = useState<KnownSpellsViewModel[]>([]);
    const [nonSlotSpells, setNonSlotSpells] = useState<KnownSpellsViewModel[]>([]);

    useEffect(() => {
        const matches = spellcasting.entries[0].match(/spellcasting ability is (?<ability>\w*) \((spell save \{@dc (?<spellSave>\d*)\})(, \{@hit (?<toHit>\d)\} to hit)?/);
        if (matches) {
            setSpellcastingAbility(matches.groups['ability']);

            if (matches.groups['spellSave']) {
                setSpellSave(matches.groups['spellSave']);
            };

            if (matches.groups['toHit']) { 
                setToHitModifier(matches.groups['toHit']);
            };
        }

        setSlotSpells(spellcasting.withResources.filter(x => x.type === SpellTypes.Slot));
        setNonSlotSpells(spellcasting.withResources.filter(x => x.type !== SpellTypes.Slot));
    }, [spellcasting]);

    const cleanSpellName = (spellName: string) : string => {
        return spellName.replace('{@spell ', '').replace('}', '');
    }

    const printSpellLevel = (level: string, slotCount: string) : string => {
        let printLevel : string = '';

        switch (level) {
            case '0': printLevel = 'Cantrips'; break;
            case '1': printLevel = `1st Level (${slotCount})`; break;
            case '2': printLevel = `2nd Level (${slotCount})`; break;
            case '3': printLevel = `3rd Level (${slotCount})`; break;
            default: printLevel = `${level}th Level (${slotCount})`; break;
        }

        return printLevel;
    }

    return (
        <>
            <Typography variant="h3" sx={h3Override}>{spellcasting.name}</Typography>
            <Chip label={spellcastingAbility} />
            {spellSave && (<Chip label={`DC ${spellSave}`} />)}
            {toHitModifier && (<Chip label={`${(toHitModifier >= 0 ? '+' : '')}${toHitModifier} to hit`} />)}

            {spellcasting.entries.map(x => (<Typography variant="body1">{x}</Typography>))}
            
            {spellcasting.atWill.length > 0 && (
                <Container>
                    <Typography variant="subtitle2">At Will</Typography>
                    {spellcasting.atWill.map(x => <Chip key={`innate_${x}`} label={cleanSpellName(x)} />)}
                </Container>
            )}
            
            {nonSlotSpells.length > 0 && (
                nonSlotSpells.map(spellType => {return (
                    <Container>
                        <Typography variant="subtitle2">{`${SpellTypes[spellType.type]} (${spellType.resource})`}</Typography>
                        {spellType.spells.map(spell => <Chip key={`nonSlot_${spell}`} label={cleanSpellName(spell)} />)}
                    </Container>
                )})
            )}

            {slotSpells.length > 0 && (
                slotSpells.map(spellLevel => {return (
                    <Container>
                        <Typography variant="subtitle2">{printSpellLevel(spellLevel.level, spellLevel.resource)}</Typography>
                        {spellLevel.spells.map(spell => <Chip key={`slot_${spell}`} label={cleanSpellName(spell)} />)}
                    </Container>
                )})
            )}
        </>
    );
};