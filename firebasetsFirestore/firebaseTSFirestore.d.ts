import { } from 'firebase/app';


export declare class FirebaseTSFirestore {
    public create<DT>(from: string [], data: DT, onComplete: (success: boolean, error?: any) => void): void;
    public delete(from: string [], onComplete: (success: boolean, error?: any) => void): void;
    public update<DT>(from: string [], data: DT, onComplete: (success: boolean, error?: any) => void): void;
    public getCollection(from: string [], where: Where[] | OrderBy [] | Limit [], onComplete: (result: firebase.firestore.QuerySnapshot, error?: any) => void): void;
    public getDocument(from: string [], onComplete: (result: firebase.firestore.DocumentSnapshot, error?: any) => void): void;
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