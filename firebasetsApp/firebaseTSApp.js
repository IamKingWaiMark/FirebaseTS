const firebaseTSApp = require("firebase/app");

export class FirebaseTSApp {
    static init(configuration){
        firebaseTSApp.initializeApp(configuration);
        return [];
    }

    static getFirestore(){
        return firebaseTSApp.firestore();
    }
}