const firebaseTSApp = require("firebase/app");

export class FirebaseTSApp {
    static init(configuration){
        firebaseTSApp.initializeApp(configuration);
        return [];
    }

    static getFirestore(){
        return firebaseTSApp.firestore();
    }
    static _getFirestore(){
        return firebaseTSApp.firestore;
    }
    static getAuth(){
        return firebaseTSApp.auth();
    }

    static getStorage(){
        return firebaseTSApp.storage();
    }

    static getFirestoreTimestamp(){
        return firebaseTSApp.firestore.Timestamp.now();
    }
}
