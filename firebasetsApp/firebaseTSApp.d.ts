import { auth, firestore } from 'firebase/app';

export declare class FirebaseTSApp {
    static init(configuration: {
        apiKey: string,
        authDomain: string,
        databaseURL?: string,
        projectId: string,
        storageBucket?: string,
        messagingSenderId?: string
    }): any[];
    static getFirestore(): firestore.Firestore;
    static getAuth(): auth.Auth;
}