import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';
// Required for side-effects
require("firebase/firestore");

export class FirebaseTSFirestore {
    listenTo(){
        FirebaseTSApp.getFirestore().collection("a")
        .onSnapshot(
            e=> {
                e.docs.forEach(
                    doc=>{console.log(doc.data());}
                );
            }
        );
    }


}

