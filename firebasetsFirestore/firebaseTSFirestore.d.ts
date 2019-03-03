import { } from 'firebase/app';


export declare class FirebaseTSFirestore {
    public listenTo(from: string [], where: Where[] | OrderBy [] | Limit [], onUpdate: (result: firebase.firestore.QuerySnapshot) => void): any;
}


export declare class Where {
    constructor(where: string, condition: "<=" | "<" | "==" | ">" | ">=", argument: any);
}

export class OrderBy {
    constructor(field: string, direction: "asc" | "desc");
}

export class Limit {
    constructor(limit: number);
}