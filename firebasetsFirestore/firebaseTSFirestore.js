import { FirebaseTSApp } from '../firebasetsApp/firebaseTSApp';
// Required for side-effects
require("firebase/firestore");

export class FirebaseTSFirestore {
    constructor(){
        this.listeners = new Map();
    }   
    appendArray(data){
        return FirebaseTSApp._getFirestore().FieldValue.arrayUnion(data);
    }
    increment(value) {
        return FirebaseTSApp._getFirestore().FieldValue.increment(value);
    }
    genDocId(){
        return FirebaseTSApp.getFirestore().collection("TEMP").doc().id;
    }  
    all(params){
        const batch = FirebaseTSApp.getFirestore().batch();
        for(let bo of params.operations){
            bo.getOperation(batch);
        }
        return new Promise(
            (resolved, rejected) => {
                batch.commit().then(()=>{
                    try{
                        params.onComplete();
                    } catch (err) {}
                    resolved();
                }).catch(err=>{
                    try{
                        params.onFail(err);
                    } catch (error) {}
                    rejected(err);
                });
            }
        );
    }
    // Adds data to the database.
    create(params){
        return new Promise(
            (resolved, rejected) => {
                if(params.data == undefined || params.data == null) throw new Error("Error creating data. Data is null or undefined.");
                if(this.isCollectionPath(params.path)) {
                    let docRef = this.genCollectionReference(params.path).doc();
                    docRef.set(params.data)
                    .then(
                        () => {
                            
                            try{                       
                                params.onComplete(docRef.id);
                            } catch (err) {}
                            resolved(docRef.id);
                        }).catch(err => {
                            
                            try{
                                params.onFail(err);
                            } catch (err) {}
                            rejected(err);
                        });
                } else if(this.isDocumentPath(params.path)){
                    let docRef = this.genDocumentReference(params.path);
                    docRef.set(params.data)
                    .then(
                        () => {
                            
                            try{
                                params.onComplete(docRef.id);
                            } catch (err) {}
                            resolved(docRef.id);
                        }).catch(err => {
                            
                            try{
                                params.onFail(err);
                            } catch (err) {}
                            rejected(err);
                        });
                }
            }
        )
    }
    // Delete data.
    delete(params){
        return new Promise(
            (resolved, rejected) => {
                // Check to see if the path provided leads to a collection.
                this.checkDocumentPathValidity(params.path);
                this.genDocumentReference(params.path).delete()
                .then(
                    () => {
                        
                        try{
                            params.onComplete();
                        } catch (err) {}
                        resolved();
                    }).catch(err => {
                        
                        try{
                            params.onFail(err);
                        } catch (err) {}
                        rejected(err);
                    });
            }
        );
    }
    // Update a document.
    update(params) {
        return new Promise(
            (resolved, rejected) => {
                // Check to see if the path provided leads to a collection.
                this.checkDocumentPathValidity(params.path);
                const docRef = this.genDocumentReference(params.path);
                docRef.update(params.data)
                .then(
                    () => {
                        
                        try{
                            params.onComplete(docRef);
                        } catch (err) {}
                        resolved(docRef);
                    }).catch(err => {
                        
                        try{
                            params.onFail(err);
                        } catch (err) {}
                        rejected(err);
                    });
                }
        );
    }

    // Get data from a collection once.
    getCollection(params){
        let cr = this.genCollectionReference(params.path);
        if((params.where != null || params.where != undefined) && params.where.length > 0) {
            return new Promise((resolved, rejected) => {
                let query = undefined;
                const whereArr = Array(params.where)[0];
                for(let i = 0; i < whereArr.length; i++){
                    if(query == undefined) query = whereArr[i].getQuery(cr);
                    else query = whereArr[i].concatQuery(query);
                }
                query.get().then(results => { 
                    
                    try{ params.onComplete(results); } catch (err) {}
                    resolved(results);
                }).catch(err=> {
                   
                    try{ params.onFail(err); } catch (err) {}
                    rejected(err);
                });
            });
        } else {
            return new Promise((resolved, rejected) => {
                cr.get().then(results => { 
                    
                    try{ params.onComplete(results); } catch (err) {}
                    resolved(results);
                }).catch(err=> {
                    
                    try{ params.onFail(err); } catch (err) {}
                    rejected(err);
                });
            });
        }
    }
    // Get data from a collection once.
    getDocument(params){
        return new Promise((resolved, rejected) => {
            this.genDocumentReference(params.path).get()
            .then(results => { 
                    
                try { params.onComplete(results); } catch (err) {}
                resolved(results); 
            })
            .catch(err=> {
                
                try{
                    params.onFail(err);
                } catch (err) {}
                rejected(err);
            });
        });
        
    }   
    // LISTEN TO DOCUMENT CHANGES
    listenToDocument(params){
        this.validateListenerName(params.name);  
        this.addListener(params.name, this.genDocumentReference(params.path).onSnapshot(results => {
            try{
                params.onUpdate(results);
            } catch (err) {}
        }));
    }
    // LISTEN TO COLLECTION CHANGES
    listenToCollection(params){
        this.validateListenerName(params.name);
        // Start listening operations.
        let cr = this.genCollectionReference(params.path);
        if((params.where != null || params.where != undefined) && params.where.length > 0) {
            let query = undefined;
            const whereArr = Array(params.where)[0];
            for(let i = 0; i < whereArr.length; i++){
                if(query == undefined) query = whereArr[i].getQuery(cr);
                else query = whereArr[i].concatQuery(query);
            }

            this.addListener(params.name, query.onSnapshot(results => {
                try{
                    params.onUpdate(results)
                } catch (err) {}
            }));
        } 
        this.addListener(name, cr.onSnapshot(results => {
            try{
                params.onUpdate(results)
            } catch (err) {}
        }));
    }
    // GENERATE A COLLECTION REFERENCE FROM A PATH.
    genCollectionReference(path){
        // Check to see if the path provided leads to a collection.
        this.checkCollectionPathValidity(path);

        const fromArr = Array(path)[0];
        let cr = undefined;
        let dr = undefined;
        for(let i = 0; i < fromArr.length; i++){
            if(i % 2 == 0){
                if(cr == undefined){
                    cr = FirebaseTSApp.getFirestore().collection(fromArr[i]);
                } else {
                    cr = dr.collection(fromArr[i]);
                }
            } else {
                dr = cr.doc(fromArr[i]);
            }
        }
        return cr;
    }
    // GENERATE A DOCUMENT REFERENCE FROM A PATH.
    genDocumentReference(path){
        // Check to see if the path provided leads to a collection.
        this.checkDocumentPathValidity(path);

        const fromArr = Array(path)[0];
        let cr = undefined;
        let dr = undefined;
        for(let i = 0; i < fromArr.length; i++){
            if(i % 2 == 0){
                if(cr == undefined){
                    cr = FirebaseTSApp.getFirestore().collection(fromArr[i]);
                } else {
                    cr = dr.collection(fromArr[i]);
                }
            } else {
                dr = cr.doc(fromArr[i]);
            }
        }
        return dr;
    }
        
    // Adds the listener.
    addListener(listenerName, listener){     
        this.listeners.set(listenerName, listener);
        return listener;
    }
    // Stop listening to a snapshot
    stopListeningTo(listenerName){
        try{
            this.listeners.get(listenerName)();
            this.listeners.delete(listenerName);
        } catch (err) {}
    }
    // Stop listening to all snapshots
    stopListeningToAll(){
        this.listeners.forEach(
            (value, key, map) => {
                this.stopListeningTo(key);
            }
        );
    }
    // Validates if the listener name valid. This means that the name is not in use or have not met the requirements to be a name.
    validateListenerName(listenerName){
        if(listenerName == null || listenerName == undefined || (typeof listenerName != typeof "") || listenerName.trim().length <= 0) throw "Listener name cannot be empty.";
        else if(this.listeners.get(listenerName) != undefined) throw `Listener name: ${listenerName} is already taken.`;
    }
    // COLLECTION VALIDATION METHODS //
    checkCollectionPathValidity(path){
        if(path == null || path == undefined || path.length <= 0 || !this.isCollectionPath(path)) throw "Not a valid path to a collection.";
    }
    isCollectionPath(path){
        return Array(path)[0].length % 2 == 1;
    }
    // COLLECTION VALIDATION METHODS END //

    // DOCUMENT VALIDATION METHODS //
    checkDocumentPathValidity(path){
        if(path == null || path == undefined || path.length <= 0 || !this.isDocumentPath(path)) throw "Not a valid path to a document.";
    }
    isDocumentPath(path){
        return Array(path)[0].length % 2 == 0;
    }
    // DOCUMENT VALIDATION METHODS END //


}
export class Cursor {
    constructor(cursor, position){
        this.cursor = cursor;
        this.position = position;
    }

    getQuery(cr){
        if(cursor == "startAt") {
            return cr.startAt(position);
        } else if(cursor == "endAt"){
            return cr.endAt(position);
        } else if(cursor == "startAfter") {
            return cr.startAfter(position);
        } else if(cursor == "endBefore") {
            return cr.endBefore(position);
        }
    }
    concatQuery(query){
        if(cursor == "startAt") {
            return query.startAt(position);
        } else if(cursor == "endAt"){
            return query.endAt(position);
        } else if(cursor == "startAfter") {
            return query.startAfter(position);
        } else if(cursor == "endBefore") {
            return query.endBefore(position);
        }
    }
}

export class Where {

    constructor(where, condition, argument){
        this.where = where;
        this.condition = condition;
        this.argument = argument;
    }

    getQuery(cr){
        return cr.where(this.where, this.condition, this.argument);
    }
    concatQuery(query){
        return query.where(this.where, this.condition, this.argument);
    }
}

export class OrderBy {
    constructor(field, direction){
        this.field = field;
        this.direction = direction;
    }

    getQuery(cr){
        return cr.orderBy(this.field, this.direction);
    }
    concatQuery(query){
        return query.orderBy(this.field, this.direction);
    }

}

export class Limit {
    constructor(limit){
        this.limit = limit;
    }

    getQuery(cr){
        return cr.limit(this.limit);
    }
    concatQuery(query){
        return query.limit(this.limit);
    }
}

export class BatchOperation {

    constructor(operation, path, data){
        this.operation = operation;
        this.path = path;
        this.data = data;

    }
    getOperation(batch){
        switch(this.operation){
            case "create":
                let isCollection = this.isCollectionPath(this.path);
                if(isCollection) {
                    return batch.set(this.genCollectionReference(this.path).doc(), this.data);
                } else {
                    return batch.set(this.genDocumentReference(this.path), this.data);
                }
            case "update":
                return batch.update(this.genDocumentReference(this.path), this.data);
            case "delete":
                return batch.delete(this.genDocumentReference(this.path));
        }
    }
    // COLLECTION VALIDATION METHODS //
    checkCollectionPathValidity(path){
        if(path == null || path == undefined || path.length <= 0 || !this.isCollectionPath(path)) throw "Not a valid path to a collection.";
    }
    isCollectionPath(path){
        return Array(path)[0].length % 2 == 1;
    }
    // GENERATE A COLLECTION REFERENCE FROM A PATH.
    genCollectionReference(path){
        // Check to see if the path provided leads to a collection.
        this.checkCollectionPathValidity(path);

        const fromArr = Array(path)[0];
        let cr = undefined;
        let dr = undefined;
        for(let i = 0; i < fromArr.length; i++){
            if(i % 2 == 0){
                if(cr == undefined){
                    cr = FirebaseTSApp.getFirestore().collection(fromArr[i]);
                } else {
                    cr = dr.collection(fromArr[i]);
                }
            } else {
                dr = cr.doc(fromArr[i]);
            }
        }
        return cr;
    }
    isDocumentPath(path){
        return Array(path)[0].length % 2 == 0;
    }
    // DOCUMENT VALIDATION METHODS //
    checkDocumentPathValidity(path){
        if(path == null || path == undefined || path.length <= 0 || !this.isDocumentPath(path)) throw "Not a valid path to a document.";
    }
    // GENERATE A DOCUMENT REFERENCE FROM A PATH.
    genDocumentReference(path){
        // Check to see if the path provided leads to a collection.
        this.checkDocumentPathValidity(path);
    
        const fromArr = Array(path)[0];
        let cr = undefined;
        let dr = undefined;
        for(let i = 0; i < fromArr.length; i++){
            if(i % 2 == 0){
                if(cr == undefined){
                    cr = FirebaseTSApp.getFirestore().collection(fromArr[i]);
                } else {
                    cr = dr.collection(fromArr[i]);
                }
            } else {
                dr = cr.doc(fromArr[i]);
            }
        }
        return dr;
    }
    
}
