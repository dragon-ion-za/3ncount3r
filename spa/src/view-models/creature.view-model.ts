export class CreatureViewModel {

    name: string = '';
    challengeRating: number = 0;
    sourceId: string = '';
    hitpointAverage: string = '';
    hitpointFormula: string = '';
    hitpointSpecial: string = '';
    type: string = '';
    alignment: string[] = [];
    armourClass: ArmourClassViewModel;
    walkingSpeed: number = 0;
    flyingSpeed: number = 0;
    swimmingSpeed: number = 0;
    climbingSpeed: number = 0;
}

export class ArmourClassViewModel {
    arourClass: number = 0;
}