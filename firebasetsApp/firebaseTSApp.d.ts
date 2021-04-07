import {  } from 'firebase/app';

export declare class FirebaseTSApp {
    static init(configuration: {
        apiKey?: string,
        authDomain?: string,
        databaseURL?: string,
        projectId?: string,
        storageBucket?: string,
        messagingSenderId?: string
        appId?: string
    }): any[];
    static getFirestore(): firebase.default.firestore.Firestore;
    static _getFirestore(): any;
    static getAuth(): firebase.default.auth.Auth;
    static getStorage(): firebase.default.storage.Storage;
    static getFirestoreTimestamp(): firebase.default.firestore.Timestamp;
}