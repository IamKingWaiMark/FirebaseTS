import { FirebaseTSApp, firebaseTSApp } from '../firebasetsApp/firebaseTSApp';
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
                if(params.provider) {
                    this.auth.signInWithPopup(this.getProvider(params.provider))
                    .then(userCredentials => {
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
                } else {
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

            }
        );
    }
    
    getProvider(provider){
        const providerStr = provider.toLowerCase();

        switch(providerStr) {
            case "google": 
                return new firebaseTSApp.auth.GoogleAuthProvider(); 
            case "apple": 
                return new firebaseTSApp.auth.OAuthProvider("apple.com"); 
            case "facebook": 
                return new firebaseTSApp.auth.FacebookAuthProvider(); 
            case "yahoo": 
                return new firebaseTSApp.auth.OAuthProvider("yahoo.com"); 
            case "github": 
                return new firebaseTSApp.auth.GithubAuthProvider(); 
            case "twitter": 
                return new firebaseTSApp.auth.TwitterAuthProvider(); 
            case "microsoft": 
                return new firebaseTSApp.auth.OAuthProvider("microsoft.com"); 

        }
        
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
    listenToSignInStateChanges(onChange){
        this.auth
        .onAuthStateChanged(
            (firebaseUser) => {
                onChange(firebaseUser);
            }
        );
    }
    /**
     * Sends a verification email request to the Signed in user.
     */
    sendVerificationEmail(){
        try{
            this.validateIsSignedIn();
            this.auth.currentUser.sendEmailVerification();
        } catch (err) { console.error(`${err} User must be signed in to use the sendVerificaitonEmail() function.`);}
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
     * Check if the signed in user has verified his email.
     */
    isEmailVerified(){
        try{
            this.validateIsSignedIn();
            return this.auth.currentUser.emailVerified;
        } catch (err) { console.error(`User must be signed in to use the isEmailVerified() function. \n${err}`);}
        return false;
    }
    /**
     * Check to see if there is any user Signed in.
     */
    isSignedIn(){
        return this.auth.currentUser != undefined || this.auth.currentUser != null;
    }

    validateIsSignedIn(){
        if(!this.isSignedIn()) throw new Error("No user was signed in.");
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
     * whenChanged, whenSignedIn, whenSignedOut, whenSignedInAndEmailNotVerified, whenSignedInandEmailVerified
     * @param {*} authState 
     */
    checkSignInState(authState){
        let user = this.getAuth().currentUser;
        // When Changed
        try{ authState.whenChanged(user); } catch (err) {}

        if(this.isSignedIn()){ // Signed in
            try { authState.whenSignedIn(user); } catch (err) {}
            if(this.isEmailVerified()){ // Email verified
                try { authState.whenSignedInAndEmailVerified(user); } catch (err) {}
            } else { // Email is not verified
                try { authState.whenSignedInAndEmailNotVerified(user); } catch (err) {}
            }
        } else {  // Signed out
            try { authState.whenSignedOut(user); } catch (err) {}
        }
    }
}