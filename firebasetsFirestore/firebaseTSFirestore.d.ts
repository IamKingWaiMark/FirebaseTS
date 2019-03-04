import { } from 'firebase/app';


export declare class FirebaseTSFirestore {
    public listenToCollection(name: string, from: string [], where: Where[] | OrderBy [] | Limit [], onUpdate: (result: firebase.firestore.QuerySnapshot) => void): any;
    public listenToDocument(name: string, from: string [], onUpdate: (result: firebase.firestore.DocumentSnapshot) => void): any
    public stopListeningTo(listenerName: string): void;
    public stopListeningToAll(): void;
}


export declare class Where {
    constructor(where: string, condition: "<=" | "<" | "==" | ">" | ">=", argument: any);
}

export declare class OrderBy {
    constructor(field: string, direction: "asc" | "desc");
}

export declare class Limit {
    constructor(limit: number);
}