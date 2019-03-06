export declare class FirebaseTSAuth {
    public createAccountWith(email: string, password: string, onComplete: (userCredentials: firebase.auth.UserCredential, error?: any) => void): void;
    public signInWith(email: string, password: string, onComplete: (userCredentials: firebase.auth.UserCredential, error?: any) => void): void;
    public signOut(onComplete?: (success: boolean) => void): void;
    public listenToLoginStateChanges(onChange: (firebaseUser: firebase.User) => void): void;
    public sendVerificaitonEmail(): void;
    public sendPasswordResetEmail(email: string, onComplete?: (error?: string) => void): void;
    public isEmailVerified(): boolean;
    public isLoggedIn(): boolean;
    public getAuth(): firebase.auth.Auth;
}