const imagePath: string = 'http://localhost:5001/creatures/image/';
const imagePathCharacters: string = 'http://localhost:5001/parties/characterimage/';

export function parseAlignment(alignment: string[]): string {
    let expandedAlignment: string = '';

    alignment.forEach(x => {
        switch(x) {
            case 'N': expandedAlignment += ' Neutral'; break;
            case 'E': expandedAlignment += ' Evil'; break;
            case 'G': expandedAlignment += ' Good'; break;
            case 'C': expandedAlignment += ' Chaotic'; break;
            case 'L': expandedAlignment += ' Lawful'; break;
            deafult: break;
        }
    });

    return expandedAlignment.trim();
}

export function getCreatureToken(sourceId: string, name: string, isPlayerCharacter: boolean): string {
    return isPlayerCharacter ? imagePathCharacters.concat(name) : imagePath.concat(sourceId, '/', name);
}

export function calculateAbilityScoreModifier(abilityScore: number) : number {
    switch (true) {
        case abilityScore === 30: return +10;
        case abilityScore >= 28: return +9;
        case abilityScore >= 26: return +8;
        case abilityScore >= 24: return +7;
        case abilityScore >= 22: return +6;
        case abilityScore >= 20: return +5;
        case abilityScore >= 18: return +4;
        case abilityScore >= 16: return +3;
        case abilityScore >= 14: return +2;
        case abilityScore >= 12: return +1;
        case abilityScore >= 10: return 0;
        case abilityScore >= 8: return -1;
        case abilityScore >= 6: return -2;
        case abilityScore >= 4: return -3;
        case abilityScore >= 2: return -4;
        default: return -5;
    }
}