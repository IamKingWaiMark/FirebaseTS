import { FirebaseTSApp } from '../firebasetsApp/firebaseTSApp';
// Required for side-effects
require("firebase/firestore");

export class FirebaseTSFirestore {
    constructor(){
        this.listeners = new Map();
    }   
    // Adds data to the database.
    create(params){
        if(params.data == undefined || params.data == null) throw "Error creating data. Data is null or undefined.";
        if(this.isCollectionPath(params.from)) {
            this.genCollectionReference(params.from).doc().set(params.data)
            .then(
                () => {
                    try{
                        params.onComplete();
                    } catch (err) {}
                }).catch(err => {
                    try{
                        params.onFail(err);
                    } catch (err) {}
                });
        } else if(this.isDocumentPath(params.from)){
            this.genDocumentReference(params.from).set(params.data)
            .then(
                () => {
                    try{
                        params.onComplete();
                    } catch (err) {}
                }).catch(err => {
                    try{
                        params.onFail(err);
                    } catch (err) {}
                });
        }
    }
    // Delete data.
    delete(params){
        // Check to see if the path provided leads to a collection.
        this.checkDocumentPathValidity(params.from);
        this.genDocumentReference(params.from).delete()
        .then(
            () => {
                try{
                    params.onComplete();
                } catch (err) {}
            }).catch(err => {
                try{
                    params.onFail(err);
                } catch (err) {}
            });
    }
    // Update a document.
    update(params) {
        // Check to see if the path provided leads to a collection.
        this.checkDocumentPathValidity(params.from);
        this.genDocumentReference(params.from).update(params.data)
        .then(
            () => {
                try{
                    params.onComplete();
                } catch (err) {}
            }).catch(err => {
                try{
                    params.onFail(err);
                } catch (err) {}
            });
    }

    // Get data from a collection once.
    getCollection(params){
        let cr = this.genCollectionReference(params.from);
        if((params.where != null || params.where != undefined) && params.where.length > 0) {
            let query = undefined;
            const whereArr = Array(params.where)[0];
            for(let i = 0; i < whereArr.length; i++){
                if(query == undefined) query = whereArr[i].getQuery(cr);
                else query = whereArr[i].concatQuery(query);
            }

            query.get().then(results => { 
                try{ params.onComplete(results); } catch (err) {}
            }).catch(err=> {
                try{ params.onFail(err); } catch (err) {}
            });
            return;
        } 
        cr.get().then(results => { 
            try{ params.onComplete(results); } catch (err) {}
        }).catch(err=> {
            try{ params.onFail(err); } catch (err) {}
        });
        return;
    }
    // Get data from a collection once.
    getDocument(params){
        this.genDocumentReference(params.from).get()
        .then(results => { 
            try {params.onComplete(results); } catch (err) {}
        })
        .catch(err=> {
            try{
                params.onFail(err);
            } catch (err) {}
        });
    }   
    // LISTEN TO DOCUMENT CHANGES
    listenToDocument(params){
        this.validateListenerName(params.name);  
        this.addListener(params.name, this.genDocumentReference(params.from).onSnapshot(results => {
            try{
                params.onUpdate(results);
            } catch (err) {}
        }));
    }
    // LISTEN TO COLLECTION CHANGES
    listenToCollection(params){
        this.validateListenerName(params.name);
        // Start listening operations.
        let cr = this.genCollectionReference(params.from);
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
    genCollectionReference(from){
        // Check to see if the path provided leads to a collection.
        this.checkCollectionPathValidity(from);

        const fromArr = Array(from)[0];
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
    genDocumentReference(from){
        // Check to see if the path provided leads to a collection.
        this.checkDocumentPathValidity(from);

        const fromArr = Array(from)[0];
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
    checkCollectionPathValidity(from){
        if(from == null || from == undefined || from.length <= 0 || !this.isCollectionPath(from)) throw "Not a valid path to a collection.";
    }
    isCollectionPath(from){
        return Array(from)[0].length % 2 == 1;
    }
    // COLLECTION VALIDATION METHODS END //

    // DOCUMENT VALIDATION METHODS //
    checkDocumentPathValidity(from){
        if(from == null || from == undefined || from.length <= 0 || !this.isDocumentPath(from)) throw "Not a valid path to a document.";
    }
    isDocumentPath(from){
        return Array(from)[0].length % 2 == 0;
    }
    // DOCUMENT VALIDATION METHODS END //


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
