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
}