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
        email: string, 
        password: string, 
        onComplete?: (userCredentials: firebase.auth.UserCredential) => void,
        onFail?: (error: any) => void
    }): Promise<firebase.auth.UserCredential>;
    public signOut(params?: {
        onComplete?: () => void,
        onFail?: (error: any) => void
    }): Promise<void>;
    public listenToLoginStateChanges(onChange: (firebaseUser: firebase.User) => void): void;
    public sendVerificaitonEmail(): void;
    public sendPasswordResetEmail(params: {
        email: string, 
        onComplete?: (error?: string) => void
    }): void;
    public isEmailVerified(): boolean;
    public isLoggedIn(): boolean;
    public getAuth(): firebase.auth.Auth;
    public checkState(authState: FirebaseTSAuthState): () => void;
}

export declare interface FirebaseTSAuthState {
    whenChanged?: (user: firebase.User) => void;
    whenLoggedIn?: (user: firebase.User) => void;
    whenLoggedOut?: (user: firebase.User) => void;
    whenLoggedInAndEmailNotVerified?: (user: firebase.User) => void;
    whenLoggedInAndEmailVerified?: (user: firebase.User) => void;
}