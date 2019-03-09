import { FirebaseTSApp } from "../firebasetsApp/firebaseTSApp";
require('firebase/storage');
export class FirebaseTSStorage {

    constructor(){
        this.listeners = new Map();
    }
    // Add data to the storage.
    upload(params){
        let uploadTask = null;
        uploadTask = (params.data.metadata == null || params.data.metadata == undefined)?  
            this.genStorageRef(params.path).put(params.data.data) : this.genStorageRef(params.path).put(params.data.data, params.data.metadata);

        uploadTask.on(
            "state_changed",
            snapshot => {
                try{
                    params.onUpload(snapshot);
                } catch (err) {}
            },
            error => { 
                try{
                    params.onFail(error);
                } catch (err) {}
            },
            ()=>{
                try{
                    params.onComplete();
                } catch (err) {}
            }
        );

        this.listeners.set(params.uploadName, uploadTask);
    }

    // Dlete a storage reference with a url pointing to a valid download url in the storage.
    deleteWithUrl(params){
        const storageRef = FirebaseTSApp.getStorage().refFromURL(params.url);
        storageRef.delete().then(
            ()=>{
                try{
                    params.onComplete();
                } catch (err) {}
            }).catch((err)=>{
                try{
                    params.onFail(err);
                } catch (err) {}
            });
    }
    // Delete a storage reference.
    delete(params){
        const storageRef = this.genStorageRef(path);
        storageRef.delete().then(
            ()=>{
                try{
                    params.onComplete();
                } catch (err) {}
            }).catch((err)=>{
                try{
                    params.onFail(err);
                } catch (err) {}
            });
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
