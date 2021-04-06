export const firebaseTSApp = require("firebase/app");

export class FirebaseTSApp {

    /**
     * Must be called at the beginning before using any other parts of FirebaseTS.
     * @param {*} configuration the Firebase configuration. 
     */
    static init(configuration){
        firebaseTSApp.initializeApp(configuration);
        return [];
    }
    /**
     * Gets a Firestore object.
     */
    static getFirestore(){
        return firebaseTSApp.firestore();
    }
    static _getFirestore(){
        return firebaseTSApp.firestore;
    }
    /**
     * Gets a Firebase Authentication object.
     */
    static getAuth(){
        return firebaseTSApp.auth();
    }
    /**
     * Gets a Firebase Storage object.
     */
    static getStorage(){
        return firebaseTSApp.storage();
    }
    /**
     * Get the current timestamp in the Firebase Firestore database server.
     */
    static getFirestoreTimestamp(){
        return firebaseTSApp.firestore.Timestamp.now();
    }
}
