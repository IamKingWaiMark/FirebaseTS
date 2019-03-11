import { FirebaseTSApp } from '../firebasetsApp/firebaseTSApp';
require("firebase/auth");

export class FirebaseTSAuth {
    constructor(){
        this.auth = FirebaseTSApp.getAuth();
    }
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

    listenToLoginStateChanges(onChange){
        this.auth
        .onAuthStateChanged(
            (firebaseUser) => {
                onChange(firebaseUser);
            }
        );
    }

    sendVerificaitonEmail(){
        try{
            this.validateIsLoggedIn();
            this.auth.currentUser.sendEmailVerification();
        } catch (err) { console.error(`${err} User must be logged in to use the sendVerificaitonEmail() function.`);}
    }

    sendPasswordResetEmail(email, onComplete){
        if(onComplete)
            this.auth.sendPasswordResetEmail(email)
            .then(() => onComplete(`Instructions to reset password was sent to ${email}.`)).catch(()=>onComplete("Failed to send password reset email."));
        else this.auth.sendPasswordResetEmail(email);
    }

    isEmailVerified(){
        try{
            this.validateIsLoggedIn();
            return this.auth.currentUser.emailVerified;
        } catch (err) { console.error(`User must be logged in to use the isEmailVerified() function. \n${err}`);}
        return false;
    }

    isLoggedIn(){
        
        return this.auth.currentUser != undefined || this.auth.currentUser != null;
    }

    validateIsLoggedIn(){
        if(!this.isLoggedIn()) throw new Error("No user was logged in.");
    }
    getAuth(){
        return this.auth;
    }


}