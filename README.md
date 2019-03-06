## Firebase for Typescript Developers

### Implementation
1. Install firebasets  

            npm i firebase firebasets --save  

2. Import FirebaseTSApp at the top of the **app.module.ts** file:  

            import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';  

3. Call the FirebaseTSApp.init(config) function in the imports array of the AppModule (**app.module.ts**)  

            @NgModule({
            declarations: [
                AppComponent
            ],
            imports: [
                ...,
                FirebaseTSApp.init({
                apiKey: "...",
                authDomain: "...",
                databaseURL: "...",
                projectId: "...",
                storageBucket: "...",
                messagingSenderId: "..."
                })
            ],
            providers: [],
            bootstrap: [AppComponent]
            })
            export class AppModule { }

---  

## Authentication Service  

### Implementation

1. Import **FirebaseTSAuth**  

        import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';

2. Declare and initialize a FirebaseTSAuth service object.

        const firebasetsAuthService = new FirebaseTSAuth();

### Listen to user login state

1. Call the listenToLoginStateChanges(onChange: (firebaseUser: firebase.User) => void): void;  

        firebasetsAuthService.listenToLoginStateChanges(
            firebaseUser => {     
                if(firebasetsAuthService.isLoggedIn()){
                //...
                } else {
                //...
                }       
            }
        );