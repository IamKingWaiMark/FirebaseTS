## Firebase for Typescript Developers

### Implementation
1. npm i firebase firebasets --save
2. Import FirebaseTSApp at the top of the **app.module.ts** file:  
        import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';
3. Call the FirebaseTSApp.init(config) function in the imports array of the AppModule (**app.module.ts**)

@NgModule({  
&#09;declarations: [  
&#09;&#09;...  
&#09;],  
&#09;imports: [  
&#09;&#09;...  
&#09;&#09;FirebaseTSApp.init({  
&#09;&#09;&#09;apiKey: "...",  
&#09;&#09;&#09;authDomain: "...",  
&#09;&#09;&#09;databaseURL: "...",  
&#09;&#09;&#09;projectId: "...",  
&#09;&#09;&#09;storageBucket: "...",  
&#09;&#09;&#09;messagingSenderId: "..."  
&#09;})  
&#09;],  
&#09;providers: [],  
&#09;bootstrap: []  
})  
export class AppModule { }  

---