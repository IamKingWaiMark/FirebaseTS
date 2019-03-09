import { FirebaseTSApp } from '../firebasetsApp/firebaseTSApp';
require("firebase/auth");

export class FirebaseTSAuth {
    constructor(){
        this.auth = FirebaseTSApp.getAuth();
    }
    createAccountWith(params){
        this.auth.createUserWithEmailAndPassword(
            params.email,
            params.password
        ).then(userCredentials => {
            try{
                params.onComplete(userCredentials);
            } catch (err) {}
        }).catch((error) => {
            try{
                params.onFail(error);
            } catch (err) {}    
        });
    }

    signInWith(params){
        this.auth.signInWithEmailAndPassword(
            params.email,
            params.password
        ).then(userCredentials => {
            try{
                params.onComplete(userCredentials);
            } catch (err) {}
        }).catch((error) => {
            try{
                params.onFail(error);
            } catch (err) {}    
        });
    }

    signOut(params){
        if(params)
            this.auth.signOut().then(() => {
                params.onComplete();
            }).catch(() => { 
                params.onFail();
            });
         else 
            this.auth.signOut();              
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
        } catch (err) { console.error(`${err} User must be logged in to use the isEmailVerified() function.`);}
        return false;
    }

    isLoggedIn(){
        
        return this.auth.currentUser != undefined || this.auth.currentUser != null;
    }

    validateIsLoggedIn(){
        if(!this.isLoggedIn()) throw "No user was logged in.";
    }
    getAuth(){
        return this.auth;
    }


}