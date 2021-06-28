export interface RankingAPI {
    [x: string]: any;
    data: Data[];
}

export interface Data {
    points:   number;
    detail:   Detail[];
    userId:    number;
    firstName: string;
    lastName:  string;
    maxHr:     number;
    position:   number;
}

export interface Detail {
    points:      number;
    workoutDate: Date;
}