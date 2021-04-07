import { } from 'firebase/index';
export declare class FirebaseTSAuth {
    public createAccountWith(params: {
        email: string, 
        password: string, 
        onComplete?: (userCredentials: firebase.default.auth.UserCredential) => void,
        onFail?: (error: any) => void
    }): Promise<firebase.default.auth.UserCredential>;
    public signInAnonymously(params?: {
        onComplete?: (userCredentials: firebase.default.auth.UserCredential) => void,
        onFail?: (error: any) => void
    }):Promise<firebase.default.auth.UserCredential>;
    public signInWith(params: {
        provider?: "Google" | "Yahoo" | "Facebook" | "Apple" | "Github" | "Twitter" | "Microsoft",
        email?: string, 
        password?: string, 
        onComplete?: (userCredentials: firebase.default.auth.UserCredential) => void,
        onFail?: (error: any) => void
    }): Promise<firebase.default.auth.UserCredential>;
    public signOut(params?: {
        onComplete?: () => void,
        onFail?: (error: any) => void
    }): Promise<void>;
    public listenToSignInStateChanges(onChange: (firebaseUser: firebase.default.User) => void): void;
    public sendVerificationEmail(): void;
    public sendPasswordResetEmail(params: {
        email: string, 
        onComplete?: (error?: string) => void
    }): void;
    public isEmailVerified(): boolean;
    public isSignedIn(): boolean;
    public getAuth(): firebase.default.auth.Auth;
    public checkSignInState(authState: FirebaseTSAuthState): () => void;
}

export declare interface FirebaseTSAuthState {
    whenChanged?: (user: firebase.default.User) => void;
    whenSignedIn?: (user: firebase.default.User) => void;
    whenSignedOut?: (user: firebase.default.User) => void;
    whenSignedInAndEmailNotVerified?: (user: firebase.default.User) => void;
    whenSignedInAndEmailVerified?: (user: firebase.default.User) => void;
}