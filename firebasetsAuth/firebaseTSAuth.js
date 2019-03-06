import { FirebaseTSApp } from '../firebasetsApp/firebaseTSApp';
require("firebase/auth");

export class FirebaseTSAuth {
    constructor(){
        this.auth = FirebaseTSApp.getAuth();
    }
    createAccountWith(email, password, onComplete){
        this.auth.createUserWithEmailAndPassword(
            email,
            password
        ).then(userCredentials => onComplete(userCredentials, "No Error")).catch((error) => onComplete(undefined, error));
    }

    signInWith(email, password, onComplete){
        this.auth.signInWithEmailAndPassword(
            email,
            password
        ).then(userCredentials => onComplete(userCredentials, "No Error")).catch((error) => onComplete(undefined, error));
    }

    signOut(onComplete){
        if(onComplete)
            this.auth.signOut().then(() => onComplete(true)).catch(() => onComplete(true));
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