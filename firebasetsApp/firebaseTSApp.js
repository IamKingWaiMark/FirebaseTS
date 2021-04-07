export const firebaseTSApp = require("firebase/app");

export class FirebaseTSApp {

    /**
     * Must be called at the beginning before using any other parts of FirebaseTS.
     * @param {*} configuration the Firebase configuration. 
     */
    static init(configuration){
        firebaseTSApp.default.initializeApp(configuration);
        return [];
    }
    /**
     * Gets a Firestore object.
     */
    static getFirestore(){
        return firebaseTSApp.default.firestore();
    }
    static _getFirestore(){
        return firebaseTSApp.default.firestore;
    }
    /**
     * Gets a Firebase Authentication object.
     */
    static getAuth(){
        return firebaseTSApp.default.auth();
    }
    /**
     * Gets a Firebase Storage object.
     */
    static getStorage(){
        return firebaseTSApp.default.storage();
    }
    /**
     * Get the current timestamp in the Firebase Firestore database server.
     */
    static getFirestoreTimestamp(){
        return firebaseTSApp.default.firestore.Timestamp.now();
    }
}
