import { auth, firestore, storage } from 'firebase/app';

export declare class FirebaseTSApp {
    static init(configuration: {
        apiKey?: string,
        authDomain?: string,
        databaseURL: string,
        projectId?: string,
        storageBucket: string,
        messagingSenderId: string
    }): any[];
    static getFirestore(): firestore.Firestore;
    static _getFirestore(): any;
    static getAuth(): auth.Auth;
    static getStorage(): storage.Storage;
    static getFirestoreTimestamp(): firebase.firestore.Timestamp;
}