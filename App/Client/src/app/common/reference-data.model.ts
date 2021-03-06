export class OccupationModel {
    id!: number
    name!: string;
    ratingId!: number;
}

export class OccupationRatingModel {
    id!: number
    name!: string;
    factor!: number;
}

export class StateModel {
    id!: number
    name!: string;
}

export class ReferenceData {
    occupations!: Array<OccupationModel>;
    occupationRatings!: Array<OccupationRatingModel>;
    states!: Array<StateModel>;
}