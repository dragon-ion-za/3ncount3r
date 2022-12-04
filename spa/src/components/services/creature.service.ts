const imagePath: string = 'http://localhost:5001/creatures/image/';

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

export function getCreatureToken(sourceId: string, name: string): string {
    return imagePath.concat(sourceId, '/', name);
}