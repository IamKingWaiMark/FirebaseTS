import { } from 'firebase/index';
export declare class FirebaseTSFirestore {
    public appendArray<DT>(data: DT): firebase.firestore.FieldValue;

    public genDocId(): string; 
    public all(
        params: {
            operations: BatchOperation<any>[],
            onComplete?: () => void,
            onFail?: (err: any) => void
        }
    ): Promise<void>;

    public create<DT>(
        params: {
            path: string [],
            data: DT, 
            onComplete?: (docId: string) => void,
            onFail?: (err: any) => void
        }
        ): Promise<string>;

    public delete(params: {
        path: string [], 
        onComplete?: () => void,
        onFail?: (err: any) => void
    }): Promise<void>;

    public update<DT>(params: {
        path: string [], 
        data: DT, 
        onComplete?: (docRef: firebase.firestore.DocumentReference) => void,
        onFail?: (err: any) => void
    }): Promise<firebase.firestore.DocumentReference>;

    public getCollection(params: {
        path: string [], 
        where: Where[] | OrderBy [] | Limit [], 
        onComplete?: (result: firebase.firestore.QuerySnapshot) => void,
        onFail?: (err: any) => void
    }): Promise<firebase.firestore.QuerySnapshot>;

    public getDocument(
        params: {
            path: string [], 
            onComplete?: (result: firebase.firestore.DocumentSnapshot) => void,
            onFail?: (err: any) => void
        }
    ): Promise<firebase.firestore.DocumentSnapshot>;

    public listenToCollection(
        params: {
            name: string, 
            path: string [], 
            where: Where[] | OrderBy [] | Limit [], 
            onUpdate: (result: firebase.firestore.QuerySnapshot) => void
        }
    ): void;

    public listenToDocument(params: {
        name: string, 
        path: string [], 
        onUpdate: (result: firebase.firestore.DocumentSnapshot) => void
    }): void
    
    public stopListeningTo(listenerName: string): void;
    public stopListeningToAll(): void;
}

export declare class Cursor {
    constructor(cursor: "startAt" | "startAfter" | "endAt" | "endAfter", position: string []);
}
export declare class Where {
    constructor(where: string, condition: "<=" | "<" | "==" | ">" | ">=" | "array-contains" | "array-contains-any" | "in", argument: any);
}

export declare class OrderBy {
    constructor(field: string, direction: "asc" | "desc");
}

export declare class Limit {
    constructor(limit: number);
}

export declare class BatchOperation <DT>{
    constructor(operation: "create" | "update", path: string[], data: DT);
    constructor(operation: "delete", path: string[]);
    getOperation(batch: firebase.firestore.WriteBatch): firebase.firestore.WriteBatch;
}
