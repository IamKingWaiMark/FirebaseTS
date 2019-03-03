import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';
// Required for side-effects
require("firebase/firestore");

export class FirebaseTSFirestore {
    listenTo(from, onUpdate){
        const fromArr = Array(from);
        let cr = undefined;
        let dr = undefined;
        for(let i = 0; i < fromArr[0].length; i++){
            if(i % 2 == 0){
                if(cr === undefined){
                    cr = FirebaseTSApp.getFirestore().collection(fromArr[0][i]);
                } else {
                    cr = dr.collection(fromArr[i]);
                }
            } else {
                dr = cr.doc(fromArr[i]);
            }
        }
        
        return cr.onSnapshot(results => onUpdate(results));
    }
}
