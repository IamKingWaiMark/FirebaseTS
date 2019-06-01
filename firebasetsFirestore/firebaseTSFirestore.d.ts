export declare class FirebaseTSFirestore {
    public appendArray<DT>(data: DT): firebase.firestore.FieldValue;
    public all(
        params: {
            operations: BatchOperation<any>[],
            onComplete?: () => void,
            onFail?: (err: any) => void
        }
    ): Promise<void>;

    public create<DT>(
        params: {
            from: string [],
            data: DT, 
            onComplete?: (docId: string) => void,
            onFail?: (err: any) => void
        }
        ): Promise<string>;

    public delete(params: {
        from: string [], 
        onComplete?: () => void,
        onFail?: (err: any) => void
    }): Promise<void>;

    public update<DT>(params: {
        from: string [], 
        data: DT, 
        onComplete?: (docRef: firebase.firestore.DocumentReference) => void,
        onFail?: (err: any) => void
    }): Promise<firebase.firestore.DocumentReference>;

    public getCollection(params: {
        from: string [], 
        where: Where[] | OrderBy [] | Limit [], 
        onComplete?: (result: firebase.firestore.QuerySnapshot) => void,
        onFail?: (err: any) => void
    }): Promise<firebase.firestore.QuerySnapshot>;

    public getDocument(
        params: {
            from: string [], 
            onComplete?: (result: firebase.firestore.DocumentSnapshot) => void,
            onFail?: (err: any) => void
        }
    ): Promise<firebase.firestore.DocumentSnapshot>;

    public listenToCollection(
        params: {
            name: string, 
            from: string [], 
            where: Where[] | OrderBy [] | Limit [], 
            onUpdate: (result: firebase.firestore.QuerySnapshot) => void
        }
    ): void;

    public listenToDocument(params: {
        name: string, 
        from: string [], 
        onUpdate: (result: firebase.firestore.DocumentSnapshot) => void
    }): void
    
    public stopListeningTo(listenerName: string): void;
    public stopListeningToAll(): void;
}


export declare class Where {
    constructor(where: string, condition: "<=" | "<" | "==" | ">" | ">=" | "array-contains", argument: any);
}

export declare class OrderBy {
    constructor(field: string, direction: "asc" | "desc");
}

export declare class Limit {
    constructor(limit: number);
}

export declare class BatchOperation <DT>{
    constructor(operation: "create" | "update", from: string[], data: DT);
    constructor(operation: "delete", from: string[]);
    getOperation(batch: firebase.firestore.WriteBatch): firebase.firestore.WriteBatch;
}
