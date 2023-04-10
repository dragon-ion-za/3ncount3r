import { ClassModel } from "../models/character.model";

export class UtilityService {

    public static getRandomInt(min: number, max: number): number {
        return Math.random() * (max - min) + 1;
    }

    public static concatClasses(classes: ClassModel[]): string {
        let classDescriptions: string[] = [];

        classes.forEach(x => classDescriptions.push(`${x.name} Level ${x.level}`));

        return classDescriptions.join(' ');
    }
}