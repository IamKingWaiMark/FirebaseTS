import { Injectable } from '@angular/core';
import { FirebaseTSAuth } from '../firebasetsAuth/firebaseTSAuth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseTSAuthBootstrapService {
  private firebaseTSAuth: FirebaseTSAuth;
  constructor() {
    this.firebaseTSAuth = new FirebaseTSAuth();
  }

  public start(firebaseTSAuthStart: FirebaseTSAuthState){
    this.firebaseTSAuth.listenToLoginStateChanges(
      onChange => {
        this.checkState(firebaseTSAuthStart);
      }
    );
  }

  public checkState(firebaseTSAuthStart: FirebaseTSAuthState){
    firebaseTSAuthStart.whenStateChanged(this.firebaseTSAuth.getAuth().currentUser);
    if(this.firebaseTSAuth.isLoggedIn()){
      firebaseTSAuthStart.whenLoggedIn(this.firebaseTSAuth.getAuth().currentUser);
      if(this.firebaseTSAuth.isEmailVerified()) {
        firebaseTSAuthStart.whenLoggedInAndEmailVerified(this.firebaseTSAuth.getAuth().currentUser);
      } else if(!this.firebaseTSAuth.isEmailVerified()) {
        firebaseTSAuthStart.whenLoggedInAndEmailNotVerified(this.firebaseTSAuth.getAuth().currentUser);
      }
    } else if (!this.firebaseTSAuth.isLoggedIn()){
      firebaseTSAuthStart.whenLoggedOut(this.firebaseTSAuth.getAuth().currentUser);
    }
  }
}

export interface FirebaseTSAuthState {
  whenStateChanged?: (user: firebase.User) => void;
  whenLoggedIn?: (user: firebase.User) => void;
  whenLoggedOut?: (user: firebase.User) => void;
  whenLoggedInAndEmailNotVerified?: (user: firebase.User) => void;
  whenLoggedInAndEmailVerified?: (user: firebase.User) => void;
}