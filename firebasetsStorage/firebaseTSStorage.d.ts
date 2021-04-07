export declare class FirebaseTSStorage {
    public upload(params: { uploadName: string, path: string [], data: {data: any, metadata?: firebase.default.storage.UploadMetadata}, onUpload?: (snapshot?: firebase.default.storage.UploadTaskSnapshot) => void, onComplete?: (downloadUrl: string) => void, onFail?: (err: any) => void}): Promise<string>;
    public deleteWithUrl(params: {url: string, onComplete?: () => void, onFail?: (err: any) => void}): Promise<void>;
    public delete(params: {path: string [], onComplete?: () => void, onFail?: (err: any) => void}): Promise<void>;
    public downloadToLocalStorage(url: string): Promise<void>;
    public downloadToLocalStorage(path: string []): Promise<void>;
    public getDownloadUrl(params: { path: string [], onComplete?: (url: string) => void, onFail?: (err: any) => void}): Promise<string>;
    
}