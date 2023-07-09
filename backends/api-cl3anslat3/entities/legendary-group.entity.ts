export interface ComplexLegendaryGroupItem {
    type: string;
    style: string;
    name: string;
    items: (string | ComplexLegendaryGroupItem)[];
    entries: (string | ComplexLegendaryGroupItem)[];
    entry: string;
}

export interface LegendaryGroupEntity {
    name: string;
    source: string;
    lairActions: (string | ComplexLegendaryGroupItem)[];
    regionalEffects: (string | ComplexLegendaryGroupItem)[];
    mythicEncounter: (string | ComplexLegendaryGroupItem)[];
}