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
---

**Create User Account**

#### createAccountWith(email: string, password: string, onComplete: (userCredentials: firebase.auth.UserCredential, error?: any) => void): void;  

Creates a user account.

        firebasetsAuthService.createAccountWith(
        "myEmail@MyEmail963.123.456",   // Email
        "myPassword",                   // Password
        (userCredentials, error) => { 
            //... This code will execute when the user is created.  
        }
        );

---  
**Sign in with user account**

#### signInWith(email: string, password: string, onComplete: (userCredentials: firebase.auth.UserCredential, error?: any) => void): void;

Sign in with a user account.

        firebasetsAuthService.signInWith(      
            "myEmail@MyEmail963.123.456",   // Email
            "myPassword",                   // Password
            (credentials, error) => {
                //... This code will execute when it finish attempt to sign in.  
            });
        });

---  
**Sign out**  

#### signOut(onComplete?: (success: boolean) => void): void;

Sign out.  

        firebasetsAuthService.signOut();  

---  

**Send instructional password reset email**  

#### sendPasswordResetEmail(email: string, onComplete?: (error?: string) => void): void;  

Sends a instructional email to reset the password to a specified email address in the database authentication system.    

        firebasetsAuthService.sendPasswordResetEmail(
            "myEmail@MyEmail963.123.456",
            err => {
                // ... This code will execute when it finish attempt to send an instructional email.
                // It may or may not return an error. 
            }
        );

---  
**Send instructional email verification email**  

#### sendVerificaitonEmail(): void;

Sends a instructional email to verify the email. This method will only work if a user is signed in. Will throw an error if no user is signed in.  

        firebasetsAuthService.sendVerificaitonEmail();

---  
**Check if the signed in user account is verified**  

#### isEmailVerified(): void;

Check if the signed in user have verified his email for the account. This method should only be called when a user is signed in.  

        firebasetsAuthService.isEmailVerified();

---  
**Check if a user is signed in**  

#### isLoggedIn(): void;

Check if a user is signed in.  

        firebasetsAuthService.isLoggedIn();

---  

## Firestore Service

### Implementation

1. Import FirebaseTSFirestore  

        import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';  

2. Create a FirebaseTSFirestore object.

        const firebasetsFirestore = new FirebaseTSFirestore();

---

### Reading Data

#### Getting document data once

#### public getDocument(from: string [], onComplete: (result: firebase.firestore.DocumentSnapshot, error?: any) => void): void;

Reads data from a document once.

@param from: string [] - Takes in a array of string to specify the path to a document in the firestore database structure (collection, document, collection, document, ...). The length of the array MUST be even.  

@param onComplete: (result: firebase.firestore.DocumentSnapshot, error?: any) => void - This function executes when the query is completed.  

result.data() returns a object with the data in the document.


        firebasetsFirestore.getDocument(
        ["usersCollection", "user1", "postCollection", "post1"],
        (result, err) => {
                console.log([result.data(), err]);
        }
        );  

In the example, it is reading the post1 document from usersCollection > user1 > postCollection.

---

