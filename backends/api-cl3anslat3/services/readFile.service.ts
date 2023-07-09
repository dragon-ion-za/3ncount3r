const fs = require("fs");

export const readFile = (filePath: string) : any => {
    let legendaryGroupsString = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(legendaryGroupsString);
};