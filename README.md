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