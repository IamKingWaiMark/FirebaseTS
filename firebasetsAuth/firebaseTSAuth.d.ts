import { } from 'firebase/index';
export declare class FirebaseTSAuth {
    public createAccountWith(params: {
        email: string, 
        password: string, 
        onComplete?: (userCredentials: firebase.auth.UserCredential) => void,
        onFail?: (error: any) => void
    }): Promise<firebase.auth.UserCredential>;
    public signInAnonymously(params?: {
        onComplete?: (userCredentials: firebase.auth.UserCredential) => void,
        onFail?: (error: any) => void
    }):Promise<firebase.auth.UserCredential>;
    public signInWith(params: {
        provider?: "Google" | "Yahoo" | "Facebook" | "Apple" | "Github" | "Twitter" | "Microsoft",
        email?: string, 
        password?: string, 
        onComplete?: (userCredentials: firebase.auth.UserCredential) => void,
        onFail?: (error: any) => void
    }): Promise<firebase.auth.UserCredential>;
    public signOut(params?: {
        onComplete?: () => void,
        onFail?: (error: any) => void
    }): Promise<void>;
    public listenToSignInStateChanges(onChange: (firebaseUser: firebase.User) => void): void;
    public sendVerificationEmail(): void;
    public sendPasswordResetEmail(params: {
        email: string, 
        onComplete?: (error?: string) => void
    }): void;
    public isEmailVerified(): boolean;
    public isSignedIn(): boolean;
    public getAuth(): firebase.auth.Auth;
    public checkSignInState(authState: FirebaseTSAuthState): () => void;
}

export declare interface FirebaseTSAuthState {
    whenChanged?: (user: firebase.User) => void;
    whenSignedIn?: (user: firebase.User) => void;
    whenSignedOut?: (user: firebase.User) => void;
    whenSignedInAndEmailNotVerified?: (user: firebase.User) => void;
    whenSignedInAndEmailVerified?: (user: firebase.User) => void;
}