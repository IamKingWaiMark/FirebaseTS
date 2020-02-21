import { FirebaseTSApp } from '../firebasetsApp/firebaseTSApp';
require("firebase/auth");

export class FirebaseTSAuth {
    constructor(){
        this.auth = FirebaseTSApp.getAuth();
    }
    /**
     * Creates an user account in the Authentication servers with an email and password.
     * @param {*} params {email: string, password: string, onComplete: void, onFail: void}
     */
    createAccountWith(params){
        return new Promise(
            (resolved, rejected) => {
                this.auth.createUserWithEmailAndPassword(
                    params.email,
                    params.password
                ).then(userCredentials => {
                    resolved(userCredentials);
                    try{
                        params.onComplete(userCredentials);
                    } catch (err) {}
                }).catch((error) => {
                    rejected(error);
                    try{
                        params.onFail(error);
                    } catch (err) {}    
                });
            }
        );
    }
    /**
     * Get an temporary sign in token for the app.
     * @param {*} params {onComplete: void, onFail: void}
     */
    signInAnonymously(params){
        return new Promise(
            (resolved, rejected) => {
                this.auth.signInAnonymously()
                .then(
                    result => {
                        resolved(result);
                        try{
                            params.onComplete(result);
                        } catch (err) {}
                    }
                ).catch(err => {
                    rejected(err);
                    try{
                        params.onFail(err);
                    } catch (err) {}
                });
            }
        )
    }
    /**
     * Used to sign in via email and password.
     * @param {*} params 
     */
    signInWith(params){
        return new Promise(
            (resolved, rejected) => {
                this.auth.signInWithEmailAndPassword(
                    params.email,
                    params.password
                ).then(userCredentials => {
                    resolved(userCredentials);
                    try{
                        params.onComplete(userCredentials);
                    } catch (err) {}
                }).catch((error) => {
                    rejected(error);
                    try{
                        params.onFail(error);
                    } catch (err) {}    
                });
            }
        );
    }
    /**
     * Signs out out the app.
     * @param {*} params 
     */
    signOut(params){
        return new Promise(
            (resolved, rejected) => {
                if(params)
                this.auth.signOut().then(() => {
                    resolved();
                    try{ params.onComplete(); } catch (err) {}      
                }).catch(() => { 
                    rejected(new Error("Failed to signout."));
                    try{ params.onFail(); } catch (err) {}  
                });
             else 
                this.auth.signOut(); 
            }
        );             
    }
    /**
     * Attaches a listener to the authentication object. The callback function, onChange, will be called everytime 
     * the app detects a login state change. E.g. Signed in/out.
     * @param {*} onChange 
     */
    listenToLoginStateChanges(onChange){
        this.auth
        .onAuthStateChanged(
            (firebaseUser) => {
                onChange(firebaseUser);
            }
        );
    }
    /**
     * Sends a verification email request to the logged in user.
     */
    sendVerificaitonEmail(){
        try{
            this.validateIsLoggedIn();
            this.auth.currentUser.sendEmailVerification();
        } catch (err) { console.error(`${err} User must be logged in to use the sendVerificaitonEmail() function.`);}
    }
    /**
     * Sends an password reset instructional email to the user.
     * @param {*} params 
     */
    sendPasswordResetEmail(params){
        if(params.onComplete)
        this.auth.sendPasswordResetEmail(params.email)
        .then(() => params.onComplete(`Instructions to reset password was sent to ${params.email}.`))
        .catch(()=> params.onComplete("Failed to send password reset email."));
    else this.auth.sendPasswordResetEmail(params.email);
    }
    /**
     * Check if the logged in user has verified his email.
     */
    isEmailVerified(){
        try{
            this.validateIsLoggedIn();
            return this.auth.currentUser.emailVerified;
        } catch (err) { console.error(`User must be logged in to use the isEmailVerified() function. \n${err}`);}
        return false;
    }
    /**
     * Check to see if there is any user logged in.
     */
    isLoggedIn(){
        return this.auth.currentUser != undefined || this.auth.currentUser != null;
    }

    validateIsLoggedIn(){
        if(!this.isLoggedIn()) throw new Error("No user was logged in.");
    }
    /**
     * Get an instance of the authencation object.
     */
    getAuth(){
        return this.auth;
    }
    /**
     * Used in conjuction with the listenToLoginStateChanges method.
     * Provide an FirebaseTSAuthState object to check the 5 states:
     * whenChanged, whenLoggedIn, whenLoggedOut, whenLoggedInAndEmailNotVerified, whenLoggedInandEmailVerified
     * @param {*} authState 
     */
    checkState(authState){
        let user = this.getAuth().currentUser;
        // When Changed
        try{ authState.whenChanged(user); } catch (err) {}

        if(this.isLoggedIn()){ // Logged in
            try { authState.whenLoggedIn(user); } catch (err) {}
            if(this.isEmailVerified()){ // Email verified
                try { authState.whenLoggedInAndEmailVerified(user); } catch (err) {}
            } else { // Email is not verified
                try { authState.whenLoggedInAndEmailNotVerified(user); } catch (err) {}
            }
        } else {  // Logged out
            try { authState.whenLoggedOut(user); } catch (err) {}
        }
    }
}