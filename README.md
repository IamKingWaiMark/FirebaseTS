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

### Methods

**Create User Account**

#### createAccountWith(  
####    email: string,   
####    password: string,  
####    onComplete: (userCredentials: firebase.auth.UserCredential, error?: any) => void
#### ): void;  

Creates a user account.

        firebasetsAuthService.createAccountWith(
        "myEmail@MyEmail963.123.456",   // Email
        "myPassword",                   // Password
        (userCredentials, error) => { 
            //... This code will execute when the user is created.  
        }
        );
        
**Sign in with user account**

#### signInWith(  
####    email: string,  
####    password: string,  
####    onComplete: (userCredentials: firebase.auth.UserCredential, error?: any) => void
#### ): void;  

Sign in with a user account.

        firebasetsAuthService.signInWith(      
            "myEmail@MyEmail963.123.456",   // Email
            "myPassword",                   // Password
            (credentials, error) => {
                //... This code will execute when it finish attemp to sign in.  
            });
        });
