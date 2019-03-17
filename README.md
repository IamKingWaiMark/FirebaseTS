## Firebase for Typescript Developers

### Implementation
1. Install firebasets  

        npm i firebasets  

2. Import FirebaseTSApp at the top of the **app.module.ts** file:  

        import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';  

3. Call the FirebaseTSApp.init(config) function in the AppModule (**app.module.ts**) constructor.

        @NgModule({
        declarations: [
            AppComponent
        ],
        imports: [],
        providers: [],
        bootstrap: [AppComponent]
        })
        export class AppModule { 
                constructor(){
                        FirebaseTSApp.init({
                                apiKey: "...",
                                authDomain: "...",
                                databaseURL: "...",
                                projectId: "...",
                                storageBucket: "...",
                                messagingSenderId: "..."
                        })
                }
        }

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

        public createAccountWith(params: {
                email: string, 
                password: string, 
                onComplete?: (userCredentials: firebase.auth.UserCredential) => void,
                onFail?: (error: any) => void
        }): Promise<firebase.auth.UserCredential>;

Creates a user account.

        firebasetsAuthService.createAccountWith(
        {
                email: "myEmail@MyEmail963.123.456",   // Email
                password: "myPassword",                   // Password
                onComplete: (userCredentials) => { 
                        //.. This code will execute when the user is created.  
                },
                onFail: (err) => {
                        //.. This code will execute when an error occurs.
                }
        }
        );

---  
**Sign in with user account**

        public signInWith(params: {
                email: string, 
                password: string, 
                onComplete?: (userCredentials: firebase.auth.UserCredential) => void,
                onFail?: (error: any) => void
        }): Promise<firebase.auth.UserCredential>;

Sign in with a user account.

        firebasetsAuthService.signInWith(      
        {
                email: "myEmail@MyEmail963.123.456",   // Email
                password: "myPassword",                   // Password
                onComplete: (credentials) => {
                        //... This code will execute when it finish attempt to sign in.  
                },
                onFail: (err) => {
                        //.. This code will execute when an error occurs.
                }
        }
        });

---  
**Sign out**  

        public signOut(params?: {
                onComplete?: () => void,
                onFail?: (error: any) => void
        }): Promise<void>;

Sign out.  

        firebasetsAuthService.signOut();  

---  

**Send instructional password reset email**  

        public sendPasswordResetEmail(params: {
                email: string, 
                onComplete?: (error?: string) => void
        }): void;

Sends a instructional email to reset the password to a specified email address in the database authentication system.    

        firebasetsAuthService.sendPasswordResetEmail(
        {
                email: "myEmail@MyEmail963.123.456",
                onComplete: err => {
                        // ... This code will execute when it finish attempt to send an instructional email.
                        // It may or may not return an error. 
                }
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

### Retreiving Data

#### Getting data once

---

        public getDocument(
                params: {
                        from: string [], 
                        onComplete: (result: firebase.firestore.DocumentSnapshot) => void,
                        onFail?: (err: any) => void
                }
        ): void;

#### Get a document data.

@param from: string [] - Takes in a array of string to specify the path to a document in the firestore database structure (collection, document, collection, document, ...). The length of the array MUST be even.  

@param onComplete: (result: firebase.firestore.DocumentSnapshot) => void - This function executes when the query is completed.  
result.data() returns a object with the data in the document.

@param onFail?: (err: any) => void - This functions executes when an error occured during the process and returns a error message.

**Example:**  

        firebasetsFirestore.getDocument(
        {
                from: ["usersCollection", "user1", "postCollection", "post1"],
                onComplete: result => {
                        console.log(result.data());
                },
                onFail: err => {

                }
        }
        );

In the example, it is reading the post1 document from usersCollection > user1 > postCollection.

---

#### Get collection data.

        public getCollection(
                params: {
                        from: string [], 
                        where: Where[] | OrderBy [] | Limit [], 
                        onComplete: (result: firebase.firestore.QuerySnapshot) => void,
                        onFail?: (err: any) => void
                }
        ): void;

@param from: string [] - Takes in a array of string to specify the path to a collection in the firestore database structure (collection, document, collection, document, ...). The length of the array MUST be odd. 

@param where: Where[] | OrderBy [] | Limit [] - In this array, you specify the additional Where, Order, and Limit queries. 

@param onComplete: (result: firebase.firestore.QuerySnapshot) => void - Executes when the query is finish.
results - return the list of documents.

@param onFail?: (err: any) => void - his functions executes when an error occured during the process and returns a error message.


**Example:**  

        firebasetsFirestore.getCollection(
        {
                from: ["usersCollection"],
                where: [new Where("age", "==", 10), new OrderBy("name", "asc"), new Limit(10), ...],
                onComplete: result => {
                        result.forEach(
                        doc=>{
                                console.log(doc.data());
                        }
                );
                },
                onFail: err => {
                
                }
        }
        );

This example snippet shows how to get documents from the users collection where the user age is 10. The results is then further sorted by their name in ascending order and limitted to 10 results.

If no Where, Order, or Limit query is provided, it will return all the documents in the collection.

        class Where {
                constructor(where: string, condition: "<=" | "<" | "==" | ">" | ">=", argument: any);
        }

        class OrderBy {
                constructor(field: string, direction: "asc" | "desc");
        }

        class Limit {
                constructor(limit: number);
        }

---

### Listening to data

#### Listen to a document

        public listenToDocument(
                params: {
                        name: string, 
                        from: string [], 
                        onUpdate: (result: firebase.firestore.DocumentSnapshot) => void
                }
        ): void;

Retreive data from a document and listens for changes made to the document. 

@param name: string - The name given to this listener so it can be reference later to stop listening to changes using the **stopListeningTo(listenerName: string): void and stopListeningToAll(): void** methods.

@param from: string [] - Takes in a array of string to specify the path to a document in the firestore database structure (collection, document, collection, document, ...). The length of the array MUST be even.  

@param onUpdate: (result: firebase.firestore.DocumentSnapshot, error?: any) => void - This function executes when the query is completed.  

result.data() returns a object with the data in the document.

**Example:**  

        readonly LISTENER_NAME = "POST_LISTENER";

        ..
        firebasetsFirestore.listenToDocument(
        {
                name: this.LISTENER_NAME,
                from:  ["usersCollection", "user1", "postCollection", "post1"]
                onUpdate: result => {
                        console.log(result.data());
                }
        });

---

#### Listen to a collection

        public listenToCollection(
                params: {
                        name: string, 
                        from: string [], 
                        where: Where[] | OrderBy [] | Limit [], 
                        onUpdate: (result: firebase.firestore.QuerySnapshot) => void
                }
        ): void;

@param name: string - The name given to this listener so it can be reference later to stop listening to changes using the **stopListeningTo(listenerName: string): void and stopListeningToAll(): void** methods.

@param from: string [] - Takes in a array of string to specify the path to a collection in the firestore database structure (collection, document, collection, document, ...). The length of the array MUST be odd. 

@param where: Where[] | OrderBy [] | Limit [] - In this array, you specify the additional Where, Order, and Limit queries. 

@param onUpdate: (result: firebase.firestore.QuerySnapshot) => void - Executes when the query is finish.
results - return the list of documents.


**Example:**   

        readonly LISTENER_NAME = "USERS";

        ..

        firebasetsFirestore.listenToCollection(
        {
                name: this.LISTENER_NAME,
                from: ["usersCollection"],
                where: [new Where("age", "==", 10), new OrderBy("name", "asc"), new Limit(10), ...],
                onUpdate: result => {
                        result.forEach(
                        doc=>{
                                console.log(doc.data());
                        }
                );
                }
        }
        );

## Storage Service

### Implementation

1. Import FirebaseTSStorage  

        import { FirebaseTSStorage } from 'firebasets/firebasetsStorage/firebaseTSStorage';  

2. Create a FirebaseTSStorage object.

        const firebasetsStorage = new FirebaseTSFirestore();

---

### Get Download URL from the Storage

        public getDownloadUrl(
                params: { 
                        path: string [], 
                        onComplete?: (url: string) => void, 
                        onFail?: (err: any) => void
                        }
        ): Promise<string>;

**Example:**  

        firebasetsStorage.getDownloadUrl(
        {
                path: ["myFiles", "Card Template.pub"]
        }
        ).then(url => {
                console.log(url);
        });

---

### Download File to Local Storage

        public downloadToLocalStorage(url: string): Promise<void>;
        public downloadToLocalStorage(path: string []): Promise<void>;

**Example with Download URL:**  

        firebasetsStorage.getDownloadUrl(
        {
                path: ["myFiles", "Card Template.pub"]
        }
        ).then(url => {
                firebasetsStorage.downloadToLocalStorage(url);
        });

**Example with Path:** 

        firebasetsStorage.downloadToLocalStorage(
                ["myFiles", "Card Template.pub"]
        );

### Delete File

        public deleteWithUrl(
                params: {
                        url: string, 
                        onComplete?: () => void, 
                        onFail?: (err: any) => void
                        }
        ): Promise<void>;

        public delete(
                params: {
                        path: string [], 
                        onComplete?: () => void, 
                        onFail?: (err: any) => void
                        }
        ): Promise<void>;

**Example with Download URL:**  

        firebasetsStorage.getDownloadUrl(
        {
                path: ["myFiles", "Card Template.pub"]
        }
        ).then(url => {
                firebasetsStorage.deleteWithUrl(
                        {
                        url: url
                        }
                );
        });

**Example with Path:**  

        firebasetsStorage.delete(
        {
                path: ["myFiles", "Card Template.pub"]
        }
        ).then(() => { 
                console.log("Deleted"); 
        });

### Upload File  

        public upload(
                params: 
                { 
                        uploadName: string, 
                        path: string [], 
                        data: {data: any, metadata?: firebase.storage.UploadMetadata}, 
                        onUpload?: (snapshot?: firebase.storage.UploadTaskSnapshot) => void, onComplete?: (downloadUrl: string) => void, 
                        onFail?: (err: any) => void
                }
        ): Promise<string>;

**Example:**  

        firebasetsStorage.upload(
        {
                uploadName: "Image upload",
                path: [input.files[0].name],
                data: {data: input.files[0]},
                onUpload: snapshot => {
                        console.log((snapshot.bytesTransferred / snapshot.totalBytes) * 100.0);
                }
        }
        ).then(downloadUrl => {
                // Do something with URL
        });