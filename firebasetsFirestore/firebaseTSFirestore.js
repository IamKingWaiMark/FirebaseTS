import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';
// Required for side-effects
require("firebase/firestore");

export class FirebaseTSFirestore {

    listenTo(from, where, onUpdate){
        let cr = this.genCollectionReference(from);
        
        if((where != null || where != undefined) && where.length > 0) {
            let query = undefined;
            const whereArr = Array(where)[0];
            for(let i = 0; i < whereArr.length; i++){
                if(query === undefined) query = whereArr[i].getQuery(cr);
                else query = whereArr[i].concatQuery(query);
            }

            return query.onSnapshot(results => onUpdate(results));
        } 
        return cr.onSnapshot(results => onUpdate(results));
    }
    genCollectionReference(from){
        const fromArr = Array(from)[0];
        let cr = undefined;
        let dr = undefined;
        for(let i = 0; i < fromArr.length; i++){
            if(i % 2 == 0){
                if(cr === undefined){
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