import { FirebaseTSApp } from "../firebasetsApp/firebaseTSApp";
require('firebase/storage');
export class FirebaseTSStorage {

    constructor(){
        this.listeners = new Map();
    }
    // Add data to the storage.
    upload(params){
        return new Promise(
            (resolved, rejected) => {
                let uploadTask = null;
                let storageRef = this.genStorageRef(params.path);
                uploadTask = (params.data.metadata == null || params.data.metadata == undefined)?  
                    storageRef.put(params.data.data) : storageRef.put(params.data.data, params.data.metadata);
        
                uploadTask.on(
                    "state_changed",
                    snapshot => {
                        try{
                            params.onUpload(snapshot);
                        } catch (err) {}
                    },
                    error => { 
                        rejected(error);
                        try{
                            params.onFail(error);
                        } catch (err) {}
                    },
                    ()=>{
                        storageRef.getDownloadURL().then(
                            downloadUrl => {
                                resolved(downloadUrl);
                                try{
                                    params.onComplete(downloadUrl);
                                } catch (err) {}
                            }
                        );
                    }
                );
        
                this.listeners.set(params.uploadName, uploadTask);
            }
        );
    }

    // Dlete a storage reference with a url pointing to a valid download url in the storage.
    deleteWithUrl(params){
        return new Promise(
            (resolved, rejected) => {
                const storageRef = FirebaseTSApp.getStorage().refFromURL(params.url);
                storageRef.delete().then(
                    ()=>{
                        resolved();
                        try{
                            params.onComplete();
                        } catch (err) {}
                    }).catch((err)=>{
                        rejected(err);
                        try{
                            params.onFail(err);
                        } catch (err) {}
                    });
            }
        );
    }
    // Delete a storage reference.
    delete(params){
        return new Promise(
            (resolved, rejected) => {
                const storageRef = this.genStorageRef(path);
                storageRef.delete().then(
                    ()=>{
                        resolved();
                        try{
                            params.onComplete();
                        } catch (err) {}
                    }).catch((err)=>{
                        rejected(err);
                        try{
                            params.onFail(err);
                        } catch (err) {}
                    });
            }
        );
    }

    // Generate a storage reference given an array of string to point to a path in the storage.
    genStorageRef(path){
        let storageRef = FirebaseTSApp.getStorage().ref();
        for(let i = 0; i < path.length; i++){
            storageRef = storageRef.child(path[i]);
        }

        return storageRef;
    }
}
