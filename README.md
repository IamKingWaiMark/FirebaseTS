## Firebase for Typescript Developers

### Implementation
1. npm i firebase firebasets --save
2. Import FirebaseTSApp at the top of the **app.module.ts** file:  
        import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';
3. Call the FirebaseTSApp.init(config) function in the imports array of the AppModule (**app.module.ts**)

            @NgModule({
            declarations: [
                AppComponent
            ],
            imports: [
                BrowserModule,
                FirebaseTSApp.init({
                apiKey: "AIzaSyDK6cEcs4Tvcj8GhC296K8nA1rEsl766TY",
                authDomain: "hssm-app.firebaseapp.com",
                databaseURL: "https://hssm-app.firebaseio.com",
                projectId: "hssm-app",
                storageBucket: "hssm-app.appspot.com",
                messagingSenderId: "788687351607"
                })
            ],
            providers: [],
            bootstrap: [AppComponent]
            })
            export class AppModule { }

---